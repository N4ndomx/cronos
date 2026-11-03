import { Player } from '../models/player.model';

export function buildInitials(name: string): string {
  const initials = name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return initials || 'JG';
}

export function createPlayer(name: string, id: string): Player {
  const trimmedName = name.trim();

  return {
    id,
    name: trimmedName,
    initials: buildInitials(trimmedName),
  };
}
