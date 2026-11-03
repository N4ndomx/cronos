import { GameStation } from '../../domain/models/game-station.model';
import {
  fromGameStateSnapshotDto,
  fromGameStationDto,
  toGameStateSnapshotDto,
  toGameStationDto,
} from './game-station.mapper';

describe('game station mapper', () => {
  it('round-trips a station keeping the session date as a Date', () => {
    const station: GameStation = {
      id: 'M-01',
      displayNumber: '01',
      label: 'M-01',
      status: 'in_use',
      gameType: 'pool',
      session: {
        startTime: new Date('2025-02-01T10:00:00.000Z'),
        accumulatedMs: 3_600_000,
        resumedAt: null,
        ratePerHour: 12000,
        players: [{ id: 'p1', name: 'Ana', initials: 'A' }],
      },
    };

    const restored = fromGameStationDto(toGameStationDto(station));

    expect(restored).not.toBeNull();
    expect(restored?.session?.startTime).toBeInstanceOf(Date);
    expect(restored?.session?.startTime.toISOString()).toBe('2025-02-01T10:00:00.000Z');
    expect(restored?.session?.accumulatedMs).toBe(3_600_000);
    expect(restored?.session?.resumedAt).toBeNull();
    expect(restored?.session?.players).toEqual(station.session?.players);
  });

  it('rejects records with an invalid status', () => {
    const restored = fromGameStationDto({
      id: 'M-01',
      displayNumber: '01',
      label: 'M-01',
      status: 'exploded',
      gameType: 'pool',
    });

    expect(restored).toBeNull();
  });

  it('rejects records that are not objects', () => {
    expect(fromGameStationDto('not-a-station')).toBeNull();
  });

  it('round-trips a full snapshot with its seed version', () => {
    const station: GameStation = {
      id: 'M-01',
      displayNumber: '01',
      label: 'M-01',
      status: 'available',
      gameType: 'pool',
    };

    const snapshot = toGameStateSnapshotDto([station], 7);
    const restored = fromGameStateSnapshotDto(snapshot, 7);

    expect(snapshot.seedVersion).toBe(7);
    expect(restored).toHaveLength(1);
    expect(restored?.[0].id).toBe('M-01');
  });

  it('rejects snapshots from another seed version', () => {
    const snapshot = toGameStateSnapshotDto(
      [
        {
          id: 'M-01',
          displayNumber: '01',
          label: 'M-01',
          status: 'available',
          gameType: 'pool',
        },
      ],
      1,
    );

    expect(fromGameStateSnapshotDto(snapshot, 2)).toBeNull();
  });

  it('rejects snapshots with an empty or invalid station list', () => {
    expect(fromGameStateSnapshotDto({ seedVersion: 1, stations: [] }, 1)).toBeNull();
    expect(fromGameStateSnapshotDto({ seedVersion: 1, stations: [{ id: 'M-01' }] }, 1)).toBeNull();
    expect(fromGameStateSnapshotDto([], 1)).toBeNull();
  });
});
