
// src/app/components/modal-confirmacao/modal-confirmacao.component.ts
/* import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal-confirmacao',
  templateUrl: './modal-confirmacao.component.html',
  styleUrls: ['./modal-confirmacao.component.scss']
})
export class ModalConfirmacaoComponent {
  @Input() aberto: boolean = false;
  @Input() titulo: string = 'Confirmação';
  @Input() mensagem: string = 'Tem certeza que deseja continuar?';
  @Output() confirmado = new EventEmitter<boolean>();

  confirmar() {
    this.confirmado.emit(true);
    this.aberto = false;
  }

  cancelar() {
    this.confirmado.emit(false);
    this.aberto = false;
  }
}
 */




// src/app/components/pensamentos/modal-confirmacao/modal-confirmacao.component.ts
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal-confirmacao',
  templateUrl: './modal-confirmacao.component.html',
  styleUrls: ['./modal-confirmacao.component.scss']
})
export class ModalConfirmacaoComponent {
  @Input() aberto: boolean = false;
  @Input() titulo: string = 'Confirmação';
  @Input() mensagem: string = 'Tem certeza que deseja continuar?';
  @Output() confirmado = new EventEmitter<boolean>();

  confirmar() {
    this.confirmado.emit(true);
  }

  cancelar() {
    this.confirmado.emit(false);
  }
}
