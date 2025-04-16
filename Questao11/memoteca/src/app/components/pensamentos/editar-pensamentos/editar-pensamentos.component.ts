import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { PensamentoService } from '../../../services/pensamento.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editar-pensamentos',
  templateUrl: './editar-pensamentos.component.html',
  styleUrls: ['./editar-pensamentos.component.scss']
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
    const id = this.route.snapshot.paramMap.get('id')
    this.service.buscarPorId(parseInt(id!)).subscribe((pensamento) => {
      this.formulario = this.formBuilder.group({
        id: [pensamento.id],
        conteudo: [pensamento.pensamentoDoAutor, Validators.compose([
          Validators.required,
          Validators.pattern(/(.|\s)*\S(.|\s)*/)
        ])],
        autoria: [pensamento.nomeAutor, Validators.compose([
          Validators.required,
          Validators.minLength(3)
        ])],
        modelo: [pensamento.modelo],
        pensamentoDoAutor: [pensamento.pensamentoDoAutor]
      })
    })
  }

  editarPensamento() {
    this.service.editar(this.formulario.value).subscribe(() => {
      this.router.navigate(['/listarPensamento'])
    })
  }

  cancelar() {
    this.router.navigate(['/listarPensamento'])
  }

  habilitarBotao(): string {
    if(this.formulario.valid) {
      return 'botao'
    }else {
      return 'botao__desabilitado'
    }
  }

}
