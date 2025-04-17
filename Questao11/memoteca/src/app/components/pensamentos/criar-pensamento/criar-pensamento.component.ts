
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PensamentoService } from '../../../services/pensamento.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-criar-pensamento',
  templateUrl: './criar-pensamento.component.html',
  styleUrls: ['./criar-pensamento.component.scss']
})
export class CriarPensamentoComponent implements OnInit {
  formulario!: FormGroup;

  constructor(
    private service: PensamentoService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      pensamentoDoAutor: ['', Validators.compose([
        Validators.required,
        Validators.pattern(/(.|\s)*\S(.|\s)*/)
      ])],
      nomeAutor: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3)
      ])],
      modelo: ['modelo1']
    });
  }

  criarPensamento() {
    if (this.formulario.valid) {
      const modeloNumero = this.formulario.value.modelo === 'modelo1' ? 1 :
                         this.formulario.value.modelo === 'modelo2' ? 2 : 3;

      const pensamento = {
        pensamentoDoAutor: this.formulario.value.pensamentoDoAutor,
        nomeAutor: this.formulario.value.nomeAutor,
        modelo: modeloNumero
      };

      this.service.criar(pensamento).subscribe(() => {
        this.router.navigate(['/listarPensamento']);
      });
    }
  }

  cancelarPensamento() {
    this.router.navigate(['/listarPensamento']);
  }

  habilitarBotao(): string {
    return this.formulario.valid ? 'botao' : 'botao__desabilitado';
  }
}



