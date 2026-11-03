import { Component } from '@angular/core';
import { PlaceholderPageComponent } from '@shared/ui/placeholder-page/placeholder-page.component';

@Component({
  selector: 'app-cash-page',
  imports: [PlaceholderPageComponent],
  template: `
    <app-placeholder-page
      icon="point_of_sale"
      title="Módulo de Caja"
      description="Control de gaveta, arqueo de turno y conciliación de métodos de pago."
    />
  `,
})
export class CashPageComponent {}
