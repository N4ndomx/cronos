import { Player } from './player.model';

/**
 * Sesión de juego en el dominio.
 *
 * El tiempo NO se acumula con un contador: se deriva de fechas reales.
 * - `accumulatedMs`: tiempo completado en tramos anteriores (antes de pausas).
 * - `resumedAt`: inicio del tramo en curso; `null` significa pausada.
 *
 * Así el cronómetro no sufre deriva cuando el navegador estrangula timers.
 */
export interface GameSession {
  readonly startTime: Date;
  readonly accumulatedMs: number;
  readonly resumedAt: Date | null;
  readonly ratePerHour: number;
  readonly players: readonly Player[];
}

/** Vista derivada de una sesión para presentación (tiempo y cobro ya calculados). */
export interface GameSessionView {
  readonly startTime: Date;
  readonly elapsedSeconds: number;
  readonly ratePerHour: number;
  readonly totalCost: number;
  readonly players: readonly Player[];
  readonly isPaused: boolean;
}
