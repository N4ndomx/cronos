import { createPlayer } from './player.rules';
import { calculateSessionCost } from './billing.rules';
import {
  createGameSession,
  pauseSession,
  resumeSession,
  sessionCost,
  sessionElapsedMs,
  sessionElapsedSeconds,
  toStationView,
} from './game-session.rules';

const START = new Date('2026-01-01T10:00:00.000Z');
const players = [createPlayer('Ana', 'p1')];

describe('game session rules', () => {
  it('starts a running session with zero elapsed time', () => {
    const session = createGameSession('pool', players, START);

    expect(session.accumulatedMs).toBe(0);
    expect(session.resumedAt?.toISOString()).toBe(START.toISOString());
    expect(sessionElapsedSeconds(session, START)).toBe(0);
  });

  it('derives elapsed time from the resumed date', () => {
    const session = createGameSession('pool', players, START);
    const now = new Date(START.getTime() + 90_000);

    expect(sessionElapsedMs(session, now)).toBe(90_000);
    expect(sessionElapsedSeconds(session, now)).toBe(90);
  });

  it('freezes time while paused and resumes from the accumulated value', () => {
    const session = createGameSession('pool', players, START);
    const pausedAt = new Date(START.getTime() + 60_000);
    const paused = pauseSession(session, pausedAt);

    expect(paused.resumedAt).toBeNull();
    expect(sessionElapsedMs(paused, new Date(START.getTime() + 600_000))).toBe(60_000);

    const resumedAt = new Date(START.getTime() + 600_000);
    const resumed = resumeSession(paused, resumedAt);

    expect(sessionElapsedSeconds(resumed, new Date(resumedAt.getTime() + 30_000))).toBe(90);
  });

  it('calculates the session cost from derived seconds', () => {
    const session = createGameSession('pool', players, START);
    const now = new Date(START.getTime() + 3_600_000);

    expect(sessionCost(session, now)).toBe(calculateSessionCost(3600, session.ratePerHour));
  });

  it('builds a view with elapsed seconds, cost and pause flag', () => {
    const session = pauseSession(createGameSession('pool', players, START), START);
    const view = toStationView(
      {
        id: 'M-01',
        displayNumber: '01',
        label: 'M-01',
        status: 'paused',
        gameType: 'pool',
        session,
      },
      START,
    );

    expect(view.session?.elapsedSeconds).toBe(0);
    expect(view.session?.totalCost).toBe(calculateSessionCost(0, session.ratePerHour));
    expect(view.session?.isPaused).toBe(true);
  });
});
