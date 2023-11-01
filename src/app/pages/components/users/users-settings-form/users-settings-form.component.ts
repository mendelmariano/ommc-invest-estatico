import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { User } from 'src/app/pages/shareds/models/user.model';
import { AuthServiceService } from '../../auth/auth-service.service';
import { Subscription, switchMap } from 'rxjs';
import { UserUpdate } from 'src/app/pages/shareds/models/user.interface';
import { UsersService } from '../users.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-users-settings-form',
  templateUrl: './users-settings-form.component.html',
  styleUrls: ['./users-settings-form.component.scss']
})
export class UsersSettingsFormComponent implements OnInit {

    userForm: FormGroup;
    user: User = new User();

    myUser: Subscription;
    loggedInUser: User;


    constructor(

        private fb: FormBuilder,
        private messageService: MessageService,
        private router: Router,
        private authService: AuthServiceService,
        private userService: UsersService,
        ) {
      this.userForm = this.fb.group({
        name: ['', Validators.required],
        whatsapp: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        oldPassword: [''],
        password: ['', [ Validators.minLength(6)]],
        confirmPassword: ['', ],
      }, {
        validators: this.passwordMatchValidator, // Use a função de validação personalizada aqui
      });
    }

    ngOnInit(): void {
        this.loadLoggedInUser();

    }


    loadLoggedInUser() {
        this.myUser = this.authService.getUser().pipe(
          switchMap((user: User) => this.userService.findUser(user.id))
        ).subscribe(
          (userDetail: User) => {
            this.loggedInUser = userDetail;
            this.userForm.patchValue({
                name: userDetail.name,
                email: userDetail.email,
                whatsapp: userDetail.whatsapp,
              });
          }
        );
      }

    passwordMatchValidator(formGroup: FormGroup) {
        const password = formGroup.get('password').value;
        const confirmPassword = formGroup.get('confirmPassword').value;

        if (password !== confirmPassword) {
          formGroup.get('confirmPassword').setErrors({ passwordMismatch: true });
        } else {
          formGroup.get('confirmPassword').setErrors(null);
        }
      }


      onSubmit() {
        if (this.userForm.valid) { // O formulário é válido, você pode continuar com o envio dos dados.
          const { name, email, whatsapp, password, confirmPassword, oldPassword, ...user } = this.userForm.value;


          const userUpdate: UserUpdate = { name, email, password, whatsapp, confirmPassword, oldPassword };

         /*  if(!userUpdate.oldPassword) {
            delete userUpdate.password;
            delete userUpdate.oldPassword;
            delete userUpdate.confirmPassword;
          } */

          this.userService.update(userUpdate).subscribe({
            next: (response: User) => {
              // Lida com a resposta da API após o cadastro bem-sucedido
              if(response){
                this.messageService.add({ key: 'tst', severity: 'success', summary: 'Sucesso!', detail: 'Usuário alterado' });

              }

              // Você pode redirecionar o usuário para outra página ou realizar outras ações aqui
            },
            error: (error: HttpErrorResponse) => {
              // Lida com erros, como validação de campos ou falhas na API
              console.error('Erro ao cadastrar usuário:', error);
              this.messageService.add({ key: 'tst', severity: 'error', summary: 'Falhou!', detail: `Erro! ${error.error.error}` });
              // Exiba mensagens de erro ou realize ações apropriadas
            },

            complete: () => setTimeout(() => this.userForm.reset())
          });
        }
      }

}
