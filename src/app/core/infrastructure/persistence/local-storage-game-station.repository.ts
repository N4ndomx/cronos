import { Injectable } from '@angular/core';
import { GameStationRepository } from '../../application/ports/game-station.repository';
import { GameStation } from '../../domain/models/game-station.model';
import { createInitialStations, SEED_VERSION } from '../seed/initial-stations';
import { fromGameStateSnapshotDto, toGameStateSnapshotDto } from './game-station.mapper';

export const GAME_STATE_STORAGE_KEY = 'cronos.game-state.v1';

/**
 * Adaptador de persistencia local (localStorage).
 *
 * La seed es la fuente de verdad del inventario de estaciones: el número de estaciones
 * siempre sale de `createInitialStations()`. El almacenamiento solo aporta el
 * estado mutable (sesiones, pausas y disponibilidad) de las estaciones que existen
 * en la seed. Si la instantánea está corrupta o es de otra versión del
 * fixture, se ignora y se arranca con la seed limpia.
 */
@Injectable()
export class LocalStorageGameStationRepository extends GameStationRepository {
  private readonly storage = resolveStorage();

  load(): readonly GameStation[] {
    const seed = createInitialStations();
    const raw = this.storage?.getItem(GAME_STATE_STORAGE_KEY);

    if (!raw) {
      return seed;
    }

    try {
      const parsed: unknown = JSON.parse(raw);
      const stored = fromGameStateSnapshotDto(parsed, SEED_VERSION);

      if (!stored) {
        return seed;
      }

      return mergeInventory(seed, stored);
    } catch {
      return seed;
    }
  }

  save(stations: readonly GameStation[]): void {
    if (!this.storage) {
      return;
    }

    try {
      this.storage.setItem(
        GAME_STATE_STORAGE_KEY,
        JSON.stringify(toGameStateSnapshotDto(stations, SEED_VERSION)),
      );
    } catch {
      // El almacenamiento puede estar lleno o deshabilitado: la persistencia es best-effort.
    }
  }

  clear(): void {
    this.storage?.removeItem(GAME_STATE_STORAGE_KEY);
  }
}

/**
 * Aplica el estado guardado sobre el inventario actual de la seed.
 * Las estaciones que ya no existen en la seed se descartan.
 */
function mergeInventory(
  seed: readonly GameStation[],
  stored: readonly GameStation[],
): readonly GameStation[] {
  const storedById = new Map(stored.map((station) => [station.id, station]));

  return seed.map((base) => {
    const saved = storedById.get(base.id);

    if (!saved) {
      return base;
    }

    const hasSession = saved.status === 'in_use' || saved.status === 'paused';

    // Un estado de sesión sin sesión es una instantánea inválida: se conserva la seed.
    if (hasSession && !saved.session) {
      return base;
    }

    return {
      ...base,
      status: saved.status,
      gameType: saved.gameType,
      ...(saved.session ? { session: saved.session } : {}),
      ...(saved.statusLabel ? { statusLabel: saved.statusLabel } : {}),
    };
  });
}

function resolveStorage(): Storage | null {
  try {
    return typeof globalThis.localStorage === 'undefined' ? null : globalThis.localStorage;
  } catch {
    return null;
  }
}
