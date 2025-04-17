/* import { Component, OnInit } from '@angular/core';
import { PensamentoService } from '../../../services/pensamento.service';
import { Pensamento } from '../pensamento';

@Component({
  selector: 'app-listar-pensamento',
  templateUrl: './listar-pensamento.component.html',
  styleUrls: ['./listar-pensamento.component.scss']
})
export class ListarPensamentoComponent implements OnInit {
  listaPensamentos: Pensamento[] = [];
  paginaAtual: number = 1;
  filtro: string = '';
  titulo: string = 'Meu Mural'

  constructor(private service: PensamentoService) {}

  ngOnInit(): void {
    this.carregarPensamentos();


  }


carregarPensamentos() {
    this.service.listar().subscribe({
      next: (pensamentos) => {
        console.log('Pensamentos recebidos:', pensamentos);
        // Garante que o Modelo é string para o binding
        this.listaPensamentos = pensamentos.map(p => ({
          ...p,
          Modelo: p.Modelo.toString()
        }));
      },
      error: (err) => {
        console.error('Erro completo:', err);
        this.listaPensamentos = [];
      }
    });


  }}

 */

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
