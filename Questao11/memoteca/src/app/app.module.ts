import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CabecalhoComponent } from './shared/components/cabecalho/cabecalho.component';
import { RodapeComponent } from './shared/components/rodape/rodape.component';
import { CriarPensamentoComponent } from './pages/pensamentos/criar-pensamento/criar-pensamento.component';
import { ListarPensamentoComponent } from './pages/pensamentos/listar-pensamento/listar-pensamento.component';
import { PensamentoComponent } from './pages/pensamentos/pensamento/pensamento.component';
import { ExcluirPensamentoComponent } from './pages/pensamentos/excluir-pensamento/excluir-pensamento.component';
import { EditarPensamentosComponent } from './pages/pensamentos/editar-pensamentos/editar-pensamentos.component';
import { ModalConfirmacaoComponent } from './pages/pensamentos/modal/modal-confirmacao.component';

@NgModule({
  declarations: [
    AppComponent,
    CabecalhoComponent,
    RodapeComponent,
    CriarPensamentoComponent,
    ListarPensamentoComponent,
    PensamentoComponent,
    ExcluirPensamentoComponent,
    EditarPensamentosComponent,
    ModalConfirmacaoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }



