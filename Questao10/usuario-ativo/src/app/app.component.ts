import { Component } from '@angular/core';
import { UsuarioStatusComponent } from './componentes/usuario-status/usuario-status.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [UsuarioStatusComponent],
  template: `<app-usuario-status></app-usuario-status>`
})
export class AppComponent {}
