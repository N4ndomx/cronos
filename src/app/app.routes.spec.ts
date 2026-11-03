import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { GameStationRepository } from '@core/application/ports/game-station.repository';
import { LocalStorageGameStationRepository } from '@core/infrastructure/persistence/local-storage-game-station.repository';
import { routes } from './app.routes';

describe('app routes', () => {
  beforeEach(() => {
    localStorage.clear();

    TestBed.configureTestingModule({
      providers: [
        provideRouter(routes),
        { provide: GameStationRepository, useClass: LocalStorageGameStationRepository },
      ],
    });
  });

  it('redirects the root path to the game sessions feature', async () => {
    const router = TestBed.inject(Router);

    await router.navigateByUrl('/');

    expect(router.url).toBe('/sessions');
  });

  it('lazy-loads the game sessions feature', async () => {
    const harness = await RouterTestingHarness.create('/sessions');

    expect(harness.routeNativeElement?.querySelector('.salon-status-card')).not.toBeNull();
  });

  it('lazy-loads the cash feature', async () => {
    const harness = await RouterTestingHarness.create('/cash');

    expect(harness.routeNativeElement?.textContent).toContain('Módulo de Caja');
  });

  it('renders the open session wizard as a child route of game sessions', async () => {
    const harness = await RouterTestingHarness.create('/sessions/new');

    expect(harness.routeNativeElement?.querySelector('app-open-session-wizard')).not.toBeNull();
  });
});
