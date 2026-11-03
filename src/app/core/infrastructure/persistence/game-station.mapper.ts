import { GameStation, isStationStatus } from '../../domain/models/game-station.model';
import { isGameType } from '../../domain/models/game-type.model';
import { Player } from '../../domain/models/player.model';
import { GameSession } from '../../domain/models/game-session.model';
import {
  GameStationDto,
  PlayerDto,
  GameSessionDto,
  GameStateSnapshotDto,
} from './game-station.dto';

export function toGameStateSnapshotDto(
  stations: readonly GameStation[],
  seedVersion: number,
): GameStateSnapshotDto {
  return {
    seedVersion,
    stations: stations.map(toGameStationDto),
  };
}

/**
 * Reconstruye una instantánea completa.
 *
 * Devuelve `null` si el formato es inválido o si la versión del fixture no
 * coincide: en ambos casos el repositorio vuelve a generar la seed.
 */
export function fromGameStateSnapshotDto(
  value: unknown,
  expectedSeedVersion: number,
): readonly GameStation[] | null {
  if (!isRecord(value) || value['seedVersion'] !== expectedSeedVersion) {
    return null;
  }

  const rawStations = value['stations'];

  if (!Array.isArray(rawStations) || rawStations.length === 0) {
    return null;
  }

  const stations = rawStations.map(fromGameStationDto);

  return stations.every((station): station is GameStation => station !== null) ? stations : null;
}

export function toGameStationDto(station: GameStation): GameStationDto {
  return {
    id: station.id,
    displayNumber: station.displayNumber,
    label: station.label,
    status: station.status,
    gameType: station.gameType,
    ...(station.session ? { session: toSessionDto(station.session) } : {}),
    ...(station.statusLabel ? { statusLabel: station.statusLabel } : {}),
  };
}

export function toSessionDto(session: GameSession): GameSessionDto {
  return {
    startTime: session.startTime.toISOString(),
    accumulatedMs: session.accumulatedMs,
    resumedAt: session.resumedAt ? session.resumedAt.toISOString() : null,
    ratePerHour: session.ratePerHour,
    players: session.players.map(toPlayerDto),
  };
}

export function toPlayerDto(player: Player): PlayerDto {
  return {
    id: player.id,
    name: player.name,
    initials: player.initials,
  };
}

/**
 * Reconstruye una entidad de dominio desde datos no confiables
 * (localStorage puede haber sido editado o quedar de una versión anterior).
 */
export function fromGameStationDto(value: unknown): GameStation | null {
  if (!isRecord(value)) {
    return null;
  }

  const id = asString(value['id']);
  const displayNumber = asString(value['displayNumber']);
  const label = asString(value['label']);
  const status = value['status'];
  const gameType = value['gameType'];
  const statusLabel = asString(value['statusLabel']);

  if (!id || !displayNumber || !label || !isStationStatus(status) || !isGameType(gameType)) {
    return null;
  }

  const rawSession = value['session'];
  const session = rawSession === undefined ? undefined : fromSessionDto(rawSession);

  if (rawSession !== undefined && session === null) {
    return null;
  }

  return {
    id,
    displayNumber,
    label,
    status,
    gameType,
    ...(session ? { session } : {}),
    ...(statusLabel ? { statusLabel } : {}),
  };
}

function fromSessionDto(value: unknown): GameSession | null {
  if (!isRecord(value)) {
    return null;
  }

  const rawStartTime = asString(value['startTime']);
  const accumulatedMs = asNumber(value['accumulatedMs']);
  const rawResumedAt = value['resumedAt'];
  const ratePerHour = asNumber(value['ratePerHour']);
  const rawPlayers = value['players'];

  if (
    !rawStartTime ||
    accumulatedMs === null ||
    accumulatedMs < 0 ||
    (rawResumedAt !== null && typeof rawResumedAt !== 'string') ||
    ratePerHour === null ||
    !Array.isArray(rawPlayers)
  ) {
    return null;
  }

  const startTime = new Date(rawStartTime);

  if (Number.isNaN(startTime.getTime())) {
    return null;
  }

  let resumedAt: Date | null = null;

  if (typeof rawResumedAt === 'string') {
    resumedAt = new Date(rawResumedAt);

    if (Number.isNaN(resumedAt.getTime())) {
      return null;
    }
  }

  const players = rawPlayers.map(fromPlayerDto);

  if (players.some((player) => player === null)) {
    return null;
  }

  return {
    startTime,
    accumulatedMs,
    resumedAt,
    ratePerHour,
    players: players as Player[],
  };
}

function fromPlayerDto(value: unknown): Player | null {
  if (!isRecord(value)) {
    return null;
  }

  const id = asString(value['id']);
  const name = asString(value['name']);
  const initials = asString(value['initials']);

  return id && name && initials ? { id, name, initials } : null;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function asString(value: unknown): string | null {
  return typeof value === 'string' && value.length > 0 ? value : null;
}

function asNumber(value: unknown): number | null {
  return typeof value === 'number' && Number.isFinite(value) ? value : null;
}
