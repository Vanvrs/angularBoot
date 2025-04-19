/*
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
  pensamentoParaExcluir: Pensamento | null = null;
  modalAberto: boolean = false;

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

  prepararExclusao(pensamentoId: number) {
    this.service.buscarPorId(pensamentoId).subscribe(pensamento => {
      this.pensamentoParaExcluir = pensamento;
      this.modalAberto = true;
    });
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



// src/app/components/pensamentos/listar-pensamento/listar-pensamento.component.ts
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
