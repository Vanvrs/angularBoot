import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
//import { PensamentoService } from '../../../services/pensamento.service';
import { PensamentoService } from 'src/app/shared/services/pensamento.service';
import { Pensamento } from 'src/app/shared/interfaces/pensamento';
//import { Pensamento } from '../pensamento';

@Component({
  selector: 'app-editar-pensamentos',
  templateUrl: './editar-pensamentos.component.html',
  styleUrls: ['./editar-pensamentos.component.scss']
})
//Grupo de controles do formulário
export class EditarPensamentosComponent implements OnInit {
  formulario!: FormGroup;
  carregando: boolean = false;
  //Array com opções de modelos disponíveis
  modelos = [
    { valor: '1', label: 'Modelo 1' },
    { valor: '2', label: 'Modelo 2' },
    { valor: '3', label: 'Modelo 3' }
  ];

  //Injeta serviços essenciais: service, router, route e formuilder
  constructor(
    private service: PensamentoService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) { }

  //Inicializa o formulário e carrega o pensamento a ser editado
  ngOnInit(): void {
    this.inicializarFormulario();
    this.carregarPensamento();
  }

  //Formulario reativo: iniciando em 0, validaçoes de obrigatoriedade, contúedo e tamanho minimo
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
      modelo: ['1'] //valor padrão
    });
  }

  //obtém id da rota, busca o pensamento por id e preenche o form com os dados retornados
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

  //Implementação do método salvarEdicao()
  //verifica se o formulário é válido
  salvarEdicao() {
    console.log('Salvando edição...');

    if (this.formulario.valid && !this.carregando) {
      this.carregando = true;

      const pensamento: Pensamento = {
        id: this.formulario.value.id,
        pensamentoDoAutor: this.formulario.value.pensamentoDoAutor,
        nomeAutor: this.formulario.value.nomeAutor,
        modelo: parseInt(this.formulario.value.modelo)//converte os dados
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
