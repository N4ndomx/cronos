import { Component, computed, DestroyRef, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { GameSessionStore } from '@core/application/game-session.store';
import { UiStateStore } from '@core/application/ui-state.store';
import { GameStationView } from '@core/domain/models/game-station.model';
import {
  DEFAULT_GAME_TYPE,
  GAME_TYPE_OPTIONS,
  GameType,
} from '@core/domain/models/game-type.model';
import { Player } from '@core/domain/models/player.model';
import { createPlayer } from '@core/domain/rules/player.rules';
import { createId } from '@core/utils/id';
import { ToastStore } from '@shared/feedback/toast.store';

@Component({
  selector: 'app-open-session-wizard',
  imports: [CommonModule, FormsModule],
  templateUrl: './open-session-wizard.component.html',
  styleUrl: './open-session-wizard.component.css',
})
export class OpenSessionWizardComponent {
  private readonly sessionStore = inject(GameSessionStore);
  private readonly toastStore = inject(ToastStore);
  private readonly uiState = inject(UiStateStore);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  readonly currentStep = signal<1 | 2>(1);
  readonly gameTypes = GAME_TYPE_OPTIONS;
  readonly selectedGameType = signal<GameType>(DEFAULT_GAME_TYPE);
  readonly selectedStationId = signal<string>('');
  readonly newPlayerName = signal<string>('');

  readonly players = signal<readonly Player[]>([]);

  readonly availableStations = this.sessionStore.availableStations;

  readonly selectedGameTypeName = computed(
    () => this.gameTypes.find((type) => type.id === this.selectedGameType())?.name ?? 'Billar Pool',
  );

  readonly selectedStation = computed(() =>
    this.sessionStore.stations().find((station) => station.id === this.selectedStationId()),
  );

  constructor() {
    this.uiState.openOverlay();
    this.destroyRef.onDestroy(() => this.uiState.closeOverlay());

    const firstAvailable = this.sessionStore.availableStations()[0];

    if (firstAvailable) {
      this.selectedStationId.set(firstAvailable.id);
    }
  }

  selectGameType(type: GameType): void {
    this.selectedGameType.set(type);
  }

  selectStation(station: GameStationView): void {
    if (station.status !== 'available') {
      return;
    }

    this.selectedStationId.set(station.id);
  }

  goToStep2(): void {
    if (!this.selectedStationId()) {
      return;
    }

    this.currentStep.set(2);
  }

  goToStep1(): void {
    this.currentStep.set(1);
  }

  onBack(): void {
    if (this.currentStep() === 2) {
      this.goToStep1();
      return;
    }

    this.close();
  }

  addPlayer(): void {
    const name = this.newPlayerName().trim();

    if (!name) {
      return;
    }

    this.players.update((list) => [...list, createPlayer(name, createId())]);
    this.newPlayerName.set('');
  }

  removePlayer(playerId: string): void {
    this.players.update((list) => list.filter((player) => player.id !== playerId));
  }

  startSession(): void {
    const stationId = this.selectedStationId();

    if (!stationId) {
      return;
    }

    const players =
      this.players().length > 0 ? this.players() : [createPlayer('Jugador 1', createId())];

    if (!this.sessionStore.openSession(stationId, this.selectedGameType(), players)) {
      this.toastStore.show('La estación ya no está disponible.');
      this.goToStep1();
      return;
    }

    this.toastStore.show(`Sesión iniciada en la estación ${stationId}.`);
    this.close();
  }

  private close(): void {
    void this.router.navigate(['/sessions']);
  }
}
