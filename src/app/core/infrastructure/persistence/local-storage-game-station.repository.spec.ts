import {
  LocalStorageGameStationRepository,
  GAME_STATE_STORAGE_KEY,
} from './local-storage-game-station.repository';
import { createInitialStations, SEED_VERSION } from '../seed/initial-stations';
import { toGameStateSnapshotDto, toGameStationDto } from './game-station.mapper';

describe('LocalStorageGameStationRepository', () => {
  let repository: LocalStorageGameStationRepository;
  const seedCount = createInitialStations().length;

  beforeEach(() => {
    localStorage.clear();
    repository = new LocalStorageGameStationRepository();
  });

  it('returns the seed snapshot when there is nothing stored', () => {
    expect(repository.load().length).toBe(seedCount);
  });

  it('round-trips sessions through JSON', () => {
    const stations = createInitialStations();
    repository.save(stations);

    const restored = repository.load().find((station) => station.id === 'M-01');
    const original = stations.find((station) => station.id === 'M-01');

    expect(restored?.session?.startTime).toBeInstanceOf(Date);
    expect(restored?.session?.accumulatedMs).toBe(original?.session?.accumulatedMs);
    expect(restored?.session?.resumedAt?.toISOString()).toBe(
      original?.session?.resumedAt?.toISOString(),
    );
    expect(restored?.session?.players.length).toBe(original?.session?.players.length);
  });

  it('falls back to the seed snapshot when the payload is corrupt', () => {
    localStorage.setItem(GAME_STATE_STORAGE_KEY, '{not-json');

    expect(repository.load().length).toBe(seedCount);
  });

  it('ignores a legacy snapshot stored as a bare array', () => {
    localStorage.setItem(
      GAME_STATE_STORAGE_KEY,
      JSON.stringify(createInitialStations().map(toGameStationDto)),
    );

    expect(repository.load().length).toBe(seedCount);
  });

  it('ignores snapshots from another seed version', () => {
    const snapshot = toGameStateSnapshotDto(createInitialStations(), SEED_VERSION + 1);
    localStorage.setItem(GAME_STATE_STORAGE_KEY, JSON.stringify(snapshot));

    expect(repository.load().length).toBe(seedCount);
  });

  it('keeps the seed inventory even if the snapshot has extra stations', () => {
    const stations = createInitialStations();
    const extra = {
      ...stations[0],
      id: 'M-99',
      displayNumber: '99',
      label: 'M-99',
      status: 'available' as const,
      session: undefined,
    };

    localStorage.setItem(
      GAME_STATE_STORAGE_KEY,
      JSON.stringify(toGameStateSnapshotDto([...stations, extra], SEED_VERSION)),
    );

    const loaded = repository.load();

    expect(loaded.length).toBe(seedCount);
    expect(loaded.some((station) => station.id === 'M-99')).toBe(false);
  });

  it('clears the persisted snapshot', () => {
    repository.save(createInitialStations());
    repository.clear();

    expect(localStorage.getItem(GAME_STATE_STORAGE_KEY)).toBeNull();
  });
});
