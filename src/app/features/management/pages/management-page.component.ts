import { Component } from '@angular/core';
import { PlaceholderPageComponent } from '@shared/ui/placeholder-page/placeholder-page.component';

@Component({
  selector: 'app-management-page',
  imports: [PlaceholderPageComponent],
  template: `
    <app-placeholder-page
      icon="table_restaurant"
      title="Gestión del Salón"
      description="Administración del parque de estaciones de juego, modalidades y tarifas por hora."
    />
  `,
})
export class ManagementPageComponent {}
