export function createId(): string {
  const cryptoRef = globalThis.crypto;

  if (cryptoRef && typeof cryptoRef.randomUUID === 'function') {
    return cryptoRef.randomUUID();
  }

  return `id-${Date.now()}-${Math.random().toString(16).slice(2, 10)}`;
}
