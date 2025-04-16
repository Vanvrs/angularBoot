import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PensamentoService {
  private readonly API = 'https://localhost:7074/api/pensamentos';

  constructor(private http: HttpClient) { }

  listar(pagina: number, filtro: string, favoritos: boolean): Observable<any[]> {
    let params = new HttpParams()
      .set('_page', pagina.toString())
      .set('_limit', '6');

    if (filtro.trim().length > 0) {
      params = params.set('q', filtro);
    }

    if (favoritos) {
      params = params.set('favorito', 'true');
    }

    return this.http.get<any[]>(this.API, { params });
  }

  criar(pensamento: any): Observable<any> {
    return this.http.post(this.API, {
      Conteudo: pensamento.conteudo,
      Autoria: pensamento.autoria,
      Modelo: pensamento.modelo,
      Favorito: pensamento.favorito || false
    });
  }

  editar(pensamento: any): Observable<any> {
    const url = `${this.API}/${pensamento.id}`;
    return this.http.put(url, {
      Id: pensamento.id,
      Conteudo: pensamento.conteudo,
      Autoria: pensamento.autoria,
      Modelo: pensamento.modelo,
      Favorito: pensamento.favorito
    });
  }

  excluir(id: number): Observable<any> {
    const url = `${this.API}/${id}`;
    return this.http.delete(url);
  }
}
//conexao
//listar-pensamento.component.t
