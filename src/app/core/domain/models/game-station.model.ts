import { GameType } from './game-type.model';
import { GameSession, GameSessionView } from './game-session.model';

export type StationStatus = 'available' | 'in_use' | 'paused' | 'tournament' | 'maintenance';

export interface GameStation {
  readonly id: string;
  readonly displayNumber: string;
  readonly label: string;
  readonly status: StationStatus;
  readonly gameType: GameType;
  readonly session?: GameSession;
  readonly statusLabel?: string;
}

/** Estación de juego con la sesión ya derivada para la UI (tiempo y costo calculados). */
export interface GameStationView extends Omit<GameStation, 'session'> {
  readonly session?: GameSessionView;
}

export const STATION_STATUSES: readonly StationStatus[] = [
  'available',
  'in_use',
  'paused',
  'maintenance',
];

export function isOccupied(station: Pick<GameStation, 'status'>): boolean {
  return station.status === 'in_use' || station.status === 'paused';
}

export function isStationStatus(value: unknown): value is StationStatus {
  return STATION_STATUSES.some((status) => status === value);
}
