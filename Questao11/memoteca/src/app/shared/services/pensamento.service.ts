
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';
import { Pensamento } from '../interfaces/pensamento';

@Injectable({
  providedIn: 'root'
})
export class PensamentoService {
  private readonly API = 'https://localhost:7074/pensamentos';

  constructor(private http: HttpClient) { }

  listar(): Observable<Pensamento[]> {
    return this.http.get<Pensamento[]>(this.API).pipe(
      map(pensamentos => pensamentos.map(p => ({
        id: p.id || 0, // Garante que sempre terá um id
        pensamentoDoAutor: p.pensamentoDoAutor,
        nomeAutor: p.nomeAutor,
        modelo: p.modelo
      }))
    ))
  }

  buscarPorId(id: number): Observable<Pensamento> {
    const url = `${this.API}/${id}`;
    return this.http.get<Pensamento>(url).pipe(
      catchError(error => {
        console.error('Erro ao buscar pensamento:', error);
        return of({} as Pensamento);
      })
    );
  }

  criar(pensamento: any): Observable<Pensamento> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<Pensamento>(this.API, pensamento, { headers }).pipe(
      catchError(error => {
        console.error('Erro ao criar pensamento:', {
          status: error.status,
          message: error.message,
          error: error.error
        });
        return throwError(() => new Error('Erro ao criar pensamento'));
      })
    );
  }

    editar(pensamento: Pensamento): Observable<Pensamento> {
      const url = `${this.API}/${pensamento.id}`;

      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      });

      return this.http.put<Pensamento>(url, pensamento, { headers }).pipe(
        catchError(error => {
          console.error('Erro na requisição:', {
            status: error.status,
            message: error.message,
            url: url,
            body: pensamento,
            error: error.error
          });
          return throwError(() => new Error('Erro ao editar pensamento'));
        })
      );
    }


  excluir(id: number): Observable<Pensamento> {
    const url = `${this.API}/${id}`;
    return this.http.delete<Pensamento>(url).pipe(
      catchError(error => {
        console.error('Erro ao excluir pensamento:', error);
        return of({} as Pensamento);
      })
    );
  }
  // pensamento.service.ts

listarPaginado(pagina: number, itensPorPagina: number): Observable<{ totalItens: number, paginaAtual: number, itensPorPagina: number, itens: Pensamento[] }> {
  const url = `${this.API}/${pagina}/${itensPorPagina}`;
  return this.http.get<{ totalItens: number, paginaAtual: number, itensPorPagina: number, itens: Pensamento[] }>(url).pipe(
    catchError(error => {
      console.error('Erro ao carregar pensamentos paginados:', error);
      return of({ totalItens: 0, paginaAtual: 1, itensPorPagina: 6, itens: [] });
    })
  );
}
}
