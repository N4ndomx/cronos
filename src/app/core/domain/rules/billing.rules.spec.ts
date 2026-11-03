import { calculateSessionCost, MINIMUM_CHARGE } from './billing.rules';

describe('calculateSessionCost', () => {
  it('applies the minimum charge at zero seconds', () => {
    expect(calculateSessionCost(0, 12000)).toBe(MINIMUM_CHARGE);
  });

  it('charges the full hourly rate after one hour', () => {
    expect(calculateSessionCost(3600, 12000)).toBe(12000);
  });

  it('charges half the rate after thirty minutes', () => {
    expect(calculateSessionCost(1800, 12000)).toBe(6000);
  });

  it('rounds the result to the nearest 100 COP', () => {
    expect(calculateSessionCost(700, 12000)).toBe(2300);
  });

  it('never returns less than the minimum charge', () => {
    expect(calculateSessionCost(10, 6000)).toBe(MINIMUM_CHARGE);
  });
});
