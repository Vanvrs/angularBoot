import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {
  inscricaoForm!: FormGroup;
  estados = [
    { sigla: 'AC', nome: 'Acre' },
    { sigla: 'AL', nome: 'Alagoas' },
    { sigla: 'AP', nome: 'Amapá' },
    { sigla: 'AM', nome: 'Amazonas' },
    { sigla: 'BA', nome: 'Bahia' },
    { sigla: 'CE', nome: 'Ceará' },
    { sigla: 'DF', nome: 'Distrito Federal' },
    { sigla: 'ES', nome: 'Espírito Santo' },
    { sigla: 'GO', nome: 'Goiás' },
    { sigla: 'MA', nome: 'Maranhão' },
    { sigla: 'MT', nome: 'Mato Grosso' },
    { sigla: 'MS', nome: 'Mato Grosso do Sul' },
    { sigla: 'MG', nome: 'Minas Gerais' },
    { sigla: 'PA', nome: 'Pará' },
    { sigla: 'PB', nome: 'Paraíba' },
    { sigla: 'PR', nome: 'Paraná' },
    { sigla: 'PE', nome: 'Pernambuco' },
    { sigla: 'PI', nome: 'Piauí' },
    { sigla: 'RJ', nome: 'Rio de Janeiro' },
    { sigla: 'RN', nome: 'Rio Grande do Norte' },
    { sigla: 'RS', nome: 'Rio Grande do Sul' },
    { sigla: 'RO', nome: 'Rondônia' },
    { sigla: 'RR', nome: 'Roraima' },
    { sigla: 'SC', nome: 'Santa Catarina' },
    { sigla: 'SP', nome: 'São Paulo' },
    { sigla: 'SE', nome: 'Sergipe' },
    { sigla: 'TO', nome: 'Tocantins' }
  ];

  cidadesPorEstado: { [key: string]: string[] } = {
    'AC': ['Rio Branco', 'Cruzeiro do Sul', 'Sena Madureira'],
    'AL': ['Maceió', 'Arapiraca', 'Palmeira dos Índios'],
    'AP': ['Macapá', 'Santana', 'Laranjal do Jari'],
    'AM': ['Manaus', 'Parintins', 'Itacoatiara'],
    'BA': ['Salvador', 'Feira de Santana', 'Vitória da Conquista'],
    'CE': ['Fortaleza', 'Juazeiro do Norte', 'Sobral'],
    'DF': ['Brasília'],
    'ES': ['Vitória', 'Vila Velha', 'Cariacica'],
    'GO': ['Goiânia', 'Anápolis', 'Rio Verde'],
    'MA': ['São Luís', 'Imperatriz', 'Timon'],
    'MT': ['Cuiabá', 'Várzea Grande', 'Rondonópolis'],
    'MS': ['Campo Grande', 'Dourados', 'Três Lagoas'],
    'MG': ['Belo Horizonte', 'Uberlândia', 'Contagem'],
    'PA': ['Belém', 'Ananindeua', 'Santarém'],
    'PB': ['João Pessoa', 'Campina Grande', 'Santa Rita'],
    'PR': ['Curitiba', 'Londrina', 'Maringá'],
    'PE': ['Recife', 'Jaboatão dos Guararapes', 'Olinda'],
    'PI': ['Teresina', 'Parnaíba', 'Picos'],
    'RJ': ['Rio de Janeiro', 'São Gonçalo', 'Duque de Caxias'],
    'RN': ['Natal', 'Mossoró', 'Parnamirim'],
    'RS': ['Porto Alegre', 'Caxias do Sul', 'Pelotas'],
    'RO': ['Porto Velho', 'Ji-Paraná', 'Ariquemes'],
    'RR': ['Boa Vista', 'Rorainópolis', 'Caracaraí'],
    'SC': ['Florianópolis', 'Joinville', 'Blumenau'],
    'SP': ['São Paulo', 'Guarulhos', 'Campinas'],
    'SE': ['Aracaju', 'Nossa Senhora do Socorro', 'Lagarto'],
    'TO': ['Palmas', 'Araguaína', 'Gurupi']
  };

  cidades: string[] = [];

  constructor(private fb: FormBuilder) {}
  
  //O ngOnInit é um hook que é chamado logo após a criação
  //do componente, ou seja, quando ele já foi inicializado e as dependências foram injetadas.
  //ngOnInit pode ser usado para inicializar o formulário, setar valores iniciais, ou até
  //mesmo configurar valores padrão para o formulário.
  //O ngOnInit é o lugar ideal para inicializar o formulário (no caso, um FormGroup),
  //já que ele só será chamado após o componente ser inicializado.
  //Existe outro como:
  //ngOnDestroy é chamado quando o componente é destruído.
  //ngOnChanges é chamado quando qualquer propriedade de entrada do componente sofre alteração.

  ngOnInit(): void {
    this.inscricaoForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', [
        Validators.required,
        Validators.pattern(/^\(\d{2}\) \d{4,5}-\d{4}$/)
      ]],
      estado: ['', Validators.required],
      cidade: [{value: '', disabled: true}, Validators.required],
      instituicao: ['']
    });

    this.inscricaoForm.get('estado')?.valueChanges.subscribe(estado => {
      const cidadeControl = this.inscricaoForm.get('cidade');
      if (estado) {
        this.cidades = this.cidadesPorEstado[estado] || [];
        cidadeControl?.enable();
        cidadeControl?.setValue('');
      } else {
        this.cidades = [];
        cidadeControl?.disable();
        cidadeControl?.setValue('');
      }
    });
  }

  onSubmit(): void {
    // Força a validação de todos os campos
    this.inscricaoForm.markAllAsTouched();

    if (this.inscricaoForm.valid) {
      console.log('Formulário válido:', this.inscricaoForm.value);
      alert('Inscrição enviada com sucesso!');
      this.inscricaoForm.reset();
      this.inscricaoForm.get('cidade')?.disable();
    } else {
      console.log('Erros no formulário:');
      Object.keys(this.inscricaoForm.controls).forEach(key => {
        const control = this.inscricaoForm.get(key);
        if (control?.errors) {
          console.log(`Campo ${key}:`, control.errors);
        }
      });
      alert('Por favor, verifique os campos destacados.');
    }
  }
}
