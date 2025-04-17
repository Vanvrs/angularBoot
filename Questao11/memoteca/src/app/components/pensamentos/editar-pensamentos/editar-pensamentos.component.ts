import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { PensamentoService } from '../../../services/pensamento.service';
import { Component, OnInit } from '@angular/core';
import { Pensamento } from '../pensamento';

@Component({
  selector: 'app-editar-pensamentos',
  templateUrl: './editar-pensamentos.component.html',
  //styleUrls: ['./editar-pensamentos.component.scss']
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
        pensamentoDoAutor: [pensamento.PensamentoDoAutor, Validators.compose([
          Validators.required,
          Validators.pattern(/(.|\s)*\S(.|\s)*/)
        ])],
        nomeAutor: [pensamento.NomeAutor, Validators.compose([
          Validators.required,
          Validators.minLength(3)
        ])],
        modelo: [pensamento.Modelo.toString()]
      });
    });
  }

  editarPensamento() {
    if (this.formulario.valid) {
      const pensamento: Pensamento = {
        id: this.formulario.value.id,
        PensamentoDoAutor: this.formulario.value.pensamentoDoAutor,
        NomeAutor: this.formulario.value.nomeAutor,
        Modelo: parseInt(this.formulario.value.modelo)
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


