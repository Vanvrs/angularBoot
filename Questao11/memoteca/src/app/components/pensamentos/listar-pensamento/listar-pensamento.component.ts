import { Component, OnInit } from '@angular/core';
import { PensamentoService } from '../../../services/pensamento.service';
import { Pensamento } from '../pensamento';

@Component({
  selector: 'app-listar-pensamento',
  templateUrl: './listar-pensamento.component.html',
  styleUrls: ['./listar-pensamento.component.scss']
})
export class ListarPensamentoComponent implements OnInit {
  listaPensamentos: Pensamento[] = [];
titulo: any;

  constructor(private service: PensamentoService) { }

  ngOnInit(): void {
    this.carregarPensamentos();
  }

  carregarPensamentos() {
    this.service.listar().subscribe({
      next: (pensamentos) => {
        this.listaPensamentos = pensamentos;
      },
      error: (err) => {
        console.error('Erro ao carregar pensamentos:', err);
      }
    });
  }
}
