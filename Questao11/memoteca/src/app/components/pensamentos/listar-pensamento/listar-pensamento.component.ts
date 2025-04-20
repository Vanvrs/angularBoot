/*
import { Component, OnInit } from '@angular/core';
import { PensamentoService } from '../../../services/pensamento.service';
import { Pensamento } from '../pensamento';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-pensamento',
  templateUrl: './listar-pensamento.component.html',
  styleUrls: ['./listar-pensamento.component.scss']
})
export class ListarPensamentoComponent implements OnInit {
  listaPensamentos: Pensamento[] = [];
  modalAberto: boolean = false;
  pensamentoParaExcluir: Pensamento | null = null;

  constructor(
    private service: PensamentoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.carregarPensamentos();
  }

  carregarPensamentos() {
    this.service.listar().subscribe({
      next: (pensamentos) => {
        // Filtramos para garantir que só temos pensamentos com ID
        this.listaPensamentos = pensamentos.filter(p => p.id !== undefined);
      },
      error: (err) => {
        console.error('Erro ao carregar pensamentos:', err);
      }
    });
  }

  prepararExclusao(pensamentoId: number) {
    const pensamento = this.listaPensamentos.find(p => p.id === pensamentoId);
    if (pensamento) {
      this.pensamentoParaExcluir = pensamento;
      this.modalAberto = true;
    }
  }

  editarPensamento(pensamentoId: number) {
    this.router.navigate(['/pensamento/editarPensamento', pensamentoId]);
  }

  confirmarExclusao(confirmado: boolean) {
    if (confirmado && this.pensamentoParaExcluir?.id) {
      this.service.excluir(this.pensamentoParaExcluir.id).subscribe(() => {
        this.carregarPensamentos();
      });
    }
    this.modalAberto = false;
    this.pensamentoParaExcluir = null;
  }
}
 */

// listar-pensamento.component.ts

import { Component, OnInit } from '@angular/core';
import { PensamentoService } from '../../../services/pensamento.service';
import { Pensamento } from '../pensamento';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-pensamento',
  templateUrl: './listar-pensamento.component.html',
  styleUrls: ['./listar-pensamento.component.scss']
})
export class ListarPensamentoComponent implements OnInit {
  listaPensamentos: Pensamento[] = [];
  modalAberto: boolean = false;
  pensamentoParaExcluir: Pensamento | null = null;

  // Variáveis de paginação
  paginaAtual: number = 1;
  itensPorPagina: number = 6;
  totalItens: number = 0;
  totalPaginas: number = 0;
  paginas: number[] = [];

  constructor(
    private service: PensamentoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.carregarPensamentos();
  }

  carregarPensamentos() {
    this.service.listarPaginado(this.paginaAtual, this.itensPorPagina).subscribe({
      next: (response) => {
        this.listaPensamentos = response.itens.filter(p => p.id !== undefined);
        this.totalItens = response.totalItens;
        this.calcularPaginas();
      },
      error: (err) => {
        console.error('Erro ao carregar pensamentos:', err);
      }
    });
  }

  calcularPaginas() {
    this.totalPaginas = Math.ceil(this.totalItens / this.itensPorPagina);
    this.paginas = Array.from({length: this.totalPaginas}, (_, i) => i + 1);
  }

  mudarPagina(pagina: number) {
    if (pagina >= 1 && pagina <= this.totalPaginas) {
      this.paginaAtual = pagina;
      this.carregarPensamentos();
    }
  }

  prepararExclusao(pensamentoId: number) {
    const pensamento = this.listaPensamentos.find(p => p.id === pensamentoId);
    if (pensamento) {
      this.pensamentoParaExcluir = pensamento;
      this.modalAberto = true;
    }
  }

  editarPensamento(pensamentoId: number) {
    this.router.navigate(['/pensamento/editarPensamento', pensamentoId]);
  }

  confirmarExclusao(confirmado: boolean) {
    if (confirmado && this.pensamentoParaExcluir?.id) {
      this.service.excluir(this.pensamentoParaExcluir.id).subscribe(() => {
        // Recarregar pensamentos mantendo a página atual
        this.carregarPensamentos();
      });
    }
    this.modalAberto = false;
    this.pensamentoParaExcluir = null;
  }
}
