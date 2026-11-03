import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UiStateStore } from '@core/application/ui-state.store';
import { ToastComponent } from '@shared/feedback/toast.component';
import { BottomNavComponent } from '@shared/ui/bottom-nav/bottom-nav.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, BottomNavComponent, ToastComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private readonly uiState = inject(UiStateStore);

  readonly isOverlayOpen = this.uiState.isOverlayOpen;
}
