import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AuthServiceService } from '../../auth/auth-service.service';
import { ResultService } from '../result.service';
import { Subscription } from 'rxjs';
import { User } from 'src/app/pages/shareds/models/user.model';
import { IResultResponse } from 'src/app/pages/shareds/models/result.interface';
import { Table } from 'primeng/table';
import { HttpErrorResponse } from '@angular/common/http';
import { Team } from 'src/app/pages/shareds/models/team.interface';
import { TeamsService } from '../../teams/teams.service';

@Component({
  selector: 'app-result-list',
  templateUrl: './result-list.component.html',
  styleUrls: ['./result-list.component.scss']
})
export class ResultListComponent implements OnInit {


    myUser: Subscription;
    loggedInUser: User;
    teamSelected: Team;
    myResults: IResultResponse[] = [];
    checkConfirm: boolean = false;
    declineConfirme: boolean = false;
    teamDetailDialog: boolean = false;
    result: IResultResponse = null;
    submitted: boolean = false;
    viewDialog: boolean = false;

    constructor(
        public messageService: MessageService,
        private authService: AuthServiceService,
        private resultService: ResultService,
        private teamService: TeamsService,
    ) {}

    ngOnInit(): void {
        this.loadLoggedInUser();
        this.loadResults();
    }

    loadLoggedInUser() {
        this.myUser = this.authService.getUser().subscribe(
            (user: User) => {
                this.loggedInUser = user;
            }
        );
    }

    loadResults() {
        this.resultService.loadResultUser(this.loggedInUser.id).subscribe(
            {
                next:  (resultados: IResultResponse[]) => {
                    this.myResults.push(...resultados);
                },
                error: (error: HttpErrorResponse) => {
                    // Lida com erros, como validação de campos ou falhas na API
                    console.error( error);
                    this.messageService.add({ severity: 'error',
                                              summary: 'Erro ao carregar resultados!',
                                              detail: `Erro! ${error.error.error}`,
                                              life: 3000 })
                }
            }

        )
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    confirmCheckDialog(result: IResultResponse) {
        this.checkConfirm = true;
        this.result = result;
    }

    confirmDeclineDialog(result: IResultResponse) {
        this.declineConfirme = true;
        this.result = result;
    }

    detailDialog(result: IResultResponse) {
        this.viewDialog = true;
        this.result = result;
    }

    loadTeamDetail(team_id: number) {
        this.teamService.searchById(team_id).subscribe(
            {
                next: (team: Team) => {
                    this.teamSelected = team;
                    this.teamDetailDialog = true;

                },
                error: (error: HttpErrorResponse) => {
                    // Lida com erros, como validação de campos ou falhas na API
                    console.error( error);
                    this.messageService.add({ severity: 'error',
                                            summary: 'Erro ao carregar o time selecionado!',
                                            detail: `Erro! ${error.error.error}`,
                                            life: 3000 })
                }

            }
        )
    }

    confirmeDecline() {
        this.resultService.declineResult(this.result).subscribe(
            {
                next:  (resultado: IResultResponse) => {

                    const index = this.myResults.findIndex(t => t.id === resultado.id);
                    if (index !== -1) {
                        this.myResults[index] = resultado;
                    }

                    this.messageService.add({ severity: 'success',
                                              summary: 'Successful',
                                              detail: `Resultado recusado, placar invalidado momentaneamente!`,
                                              life: 3000 });
                    this.declineConfirme = false;
            },
                error: (error: HttpErrorResponse) => {
                    // Lida com erros, como validação de campos ou falhas na API
                    console.error( error);
                    this.messageService.add({ severity: 'error',
                                            summary: 'Erro ao confirmar resultado!',
                                            detail: `Erro! ${error.error.error}`,
                                            life: 3000 })
                }
            }
        )
    }

    confirmCheck() {

        this.resultService.checkResult(this.result.id).subscribe(
            {
                next:  (resultado: IResultResponse) => {

                    const index = this.myResults.findIndex(t => t.id === resultado.id);
                    if (index !== -1) {
                        this.myResults[index] = resultado;
                    }

                    this.messageService.add({ severity: 'success',
                                              summary: 'Successful',
                                              detail: `Resultado confirmado, classificação atualizada com sucesso!`,
                                              life: 3000 });
                    this.checkConfirm = false;
            },
                error: (error: HttpErrorResponse) => {
                    // Lida com erros, como validação de campos ou falhas na API
                    console.error( error);
                    this.messageService.add({ severity: 'error',
                                            summary: 'Erro ao confirmar resultado!',
                                            detail: `Erro! ${error.error.error}`,
                                            life: 3000 })
                }
            }
        )
    }



}
