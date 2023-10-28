import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UsersService } from '../users.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { User, UserList } from 'src/app/pages/shareds/models/user.interface';
import { Table } from 'primeng/table';

import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { UserFormComponent } from '../user-form/user-form.component';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

    usersList: UserList = new UserList() ;
    currentPage = 1; // Página atual
    pageSize = 10; // Tamanho da página
    filter: boolean = false;
    deleteUserDialog: boolean = false;
    userSelected: User;


    @ViewChild('filterElement') filterInput: ElementRef;


    ref: DynamicDialogRef | undefined;

    constructor(
        private usersService: UsersService,
        private messageService: MessageService,
        public dialogService: DialogService,
        ) {

    }


    ngOnInit(): void {
        this.loadUsers();
    }

    loadUsers() {
        this.usersService.usuariosList(this.currentPage).subscribe(
            {
                next: (response: UserList ) => {
                    // Lida com a resposta da API após o cadastro bem-sucedido
                    if(response){
                      this.usersList = response;
                    }

                    // Você pode redirecionar o usuário para outra página ou realizar outras ações aqui
                  },
                  error: (error: HttpErrorResponse) => {
                    // Lida com erros, como validação de campos ou falhas na API
                    console.error('Erro ao buscar usuários:', error);
                    this.messageService.add({ key: 'tst', severity: 'error', summary: 'Falhou!', detail: `Erro! ${error.error.error}` });
                    // Exiba mensagens de erro ou realize ações apropriadas
                  }
                });
    }


    // Função para navegar para a próxima página
    nextPage() {
        if (this.currentPage < this.usersList.totalPages) {
            this.currentPage++;
            this.loadUsers();
        }
    }

    // Função para navegar para a página anterior
    previousPage() {
        if (this.currentPage > 1) {
            this.currentPage--;
            this.loadUsers();
        }
    }

    onPageChange($event) {
        this.currentPage = $event.page + 1; // +1 porque o componente de paginação começa a contar a partir de 0
        if(!this.filter)
            this.loadUsers();
        else{
            this.searchList(+$event.page+1, this.filterInput.nativeElement.value);
        }
    }

    onGlobalFilter(event: Event) {
        this.filter = true;
        this.searchList(1, (event.target as HTMLInputElement).value);
    }

    searchList(page: number, search: string) {
        this.usersService.usuariosListSearch(page, search )
            .pipe(delay(1000))
            .subscribe(
                {
                    next: (response: UserList ) => {
                        // Lida com a resposta da API após o cadastro bem-sucedido
                        if(response){
                            this.usersList = response;
                        }

                        // Você pode redirecionar o usuário para outra página ou realizar outras ações aqui
                    },
                    error: (error: HttpErrorResponse) => {
                        // Lida com erros, como validação de campos ou falhas na API
                        console.error('Erro ao buscar usuários:', error);
                        this.messageService.add({ key: 'tst', severity: 'error', summary: 'Falhou!', detail: `Erro! ${error.error.error}` });
                        // Exiba mensagens de erro ou realize ações apropriadas
                    }
                    });
    }

    editUser(user: User) {
        this.ref = this.dialogService.open(UserFormComponent, {
            data: {
                user
            },
            header: 'Edição de usuário'
        });

        this.ref.onClose.subscribe((editedUser: User) => {
            if (editedUser) {
                // Atualize o usuário na lista existente
                const index = this.usersList.users.findIndex(u => u.id === editedUser.id);
                if (index !== -1) {
                    this.usersList.users[index] = editedUser;
                }
                this.messageService.add({ key: 'tst', severity: 'success', summary: 'Sucesso!', detail: 'Usuário salvo' });
            }
        });
    }

    deleteUser(user: User) {
        this.deleteUserDialog = true;
        this.userSelected = user;
    }

    confirmDelete(){

        this.usersService.delete(this.userSelected.id).subscribe(
            () => {
                const index = this.usersList.users.findIndex(m => m.id === this.userSelected.id);
                if (index !== -1) {
                    this.usersList.users.splice(index, 1);
                }
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Mode deleted',
                    life: 3000
                });

                this.deleteUserDialog = false;
            },
            error => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Error deleting mode',
                    life: 3000
                });
            }
        );
    }

}
