import { Component } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from '../../auth-service.service';
import {  MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from 'src/app/pages/shareds/models/user.model';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [MessageService]
})
export class RegisterComponent {

    valCheck: string[] = ['remember'];

    userForm: FormGroup;
    user: User = new User();

    constructor(
        public layoutService: LayoutService,
        private fb: FormBuilder,
        private authService: AuthServiceService,
        private messageService: MessageService,
        private router: Router,
        ) {
      this.userForm = this.fb.group({
        name: ['', Validators.required],
        whatsapp: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password1: ['', [Validators.required, Validators.minLength(6)]],
        password2: ['', Validators.required],
      }, {
        validators: this.passwordMatchValidator, // Use a função de validação personalizada aqui
      });
    }

    passwordMatchValidator(formGroup: FormGroup) {
      const password1 = formGroup.get('password1').value;
      const password2 = formGroup.get('password2').value;

      if (password1 !== password2) {
        formGroup.get('password2').setErrors({ passwordMismatch: true });
      } else {
        formGroup.get('password2').setErrors(null);
      }
    }

    onSubmit() {
        if (this.userForm.valid) { // O formulário é válido, você pode continuar com o envio dos dados.
          const { name, email, whatsapp, password1: password, password2, ...user } = this.userForm.value;
          const profile_id = 1;
          this.user = { name, email, password, whatsapp, profile_id };

          this.authService.cadastrarUsuario(this.user).subscribe({
            next: (response: User) => {
              // Lida com a resposta da API após o cadastro bem-sucedido
              if(response){
                this.messageService.add({ key: 'tst', severity: 'success', summary: 'Sucesso!', detail: 'Usuário cadastrado' });

              }

              // Você pode redirecionar o usuário para outra página ou realizar outras ações aqui
            },
            error: (error: HttpErrorResponse) => {
              // Lida com erros, como validação de campos ou falhas na API
              console.error('Erro ao cadastrar usuário:', error);
              this.messageService.add({ key: 'tst', severity: 'error', summary: 'Falhou!', detail: `Erro! ${error.error.error}` });
              // Exiba mensagens de erro ou realize ações apropriadas
            },

            complete: () => setTimeout(() => this.router.navigate(['/']), 2000)
          });
        }
      }
}
