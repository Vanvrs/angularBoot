
import { Component, Input } from '@angular/core';
import { Pensamento } from '../pensamento';

@Component({
  selector: 'app-pensamento',
  templateUrl: './pensamento.component.html',
  styleUrls: ['./pensamento.component.scss']
})
export class PensamentoComponent {
  @Input() pensamento: Pensamento = {
    id: 0,
    PensamentoDoAutor: '',
    NomeAutor: '',
    Modelo: 0,
  };
} 
