import { GameStation } from '../../domain/models/game-station.model';

/**
 * Puerto de persistencia de estaciones.
 *
 * La capa de aplicación solo conoce este contrato; el adaptador concreto
 * (localStorage, API HTTP, IndexedDB…) se inyecta desde `app.config.ts`.
 */
export abstract class GameStationRepository {
  /** Devuelve una instantánea completa del estado de las estaciones. */
  abstract load(): readonly GameStation[];

  /** Persiste la instantánea completa. */
  abstract save(stations: readonly GameStation[]): void;

  /** Elimina cualquier instantánea persistida. */
  abstract clear(): void;
}
