import { computed, Injectable, signal } from '@angular/core';

/**
 * Estado de UI global que afecta al shell de la aplicación.
 * Permite ocultar la barra de navegación cuando hay un flujo modal activo.
 */
@Injectable({ providedIn: 'root' })
export class UiStateStore {
  private readonly overlayCount = signal(0);

  readonly isOverlayOpen = computed(() => this.overlayCount() > 0);

  openOverlay(): void {
    this.overlayCount.update((count) => count + 1);
  }

  closeOverlay(): void {
    this.overlayCount.update((count) => Math.max(0, count - 1));
  }
}
