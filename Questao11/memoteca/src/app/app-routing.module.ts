
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarPensamentoComponent } from './pages/pensamentos/listar-pensamento/listar-pensamento.component';
import { CriarPensamentoComponent } from './pages/pensamentos/criar-pensamento/criar-pensamento.component';
import { EditarPensamentosComponent } from './pages/pensamentos/editar-pensamentos/editar-pensamentos.component';
import { ExcluirPensamentoComponent } from './pages/pensamentos/excluir-pensamento/excluir-pensamento.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'listarPensamento',
    pathMatch: 'full'
  },
  {
    path: 'listarPensamento',
    component: ListarPensamentoComponent
  },
  {
    path: 'criarPensamento',
    component: CriarPensamentoComponent
  },
  {
    path: 'pensamento/editarPensamento/:id',
    component: EditarPensamentosComponent
  },
  {
    path: 'pensamento/excluirPensamento/:id',
    component: ExcluirPensamentoComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
