import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AuthServiceService } from '../../auth/auth-service.service';
import { Championship } from 'src/app/pages/shareds/models/championship.interface';
import { Team } from 'src/app/pages/shareds/models/team.interface';
import { ResultService } from '../result.service';
import { ChampionshipService } from '../../administrator/championships/championship.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { User } from 'src/app/pages/shareds/models/user.model';
import { IResultRequest } from 'src/app/pages/shareds/models/result.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-result-create',
  templateUrl: './result-create.component.html',
  styleUrls: ['./result-create.component.scss']
})
export class ResultCreateComponent implements OnInit {


    matchForm: FormGroup;
    championships: Championship[] = [];
    home_teams: Team[] =[];
    away_teams: Team[] =[];

    myUser: Subscription;
    loggedInUser: User;

    championship_id: number;

    constructor(
        public messageService: MessageService,
        private authService: AuthServiceService,
        private fb: FormBuilder,
        private resultService: ResultService,
        private championshipService: ChampionshipService,
        private route: ActivatedRoute,
    ) {
        this.matchForm = this.fb.group({
            home_team: ['', Validators.required],
            away_team: ['', Validators.required],
            home_goals: ['', Validators.required],
            away_goals: ['', Validators.required],
            championship: ['', Validators.required],
        });

        this.route.params.subscribe(params => {
            this.championship_id = params['championship_id'];
            // Agora você pode usar championship_id em seu componente
            this.loadChampionship(); // Carregue a lista de campeonatos após obter o ID da URL
        });
    }

    ngOnInit(): void {
        this.loadLoggedInUser();
        this.loadChampionship();


    }

    loadLoggedInUser() {
        this.myUser = this.authService.getUser().subscribe(
            (user: User) => {
                this.loggedInUser = user;
            }
        );
    }

    loadChampionship(){
        this.championshipService.listAll().subscribe(
            {
                next: (championships: Championship[]) => {
                    this.championships = championships; // Defina a lista de campeonatos aqui
                    if (this.championship_id) {
                        const selectedChampionship = this.championships.find(champ => champ.id.toString() === this.championship_id.toString());
                        this.loadTeamsMatch({value: selectedChampionship});
                        if (selectedChampionship) {
                            this.matchForm.get('championship').setValue(selectedChampionship);
                        }
                    }
                },
                error: (error: HttpErrorResponse) => {
                    // Lida com erros, como validação de campos ou falhas na API
                    console.error(error);
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Erro ao carregar campeonatos!',
                        detail: `Erro! ${error.error.error}`,
                        life: 3000
                    })
                }
            }
        )
    }

    loadTeamsMatch($event) {
        const champSelected: Championship = $event.value as Championship;

        if (champSelected) {
            this.loadHomeTeams(this.loggedInUser.id, champSelected.id);
            this.loadAwayTeams(this.loggedInUser.id, champSelected.id);
        }

    }


    loadHomeTeams(user_id: number, championship_id: number) {
        this.resultService.teamsHomeForResult(user_id, championship_id).subscribe(
            {
                next: (teams: Team[]) => {
                    this.home_teams = teams;
                },
                error: (error: HttpErrorResponse) => {
                    // Lida com erros, como validação de campos ou falhas na API
                    console.error( error);
                    this.messageService.add({ severity: 'error',
                                              summary: 'Erro ao carregar times de casa!',
                                              detail: `Erro! ${error.error.error}`,
                                              life: 3000 })
                }
            }
        )
    }

    loadAwayTeams(user_id: number, championship_id: number) {
        this.resultService.teamsAwayForResult(user_id, championship_id).subscribe(
            {
                next: (teams: Team[]) => {
                    this.away_teams = teams;
                },
                error: (error: HttpErrorResponse) => {
                    // Lida com erros, como validação de campos ou falhas na API
                    console.error( error);
                    this.messageService.add({ severity: 'error',
                                              summary: 'Erro ao carregar times de fora!',
                                              detail: `Erro! ${error.error.error}`,
                                              life: 3000 })
                }
            }
        )
    }

    onSubmit() {
        const result: IResultRequest = {
            away_goals: this.matchForm.get('away_goals').value,
            home_goals: this.matchForm.get('home_goals').value,
            away_team: this.matchForm.get('away_team').value.id,
            home_team: this.matchForm.get('home_team').value.id,
            championship_id: this.matchForm.get('championship').value.id,
            status: 0,

        }

        this.resultService.postResult(result).subscribe(
            {
                next: (result: IResultRequest) => {
                    this.messageService.add({ severity: 'success',
                                              summary: 'Successful',
                                              detail: `Resultado cadastrado, para ser computado seu adversário deverá confirmá-lo!`,
                                              life: 3000 });

                    this.home_teams=[];
                    this.away_teams =[];
                    this.matchForm.reset();
                },
                error: (error: HttpErrorResponse) => {
                    // Lida com erros, como validação de campos ou falhas na API
                    console.error( error);
                    this.messageService.add({ severity: 'error',
                                              summary: 'Erro ao postar resultado!',
                                              detail: `Erro! ${error.error.error}`,
                                              life: 3000 })
                }
            }
        )
    }

}
