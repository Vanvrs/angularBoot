import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent {
  formulario: FormGroup;

  constructor(private fb: FormBuilder) {
    this.formulario = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', [Validators.required, Validators.pattern(/^\(\d{2}\) \d{5}-\d{4}$/)]],
      senha: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(/^(?=.*[A-Z])(?=.*[!@#$&*]).*$/)
      ]],
      confirmarSenha: ['', Validators.required]
    }, { validators: this.validarSenhas });
  }

  //Funnção para validar senha
  validarSenhas(form: FormGroup): { [key: string]: any } | null {
    const senha = form.get('senha');
    const confirmarSenha = form.get('confirmarSenha');

    if (senha && confirmarSenha && senha.value !== confirmarSenha.value) {
      confirmarSenha.setErrors({ senhasNaoCoincidem: true });
      return { senhasNaoCoincidem: true };
    } else {
      if (confirmarSenha?.errors?.['senhasNaoCoincidem']) {
        delete confirmarSenha.errors['senhasNaoCoincidem'];
        if (Object.keys(confirmarSenha.errors).length === 0) {
          confirmarSenha.setErrors(null);
        }
      }
      return null;
    }
  }

  /* Se o formulário estiver corretamente preenchido 'formulario válido' e envia. */
  onSubmit(): void {
    if (this.formulario.valid) {
      console.log('Formulário válido:', this.formulario.value);
      // Aqui você pode adicionar a lógica para enviar os dados
    } else {
      console.log('Formulário inválido');
      this.formulario.markAllAsTouched();
    }
  }

  get nome() { return this.formulario.get('nome'); }
  get email() { return this.formulario.get('email'); }
  get telefone() { return this.formulario.get('telefone'); }
  get senha() { return this.formulario.get('senha'); }
  get confirmarSenha() { return this.formulario.get('confirmarSenha'); }
}
