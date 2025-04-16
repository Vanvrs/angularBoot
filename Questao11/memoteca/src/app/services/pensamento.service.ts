import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'

import { Pensamento } from '../../app/components/pensamentos/pensamento';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PensamentoService {

  private readonly API = 'https://localhost:7074'

  constructor(private http: HttpClient) { }

  listar(pagina: number, filtro: string, pensamentos: string): Observable<Pensamento[]> {
    const itensPorPagina = 6;

    let params = new HttpParams()
      .set("_page", pagina)
      .set("_limit", itensPorPagina)

    if(filtro.trim().length > 2) {
      params = params.set("q", filtro)
    }

    if(pensamentos) {
      params = params.set("pensamentoDoAutor", true)
    }

    return this.http
      .get<Pensamento[]>(this.API, { params })
  }

  criar(pensamento: Pensamento): Observable<Pensamento> {
    return this.http.post<Pensamento>(this.API, pensamento)
  }

  editar(pensamento: Pensamento): Observable<Pensamento> {
    const url = `${this.API}/${pensamento.id}`
    return this.http.put<Pensamento>(url, pensamento)
  }

  mudarPensamento(pensamento: Pensamento): Observable<Pensamento> {
    pensamento.pensamentoDoAutor = !pensamento.pensamentoDoAutor
    const url = `${this.API}/${pensamento.id}`
    return this.http.put<Pensamento>(url, pensamento)
  }

  excluir(id: number): Observable<Pensamento> {
    const url = `${this.API}/${id}`;
    return this.http.delete<Pensamento>(url)
  }

  buscarPorId(id: number): Observable<Pensamento> {
    const url = `${this.API}/${id}`
    return this.http.get<Pensamento>(url)
  }
}
