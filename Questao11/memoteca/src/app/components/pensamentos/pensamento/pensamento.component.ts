import { Router } from '@angular/router';
import { PensamentoService } from './../pensamento.service';
import { Component, Input, OnInit } from '@angular/core';

import { Pensamento } from '../pensamento';

@Component({
  selector: 'app-pensamento',
  templateUrl: './pensamento.component.html',
  styleUrls: ['./pensamento.component.scss']
})
export class PensamentoComponent implements OnInit {

  @Input() pensamento: Pensamento = {
    id: 0,
    conteudo: '',
    autoria: '',
    modelo: '',
    favorito: false
  }

  @Input() listaFavoritos: Pensamento[] = [];

  constructor(private service: PensamentoService, private router: Router) { }

  ngOnInit(): void {
  }

  larguraPensamento(): string {
    if(this.pensamento.conteudo.length >= 256) {
      return 'pensamento-g'
    } else {
      return 'pensamento-p'
    }
  }

  atualizarFavorito() {
    this.service.mudarFavorito(this.pensamento)
      .subscribe(() => {
        this.listaFavoritos.splice(this.listaFavoritos.indexOf(this.pensamento), 1)
      });
  }

}
