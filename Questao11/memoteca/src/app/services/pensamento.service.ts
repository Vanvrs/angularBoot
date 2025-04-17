import { HttpClient, HttpParams } from '@angular/common/http';
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

/* listar(pagina: number, filtro: string): Observable<Pensamento[]> {
    let params = new HttpParams()
      .set('_page', pagina.toString())
      .set('_limit', '6');

    if (filtro.trim().length > 0) {
      params = params.set('q', filtro);
    }

    return this.http.get<Pensamento[]>(this.API, { params });
  }  */

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


