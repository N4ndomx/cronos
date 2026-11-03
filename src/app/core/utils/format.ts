export function formatDuration(seconds: number, includeSeconds: boolean = true): string {
  const safeSeconds = Math.max(0, Math.floor(seconds));
  const hours = Math.floor(safeSeconds / 3600);
  const minutes = Math.floor((safeSeconds % 3600) / 60);
  const remainingSeconds = safeSeconds % 60;
  const pad = (value: number) => value.toString().padStart(2, '0');

  return includeSeconds
    ? `${pad(hours)}:${pad(minutes)}:${pad(remainingSeconds)}`
    : `${pad(hours)}:${pad(minutes)}`;
}

export function formatCurrency(amount: number): string {
  return '$ ' + Math.round(amount).toLocaleString('es-CO');
}
