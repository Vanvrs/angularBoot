import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-usuario-status',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './usuario-status.component.html',
  styleUrls: ['./usuario-status.component.css']
})
export class UsuarioStatusComponent implements OnInit {
  usuarioForm!: FormGroup;
  usuarioAtivo: boolean | null = null;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.usuarioForm = this.fb.group({
      nome: ['', Validators.required],
      telefone: ['', Validators.required],
    });
  }

    //Continuar aqui
  verificarUsuario() {
    const nome = this.usuarioForm.get('nome')?.value;
    const telefone = this.usuarioForm.get('telefone')?.value;

    if(nome && telefone) {
      const dadosSalvos = localStorage.getItem('usuario');
      if (dadosSalvos) {
        const usuario = JSON.parse(dadosSalvos);
        if (usuario.nome === nome && usuario.telefone === telefone) {
          this.usuarioAtivo = true;
        } else {
          this.usuarioAtivo = false;
        }
      } else {
        this.usuarioAtivo = false;
      }
    } else {
      alert('Preencha todos os campos');
    }

}


  salvarUsuario(): void {
    if(this.usuarioForm.valid){
      const dados = this.usuarioForm.value;
      localStorage.setItem('usuario', JSON.stringify(dados));
      alert('Usuário salvo com sucesso');
    } else{
      alert('Preencha todos os campos corretamente.')
    }
  }
}
