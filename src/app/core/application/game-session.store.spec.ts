import { TestBed } from '@angular/core/testing';
import { GameSessionStore } from './game-session.store';
import { GameStationRepository } from './ports/game-station.repository';
import { GameStation } from '../domain/models/game-station.model';
import { createPlayer } from '../domain/rules/player.rules';
import { createInitialStations } from '../infrastructure/seed/initial-stations';

class FakeGameStationRepository extends GameStationRepository {
  saved: readonly GameStation[] | null = null;
  saveCount = 0;

  load(): readonly GameStation[] {
    return this.saved ?? createInitialStations();
  }

  save(stations: readonly GameStation[]): void {
    this.saved = stations;
    this.saveCount++;
  }

  clear(): void {
    this.saved = null;
  }
}

describe('GameSessionStore', () => {
  let repository: FakeGameStationRepository;

  beforeEach(() => {
    repository = new FakeGameStationRepository();

    TestBed.configureTestingModule({
      providers: [{ provide: GameStationRepository, useValue: repository }],
    });
  });

  it('opens a session on an available station and persists the change', () => {
    const store = TestBed.inject(GameSessionStore);

    const opened = store.openSession('M-02', 'pool', [createPlayer('Ana', 'p1')]);

    expect(opened).toBe(true);
    expect(store.stations().find((station) => station.id === 'M-02')?.status).toBe('in_use');
    expect(repository.saveCount).toBe(1);
  });

  it('refuses to open a session on a station that is not available', () => {
    const store = TestBed.inject(GameSessionStore);

    expect(store.openSession('M-01', 'pool', [])).toBe(false);
  });

  it('pauses and resumes an active session', () => {
    const store = TestBed.inject(GameSessionStore);

    store.toggleSessionPause('M-01');
    expect(store.stations().find((station) => station.id === 'M-01')?.status).toBe('paused');

    store.toggleSessionPause('M-01');
    expect(store.stations().find((station) => station.id === 'M-01')?.status).toBe('in_use');
  });

  it('frees the station when the session ends', () => {
    const store = TestBed.inject(GameSessionStore);

    store.endSession('M-01');

    const station = store.stations().find((item) => item.id === 'M-01');
    expect(station?.status).toBe('available');
    expect(station?.session).toBeUndefined();
  });

  it('derives elapsed time from dates without persisting on every tick', () => {
    vi.useFakeTimers();

    try {
      const store = TestBed.inject(GameSessionStore);
      const savesAfterLoad = repository.saveCount;

      vi.advanceTimersByTime(5000);

      const elapsed =
        store.stations().find((station) => station.id === 'M-01')?.session?.elapsedSeconds ?? 0;

      expect(elapsed).toBeGreaterThanOrEqual(7905);
      expect(elapsed).toBeLessThanOrEqual(7906);
      expect(repository.saveCount).toBe(savesAfterLoad);
    } finally {
      vi.useRealTimers();
    }
  });

  it('freezes elapsed time while paused and resumes from the pause point', () => {
    vi.useFakeTimers();

    try {
      const store = TestBed.inject(GameSessionStore);

      store.toggleSessionPause('M-01');
      const pausedElapsed =
        store.stations().find((station) => station.id === 'M-01')?.session?.elapsedSeconds ?? 0;

      vi.advanceTimersByTime(10_000);

      expect(
        store.stations().find((station) => station.id === 'M-01')?.session?.elapsedSeconds,
      ).toBe(pausedElapsed);

      store.toggleSessionPause('M-01');
      vi.advanceTimersByTime(3000);

      expect(
        store.stations().find((station) => station.id === 'M-01')?.session?.elapsedSeconds,
      ).toBe(pausedElapsed + 3);
    } finally {
      vi.useRealTimers();
    }
  });
});
