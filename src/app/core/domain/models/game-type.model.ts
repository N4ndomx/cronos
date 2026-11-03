export type GameType = 'pool' | 'carambola' | 'pingpong' | 'futbolin';

export interface GameTypeOption {
  readonly id: GameType;
  readonly name: string;
  readonly hourlyRate: number;
  readonly icon: string;
}

export const GAME_TYPE_OPTIONS: readonly GameTypeOption[] = [
  { id: 'pool', name: 'Billar Pool', hourlyRate: 12000, icon: 'pool' },
  { id: 'carambola', name: 'Carambola', hourlyRate: 15000, icon: 'carambola' },
  { id: 'pingpong', name: 'Ping Pong', hourlyRate: 8000, icon: 'pingpong' },
  { id: 'futbolin', name: 'Futbolín', hourlyRate: 6000, icon: 'futbolin' },
];

export const DEFAULT_GAME_TYPE: GameType = 'pool';

export function findGameTypeOption(id: GameType): GameTypeOption {
  return GAME_TYPE_OPTIONS.find((option) => option.id === id) ?? GAME_TYPE_OPTIONS[0];
}

export function isGameType(value: unknown): value is GameType {
  return GAME_TYPE_OPTIONS.some((option) => option.id === value);
}

export function gameTypeLabel(id: GameType): string {
  return findGameTypeOption(id).name;
}
