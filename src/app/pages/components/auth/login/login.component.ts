import { Component } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

import {  MessageService } from 'primeng/api';
import { Router } from '@angular/router';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from '../auth-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { UserResponseLogin } from 'src/app/pages/shareds/interfaces/userLogin.interface';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `],

  providers: [MessageService]
})
export class LoginComponent {

    valCheck: string[] = ['remember'];

    password!: string;
    formulario: FormGroup;

    constructor(
        public layoutService: LayoutService,
        private fb: FormBuilder,
        private authService: AuthServiceService,
        private messageService: MessageService,
        private router: Router
        ) {
            this.formulario = this.fb.group({
                email: ['', [Validators.required, Validators.email]],
                password: ['', [Validators.required, Validators.minLength(6)]]
              });
         }

         login() {
            if (this.formulario.valid) {
              // Lógica para lidar com o envio do formulário
              this.authService.login(this.formulario.value).subscribe(
                {
                    next: (response: UserResponseLogin) => {
                      // Lida com a resposta da API após o cadastro bem-sucedido
                      if(response){
                        this.messageService.add({ key: 'tst', severity: 'success', summary: 'Sucesso!', detail: 'Login executado com sucesso!' });
                        if (response.token) {
                            this.router.navigate(['/']); // Redirecione para o dashboard após o login
                          }

                      }

                      // Você pode redirecionar o usuário para outra página ou realizar outras ações aqui
                    },
                    error: (error: HttpErrorResponse) => {
                      // Lida com erros, como validação de campos ou falhas na API
                      this.messageService.add({ key: 'tst', severity: 'error', summary: 'Falhou!', detail: `Erro! ${error.error.error}` });
                      // Exiba mensagens de erro ou realize ações apropriadas
                    }
                  }
              )
            }
          }

}
