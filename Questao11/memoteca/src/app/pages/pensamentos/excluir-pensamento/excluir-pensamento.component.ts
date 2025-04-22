

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
//import { PensamentoService } from '../../../services/pensamento.service';
import { PensamentoService } from 'src/app/shared/services/pensamento.service';
import { Pensamento } from 'src/app/shared/interfaces/pensamento';
//import { Pensamento } from '../pensamento';

@Component({
  selector: 'app-excluir-pensamento',
  templateUrl: './excluir-pensamento.component.html',
  styleUrls: ['./excluir-pensamento.component.scss']
})
export class ExcluirPensamentoComponent implements OnInit {
  pensamento: Pensamento = {
    id: 0,
    pensamentoDoAutor: '',
    nomeAutor: '',
    modelo: 0
  };
  modalAberto: boolean = false;

  constructor(
    private service: PensamentoService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  //Método do ciclo de vida que é executado quando o componente é inicializado
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.service.buscarPorId(parseInt(id!)).subscribe((pensamento) => {
      this.pensamento = pensamento;
    });
  }
//Manipula a resposta do modal de confirmação
  handleConfirmacao(confirmado: boolean) {
    if (confirmado) {
      this.excluirPensamento();
    }
    this.modalAberto = false;
  }

  //Verifica se há um ID válido
  excluirPensamento() {
    if(this.pensamento.id) {
      this.service.excluir(this.pensamento.id).subscribe(() => {
        this.router.navigate(['/listarPensamento']);
      });
    }
  }

  cancelar() {
    this.router.navigate(['/listarPensamento']);
  }
}
