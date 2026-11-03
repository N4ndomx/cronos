import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { GameSessionStore, SessionFilter } from '@core/application/game-session.store';
import { UiStateStore } from '@core/application/ui-state.store';
import { GameStationView } from '@core/domain/models/game-station.model';
import { formatCurrency, formatDuration } from '@core/utils/format';
import { ToastStore } from '@shared/feedback/toast.store';
import { ClubHeaderComponent } from '@shared/ui/club-header/club-header.component';

@Component({
  selector: 'app-game-sessions-page',
  imports: [CommonModule, RouterLink, RouterOutlet, ClubHeaderComponent],
  templateUrl: './game-sessions-page.component.html',
  styleUrl: './game-sessions-page.component.css',
})
export class GameSessionsPageComponent {
  private readonly sessionStore = inject(GameSessionStore);
  private readonly toastStore = inject(ToastStore);
  private readonly uiState = inject(UiStateStore);

  readonly stations = this.sessionStore.displayedStations;
  readonly activeFilter = this.sessionStore.activeFilter;
  readonly expandedStationId = this.sessionStore.expandedStationId;

  readonly totalStations = this.sessionStore.totalStationsCount;
  readonly activeSessionCount = this.sessionStore.activeSessionsCount;
  readonly availableStationCount = this.sessionStore.availableStationsCount;
  readonly occupancyPercentage = this.sessionStore.occupancyPercentage;

  readonly billingStation = signal<GameStationView | null>(null);
  readonly isOverlayOpen = this.uiState.isOverlayOpen;

  /** Occupancy traffic-light thresholds. */
  private readonly mediumOccupancy = 60;
  private readonly highOccupancy = 85;

  readonly occupancyLevel = computed<'low' | 'medium' | 'high'>(() => {
    const percentage = this.occupancyPercentage();

    if (percentage >= this.highOccupancy) {
      return 'high';
    }

    return percentage >= this.mediumOccupancy ? 'medium' : 'low';
  });

  readonly formatDuration = formatDuration;
  readonly formatCurrency = formatCurrency;

  setFilter(filter: SessionFilter): void {
    this.sessionStore.setFilter(filter);
  }

  toggleStationExpand(stationId: string): void {
    this.sessionStore.toggleStationExpanded(stationId);
  }

  toggleSessionPause(stationId: string, event?: Event): void {
    event?.stopPropagation();
    this.sessionStore.toggleSessionPause(stationId);
  }

  endSession(stationId: string, event?: Event): void {
    event?.stopPropagation();

    if (confirm(`¿Deseas finalizar la sesión de la estación ${stationId}?`)) {
      this.sessionStore.endSession(stationId);
      this.toastStore.show(`Sesión de la estación ${stationId} finalizada.`);
    }
  }

  openBilling(station: GameStationView, event?: Event): void {
    event?.stopPropagation();
    this.billingStation.set(station);
  }

  closeBilling(): void {
    this.billingStation.set(null);
  }

  confirmCheckout(): void {
    const station = this.billingStation();

    if (!station) {
      return;
    }

    this.sessionStore.endSession(station.id);
    this.closeBilling();
    this.toastStore.show(`Sesión de la estación ${station.id} cobrada y liberada.`);
  }
}
