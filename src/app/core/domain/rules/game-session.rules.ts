import { GameStation, GameStationView } from '../models/game-station.model';
import { findGameTypeOption, GameType } from '../models/game-type.model';
import { Player } from '../models/player.model';
import { GameSession, GameSessionView } from '../models/game-session.model';
import { calculateSessionCost } from './billing.rules';

export function createGameSession(
  gameType: GameType,
  players: readonly Player[],
  startedAt: Date = new Date(),
): GameSession {
  const option = findGameTypeOption(gameType);

  return {
    startTime: startedAt,
    accumulatedMs: 0,
    resumedAt: startedAt,
    ratePerHour: option.hourlyRate,
    players: [...players],
  };
}

/** Tiempo jugado en milisegundos: tramos completados + tramo en curso. */
export function sessionElapsedMs(session: GameSession, now: Date = new Date()): number {
  const runningMs = session.resumedAt
    ? Math.max(0, now.getTime() - session.resumedAt.getTime())
    : 0;

  return Math.max(0, session.accumulatedMs + runningMs);
}

export function sessionElapsedSeconds(session: GameSession, now: Date = new Date()): number {
  return Math.floor(sessionElapsedMs(session, now) / 1000);
}

export function isSessionPaused(session: GameSession): boolean {
  return session.resumedAt === null;
}

export function sessionCost(session: GameSession, now: Date = new Date()): number {
  return calculateSessionCost(sessionElapsedSeconds(session, now), session.ratePerHour);
}

/** Congela la sesión: acumula el tramo en curso y deja de contar. */
export function pauseSession(session: GameSession, now: Date = new Date()): GameSession {
  if (session.resumedAt === null) {
    return session;
  }

  return {
    ...session,
    accumulatedMs: sessionElapsedMs(session, now),
    resumedAt: null,
  };
}

/** Reanuda la sesión abriendo un nuevo tramo desde `now`. */
export function resumeSession(session: GameSession, now: Date = new Date()): GameSession {
  if (session.resumedAt !== null) {
    return session;
  }

  return { ...session, resumedAt: now };
}

export function toGameSessionView(session: GameSession, now: Date = new Date()): GameSessionView {
  return {
    startTime: session.startTime,
    elapsedSeconds: sessionElapsedSeconds(session, now),
    ratePerHour: session.ratePerHour,
    totalCost: sessionCost(session, now),
    players: session.players,
    isPaused: isSessionPaused(session),
  };
}

export function toStationView(station: GameStation, now: Date = new Date()): GameStationView {
  const { session, ...rest } = station;

  return session ? { ...rest, session: toGameSessionView(session, now) } : rest;
}
