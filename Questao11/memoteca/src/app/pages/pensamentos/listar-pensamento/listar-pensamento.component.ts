import { Component, OnInit } from '@angular/core';
//import { PensamentoService } from '../../../services/pensamento.service';
import { PensamentoService } from 'src/app/shared/services/pensamento.service';
import { Pensamento } from 'src/app/shared/interfaces/pensamento';
//import { Pensamento } from '../pensamento';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-pensamento',
  templateUrl: './listar-pensamento.component.html',
  styleUrls: ['./listar-pensamento.component.scss']
})
export class ListarPensamentoComponent implements OnInit {
  listaPensamentos: Pensamento[] = []; // lista que armazena os pensamentos
  modalAberto: boolean = false;
  pensamentoParaExcluir: Pensamento | null = null; //Armazena o pensamento selecionado para exclusão

  //Variáveis de paginação
  paginaAtual: number = 1;
  itensPorPagina: number = 6;
  totalItens: number = 0;
  totalPaginas: number = 0;
  paginas: number[] = [];

  constructor(
    private service: PensamentoService,
    private router: Router
  ) { }

  //Inicializa o componente carregando os pensamentos
  ngOnInit(): void {
    this.carregarPensamentos();
  }

  //Carrega pensamentos paginados do serviço
  //Atualiza o total de itens e calcula as páginas
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

  //Calcula o número total de páginas
  //Cria um array com os números das páginas disponíveis
  calcularPaginas() {
    this.totalPaginas = Math.ceil(this.totalItens / this.itensPorPagina);
    this.paginas = Array.from({length: this.totalPaginas}, (_, i) => i + 1);
  }

  //Altera a página atual e recarrega os pensamentos
  //Verifica limites válidos de paginação
  mudarPagina(pagina: number) {
    if (pagina >= 1 && pagina <= this.totalPaginas) {
      this.paginaAtual = pagina;
      this.carregarPensamentos();
    }
  }
//Confirma ou cancela a exclusão baseado na resposta do modal

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
//Se confirmado, chama o serviço para excluir e recarrega a lista
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
