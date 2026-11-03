/** Cobro mínimo por apertura de sesión (COP). */
export const MINIMUM_CHARGE = 2000;

/** Redondeo del cobro al múltiplo de 100 COP más cercano. */
export const BILLING_ROUNDING_STEP = 100;

/**
 * Calcula el valor a pagar por una sesión de juego.
 * Regla de negocio pura: no depende de Angular ni del almacenamiento.
 */
export function calculateSessionCost(elapsedSeconds: number, ratePerHour: number): number {
  const safeSeconds = Math.max(0, elapsedSeconds);
  const hours = safeSeconds / 3600;
  const rawCost = (ratePerHour * hours) / BILLING_ROUNDING_STEP;

  return Math.max(MINIMUM_CHARGE, Math.round(rawCost) * BILLING_ROUNDING_STEP);
}
