
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Pensamento } from '../pensamento';

@Component({
  selector: 'app-pensamento',
  templateUrl: './pensamento.component.html',
  styleUrls: ['./pensamento.component.scss']
})
export class PensamentoComponent {
  @Input() pensamento!: Pensamento; // Usando definite assignment assertion
  @Output() onExcluir = new EventEmitter<number>();
  @Output() onEditar = new EventEmitter<number>();

  solicitarExclusao() {
    if (this.pensamento.id) {
      this.onExcluir.emit(this.pensamento.id);
    }
  }

  solicitarEdicao() {
    if (this.pensamento.id) {
      this.onEditar.emit(this.pensamento.id);
    }
  }
}
