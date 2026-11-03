import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { GameStationRepository } from '@core/application/ports/game-station.repository';
import { LocalStorageGameStationRepository } from '@core/infrastructure/persistence/local-storage-game-station.repository';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(
      routes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled',
        anchorScrolling: 'enabled',
      }),
    ),
    // Cambiar este binding es todo lo necesario para pasar de localStorage a una API.
    { provide: GameStationRepository, useClass: LocalStorageGameStationRepository },
  ],
};
