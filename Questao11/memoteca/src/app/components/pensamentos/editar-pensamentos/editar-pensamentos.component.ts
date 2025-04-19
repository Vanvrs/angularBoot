/*import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { PensamentoService } from '../../../services/pensamento.service';
import { Component, OnInit } from '@angular/core';
import { Pensamento } from '../pensamento';

@Component({
  selector: 'app-editar-pensamentos',
  templateUrl: './editar-pensamentos.component.html',

})
export class EditarPensamentosComponent implements OnInit {
  formulario!: FormGroup;

  constructor(
    private service: PensamentoService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.service.buscarPorId(parseInt(id!)).subscribe((pensamento) => {
      this.formulario = this.formBuilder.group({
        id: [pensamento.id],
        pensamentoDoAutor: [pensamento.pensamentoDoAutor, Validators.compose([
          Validators.required,
          Validators.pattern(/(.|\s)*\S(.|\s)*/ /*)
        ])],
        nomeAutor: [pensamento.nomeAutor, Validators.compose([
          Validators.required,
          Validators.minLength(3)
        ])],
        modelo: [pensamento.modelo.toString()]
      });
    });
  }

  editarPensamento() {
    if (this.formulario.valid) {
      const pensamento: Pensamento = {
        id: this.formulario.value.id,
        pensamentoDoAutor: this.formulario.value.pensamentoDoAutor,
        nomeAutor: this.formulario.value.nomeAutor,
        modelo: parseInt(this.formulario.value.modelo)
      };

      this.service.editar(pensamento).subscribe(() => {
        this.router.navigate(['/listarPensamento']);
      });
    }
  }


  cancelar() {
    this.router.navigate(['/listarPensamento']);
  }

  habilitarBotao(): string {
    return this.formulario.valid ? 'botao' : 'botao__desabilitado';
  }
}
*/



import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PensamentoService } from '../../../services/pensamento.service';
import { Pensamento } from '../pensamento';

@Component({
  selector: 'app-editar-pensamentos',
  templateUrl: './editar-pensamentos.component.html',
  styleUrls: ['./editar-pensamentos.component.scss']
})
export class EditarPensamentosComponent implements OnInit {
  formulario!: FormGroup;
  carregando: boolean = false;
  modelos = [
    { valor: '1', label: 'Modelo 1' },
    { valor: '2', label: 'Modelo 2' },
    { valor: '3', label: 'Modelo 3' }
  ];

  constructor(
    private service: PensamentoService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.inicializarFormulario();
    this.carregarPensamento();
  }

  inicializarFormulario() {
    this.formulario = this.formBuilder.group({
      id: [0],
      pensamentoDoAutor: ['', Validators.compose([
        Validators.required,
        Validators.pattern(/(.|\s)*\S(.|\s)*/)
      ])],
      nomeAutor: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3)
      ])],
      modelo: ['1']
    });
  }

  carregarPensamento() {
    const id = this.route.snapshot.paramMap.get('id');
    this.service.buscarPorId(parseInt(id!)).subscribe(pensamento => {
      this.formulario.patchValue({
        id: pensamento.id,
        pensamentoDoAutor: pensamento.pensamentoDoAutor,
        nomeAutor: pensamento.nomeAutor,
        modelo: pensamento.modelo.toString()
      });
    });
  }

  // Implementação do método salvarEdicao()
  salvarEdicao() {
    console.log('Salvando edição...');

    if (this.formulario.valid && !this.carregando) {
      this.carregando = true;

      const pensamento: Pensamento = {
        id: this.formulario.value.id,
        pensamentoDoAutor: this.formulario.value.pensamentoDoAutor,
        nomeAutor: this.formulario.value.nomeAutor,
        modelo: parseInt(this.formulario.value.modelo)
      };

      console.log('Dados para salvar:', pensamento);

      this.service.editar(pensamento).subscribe({
        next: (response) => {
          console.log('Edição salva com sucesso:', response);
          alert('Pensamento atualizado com sucesso!');
          this.router.navigate(['/listarPensamento']);
        },
        error: (error) => {
          console.error('Erro ao salvar:', error);
          alert('Erro ao salvar alterações. Verifique o console.');
        },
        complete: () => {
          this.carregando = false;
        }
      });
    }
  }

  cancelar() {
    this.router.navigate(['/listarPensamento']);
  }
}
