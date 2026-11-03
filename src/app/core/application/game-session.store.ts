import { computed, DestroyRef, inject, Injectable, signal } from '@angular/core';
import {
  GameStation,
  GameStationView,
  isOccupied,
  StationStatus,
} from '../domain/models/game-station.model';
import { GameType } from '../domain/models/game-type.model';
import { Player } from '../domain/models/player.model';
import {
  createGameSession,
  pauseSession,
  resumeSession,
  toStationView,
} from '../domain/rules/game-session.rules';
import { GameStationRepository } from './ports/game-station.repository';

export type SessionFilter = 'active' | 'all';

/**
 * Application state for game sessions and the stations that host them.
 *
 * Orchestrates the domain (pure rules) and delegates persistence to the
 * `GameStationRepository` port. It knows nothing about localStorage.
 *
 * Session time is derived from real dates, not accumulated by a counter.
 * The interval only refreshes the `now` signal so the UI re-renders.
 */
@Injectable({ providedIn: 'root' })
export class GameSessionStore {
  private readonly repository = inject(GameStationRepository);
  private readonly destroyRef = inject(DestroyRef);

  private readonly stationsState = signal<readonly GameStation[]>(this.repository.load());
  private readonly filterState = signal<SessionFilter>('active');
  private readonly expandedState = signal<string | null>('M-01');
  private readonly nowState = signal(Date.now());

  /** Stations with their game session already derived for the UI. */
  readonly stations = computed<readonly GameStationView[]>(() => {
    const now = new Date(this.nowState());

    return this.stationsState().map((station) => toStationView(station, now));
  });

  readonly activeFilter = this.filterState.asReadonly();
  readonly expandedStationId = this.expandedState.asReadonly();

  readonly totalStationsCount = computed(() => this.stationsState().length);

  readonly activeSessionsCount = computed(() => this.stationsState().filter(isOccupied).length);

  readonly availableStationsCount = computed(
    () => this.stationsState().filter((station) => station.status === 'available').length,
  );

  readonly occupancyPercentage = computed(() => {
    const total = this.totalStationsCount();
    return total === 0 ? 0 : Math.round((this.activeSessionsCount() / total) * 100);
  });

  readonly displayedStations = computed(() =>
    this.filterState() === 'active' ? this.stations().filter(isOccupied) : this.stations(),
  );

  readonly availableStations = computed(() =>
    this.stations().filter((station) => station.status === 'available'),
  );

  constructor() {
    const clock = setInterval(() => this.refreshClock(), 1000);

    this.destroyRef.onDestroy(() => clearInterval(clock));
  }

  setFilter(filter: SessionFilter): void {
    this.filterState.set(filter);
  }

  toggleStationExpanded(stationId: string): void {
    this.expandedState.update((current) => (current === stationId ? null : stationId));
  }

  toggleSessionPause(stationId: string): void {
    const now = new Date();

    this.stationsState.update((stations) =>
      stations.map((station) => {
        if (station.id !== stationId || !station.session) {
          return station;
        }

        const isPaused = station.session.resumedAt === null;
        const status: StationStatus = isPaused ? 'in_use' : 'paused';

        return {
          ...station,
          status,
          session: isPaused
            ? resumeSession(station.session, now)
            : pauseSession(station.session, now),
        };
      }),
    );

    this.nowState.set(now.getTime());
    this.persist();
  }

  endSession(stationId: string): void {
    this.stationsState.update((stations) =>
      stations.map((station) =>
        station.id === stationId
          ? { ...station, status: 'available' as const, session: undefined }
          : station,
      ),
    );

    if (this.expandedState() === stationId) {
      this.expandedState.set(null);
    }

    this.persist();
  }

  openSession(stationId: string, gameType: GameType, players: readonly Player[]): boolean {
    const target = this.stationsState().find((station) => station.id === stationId);

    if (!target || target.status !== 'available') {
      return false;
    }

    const now = new Date();
    const session = createGameSession(gameType, players, now);

    this.stationsState.update((stations) =>
      stations.map((station) =>
        station.id === stationId
          ? { ...station, status: 'in_use' as const, gameType, session }
          : station,
      ),
    );

    this.expandedState.set(stationId);
    this.filterState.set('active');
    this.nowState.set(now.getTime());
    this.persist();

    return true;
  }

  /** Clears persisted state and restores the demo seed. */
  reset(): void {
    this.repository.clear();
    this.stationsState.set(this.repository.load());
    this.nowState.set(Date.now());
    this.persist();
  }

  /**
   * Refreshes the UI only while a session is running.
   * It does not mutate state or persist: time is derived from dates.
   */
  private refreshClock(): void {
    const hasRunningSession = this.stationsState().some(
      (station) => station.status === 'in_use' && station.session?.resumedAt,
    );

    if (hasRunningSession) {
      this.nowState.set(Date.now());
    }
  }

  private persist(): void {
    this.repository.save(this.stationsState());
  }
}
