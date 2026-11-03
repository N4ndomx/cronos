import { GameStation } from '../../domain/models/game-station.model';
import { GameType } from '../../domain/models/game-type.model';
import { createPlayer } from '../../domain/rules/player.rules';
import { createGameSession } from '../../domain/rules/game-session.rules';

interface ActiveSessionSeed {
  readonly seconds: number;
  readonly gameType: GameType;
  readonly players: readonly string[];
}

/**
 * Versión del fixture de estaciones.
 *
 * Súbela SIEMPRE que cambies la cantidad de estaciones, los estados iniciales o
 * los jugadores de demostración. Las instantáneas guardadas con otra versión
 * se descartan y se vuelve a generar la seed.
 */
export const SEED_VERSION = 2;

/**
 * Datos de demostración del salón
 * Viven en infraestructura porque son un fixture, no una regla de negocio.
 */
const ACTIVE_SESSIONS: Readonly<Record<string, ActiveSessionSeed>> = {
  'M-01': { seconds: 7900, gameType: 'pool', players: ['Carlos M.', 'Roberto G.', 'Andrés L.'] },
  'M-03': { seconds: 2718, gameType: 'pool', players: ['Julian V.'] },
};

const TOTAL_STATIONS = 5;

export function createInitialStations(now: Date = new Date()): GameStation[] {
  const stations: GameStation[] = [];

  for (let number = 1; number <= TOTAL_STATIONS; number++) {
    const displayNumber = number.toString().padStart(2, '0');
    const id = `M-${displayNumber}`;
    const activeSeed = ACTIVE_SESSIONS[id];

    if (activeSeed) {
      const startedAt = new Date(now.getTime() - activeSeed.seconds * 1000);
      const players = activeSeed.players.map((name, index) =>
        createPlayer(name, `seed-${number}-${index}`),
      );

      stations.push({
        id,
        displayNumber,
        label: id,
        status: 'in_use',
        gameType: activeSeed.gameType,
        statusLabel: 'Ocupada',
        session: createGameSession(activeSeed.gameType, players, startedAt),
      });
      continue;
    }

    stations.push({
      id,
      displayNumber,
      label: id,
      status: 'available',
      gameType: 'pool',
    });
  }

  return stations;
}
