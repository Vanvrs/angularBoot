import { Router } from '@angular/router';
import { PensamentoService } from  '../../../services/pensamento.service';
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
    pensamentoDoAutor: true,
    nomeAutor: '',
    modelo: '',

  }

  @Input() listaPensamentos: Pensamento[] = [];

  constructor(private service: PensamentoService, private router: Router) { }

  ngOnInit(): void {
  }

/*   larguraPensamento(): string {
    if(this.pensamento.length >= 256) {
      return 'pensamento-g'
    } else {
      return 'pensamento-p'
    }
  } */

  atualizarFavorito() {
    this.service.mudarPensamento(this.pensamento)
      .subscribe(() => {
        this.listaPensamentos.splice(this.listaPensamentos.indexOf(this.pensamento), 1)
      });
  }

}
