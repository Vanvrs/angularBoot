import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormularioComponent } from './formulario/formulario.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormularioComponent],
  template: `
    <app-formulario></app-formulario>
  `,
  styles: []
})
export class AppComponent {
  title = 'formulario-inscricao';
}