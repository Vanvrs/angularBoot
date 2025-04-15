import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  verificarUsuarioAtivo(): Observable<{ usuarioAtivo: boolean }> {
    const ativo = Math.random() > 0.5;
    return of({ usuarioAtivo: ativo });
  }
}