import { Component } from '@angular/core';
import { PlaceholderPageComponent } from '@shared/ui/placeholder-page/placeholder-page.component';

@Component({
  selector: 'app-settings-page',
  imports: [PlaceholderPageComponent],
  template: `
    <app-placeholder-page
      icon="settings"
      title="Configuración"
      description="Ajustes del club, redondeo de fracciones de tiempo e impresoras de tickets POS."
    />
  `,
})
export class SettingsPageComponent {}
