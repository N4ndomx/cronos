import { GameType } from '../../domain/models/game-type.model';
import { StationStatus } from '../../domain/models/game-station.model';

export interface PlayerDto {
  readonly id: string;
  readonly name: string;
  readonly initials: string;
}

export interface GameSessionDto {
  /** Fecha ISO-8601 (las fechas no sobreviven a JSON como `Date`). */
  readonly startTime: string;
  /** Tiempo completado en tramos anteriores, en milisegundos. */
  readonly accumulatedMs: number;
  /** Inicio del tramo en curso en ISO-8601, o `null` si está pausada. */
  readonly resumedAt: string | null;
  readonly ratePerHour: number;
  readonly players: readonly PlayerDto[];
}

/** Instantánea persistida: versión del fixture + estado mutable de las estaciones. */
export interface GameStateSnapshotDto {
  readonly seedVersion: number;
  readonly stations: readonly GameStationDto[];
}

export interface GameStationDto {
  readonly id: string;
  readonly displayNumber: string;
  readonly label: string;
  readonly status: StationStatus;
  readonly gameType: GameType;
  readonly session?: GameSessionDto;
  readonly statusLabel?: string;
}
