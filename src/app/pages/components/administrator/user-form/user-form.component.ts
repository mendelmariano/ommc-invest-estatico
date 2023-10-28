import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/pages/shareds/models/user.interface';
import { DynamicDialogRef,  DynamicDialogConfig} from 'primeng/dynamicdialog';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../users.service';
import { MessageService } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

    user: User | undefined;
    userForm: FormGroup;
    profile: any[] = [
        {
            id: 1,
            name: "Registred"
        },
        {
            id: 2,
            name: "Administator"
        },

    ]
    constructor(
        public ref: DynamicDialogRef,
        public config: DynamicDialogConfig,
        public layoutService: LayoutService,
        private fb: FormBuilder,
        private userService: UsersService,
        private messageService: MessageService,
        ) {
            this.userForm = this.fb.group({
                name: ['', Validators.required],
                email: ['', [Validators.required, Validators.email]],
                password: [''],
                profile_id: ['', [Validators.required]]

              });
        }

    ngOnInit() {
       this.user = this.config.data?.user;
       this.userForm.patchValue(this.user);
    }

      onSubmit() {
        const user: User = this.userForm.value;
        user.id = this.user.id;
        this.userService.update(user).subscribe(
            {
                next: (response: User ) => {
                    // Lida com a resposta da API após o cadastro bem-sucedido
                    if(response){
                        this.ref.close(response);
                    }

                    // Você pode redirecionar o usuário para outra página ou realizar outras ações aqui
                },
                error: (error: HttpErrorResponse) => {
                    // Lida com erros, como validação de campos ou falhas na API
                    console.error('Erro ao atualizar usuário:', error);
                    this.messageService.add({ key: 'tst', severity: 'error', summary: 'Falhou!', detail: `Erro! ${error.error.error}` });
                    // Exiba mensagens de erro ou realize ações apropriadas
                }
                }
        )
      }

}
