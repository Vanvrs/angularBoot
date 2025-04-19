/* import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { Pensamento } from '../components/pensamentos/pensamento';

@Injectable({
  providedIn: 'root'
})
export class PensamentoService {

  buscarPorId(id: number) : Observable<Pensamento> {
    const url = `${this.API}/${id}`;
    return this.http.get<Pensamento>(url);
  }
  private readonly API = 'https://localhost:7074/pensamentos';

  constructor(private http: HttpClient) { }


listar(): Observable<Pensamento[]> {

      return this.http.get<Pensamento[]>(this.API);
    }

  criar(pensamento: any): Observable<any> {
    return this.http.post(this.API, {
      pensamentoDoAutor: pensamento.pensamentoDoAutor,
      nomeAutor: pensamento.nomeAutor,
      modelo: pensamento.modelo,

    });
  }

editar(pensamento: Pensamento): Observable<Pensamento> {
  const url = `${this.API}/${pensamento.id}`;
  return this.http.put<Pensamento>(url, pensamento);
}
excluir(id: number): Observable<Pensamento> {
  return this.http.delete<Pensamento>(`${this.API}/${id}`);
}
}
 */

// src/app/services/pensamento.service.ts
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';
import { Pensamento } from '../components/pensamentos/pensamento';

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

  criar(pensamento: Pensamento): Observable<Pensamento> {
    return this.http.post<Pensamento>(this.API, pensamento).pipe(
      catchError(error => {
        console.error('Erro ao criar pensamento:', error);
        return of({} as Pensamento);
      })
    );
  }

  /* editar(pensamento: Pensamento): Observable<Pensamento> {
    if (!pensamento.id) {
      return throwError(() => new Error('ID do pensamento é necessário para edição'));
    }

    const url = `${this.API}/${pensamento.id}`;
    return this.http.put<Pensamento>(url, pensamento).pipe(
      tap(response => console.log('Resposta da API:', response)),
      catchError(error => {
        console.error('Erro na requisição PUT:', error);
        return throwError(() => error);
      })
    );
  } */

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
}
