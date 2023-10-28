import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ModeService } from 'src/app/pages/service/mode.service';
import { Championship } from 'src/app/pages/shareds/models/championship.interface';
import { Mode } from 'src/app/pages/shareds/models/mode.interface';
import { ChampionshipService } from '../../administrator/championships/championship.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Table } from 'primeng/table';
import { AuthServiceService } from '../../auth/auth-service.service';
import { Subscription } from 'rxjs';
import { User } from 'src/app/pages/shareds/models/user.interface';
import { Classification } from 'src/app/pages/shareds/models/classification.interface';
import { TeamsService } from '../../teams/teams.service';
import { Team } from 'src/app/pages/shareds/models/team.interface';

@Component({
  selector: 'app-championship-list',
  templateUrl: './championship-list.component.html',
  styleUrls: ['./championship-list.component.scss']
})
export class ChampionshipListComponent implements OnInit {

    championship: Championship;

    championships: Championship[];

    participate: boolean = false;

    modes: Mode[];

    teams: Team[];

    teamSelected: Team;

    myUser: Subscription;

    loggedInUser: User;

    championshipDialog: boolean = false;

    participeChampionshipDialog: boolean = false;

    deleteChampionshipsDialog: boolean = false;

    selectedChampionships: Championship[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];

    championshipsInClassification: Classification[];

    rowsPerPageOptions = [5, 10, 20];

    constructor(
        private modeService: ModeService,
        private messageService: MessageService,
        private championshipService: ChampionshipService,
        private authService: AuthServiceService,
        private teamService: TeamsService,
    ) {
        this.loadLoggedInUser();
        this.initModes();
        this.initChampionships();

    }
    ngOnInit(): void {


        this.cols = [
            { field: 'name', header: 'Modo de Jogo' },

        ];
        this.loadTeams();
        this.verifyParticipate();
    }

    loadLoggedInUser() {
        this.myUser = this.authService.getUser().subscribe(
            (user: User) => {
                this.loggedInUser = user;
            }
        );
    }

    loadTeams() {
        this.teamService.loadTeamsUserChecked(this.loggedInUser.id).subscribe({
            next: (teams: Team[]) =>{
                this.teams = teams}
        });
    }

    initModes() {
        this.modeService.getAll().subscribe(
            (modes: Mode[]) => this.modes = modes
        );
    }

    initChampionships() {
        this.championshipService.listAll().subscribe(
            (championships: Championship[]) => this.championships = championships
        );
    }

    verifyParticipate() {

            this.championshipService.verifyParticipe(this.loggedInUser.id).subscribe(
                (camps: Classification[]) => {
                    this.championshipsInClassification = camps;
                }
            );

    }

    // Função para verificar se o usuário está na lista de classificação de um campeonato específico.
    userIsInClassification(championshipId: number): boolean {
        if (this.championshipsInClassification) {
            return this.championshipsInClassification.some(camp => camp.championship_id === championshipId);
        }
        return false;
    }

    saveChampionship() {

        if(!this.championship.id){
            this.championship.mode_id = this.championship.mode.id;

            this.championshipService.save(this.championship).subscribe(
                {
                    next:  (championship: Championship) => {
                        this.championships.push(championship);
                        this.messageService.add({ severity: 'success',
                                                  summary: 'Successful',
                                                  detail: 'Mode save',
                                                  life: 3000 });
                    this.championshipDialog = false;
                    this.championship = new Championship();
                    this.submitted = true;

                    },
                    error: (error: HttpErrorResponse) => {
                        // Lida com erros, como validação de campos ou falhas na API
                        console.error('Erro ao cadastrar:', error);
                        this.messageService.add({ severity: 'error',
                                                  summary: 'Falhou!',
                                                  detail: `Erro! ${error.error.error}`,
                                                  life: 3000 })
                    }
                });


        }else{
            this.championship.mode_id = this.championship.mode.id;
            this.championshipService.update(this.championship).subscribe(
                {
                    next: (championship: Championship) => {
                        this.messageService.add({ severity: 'success',
                                                  summary: 'Successful',
                                                  detail: 'Mode save',
                                                  life: 3000 });

                    this.championshipDialog = false;
                    this.championship = new Championship();
                    const index = this.championships.findIndex(t => t.id === championship.id);
                    if (index !== -1) {
                    this.championships[index] = championship;
                }
                    this.submitted = true;

                    } ,
                    error: (error: HttpErrorResponse) => {
                        // Lida com erros, como validação de campos ou falhas na API
                        console.error('Erro ao cadastrar:', error);
                        this.messageService.add({ key: 'tst', severity: 'error', summary: 'Falhou!', detail: `Erro! ${error.error.error}` })
                    }
                }

            );


        }



    }

    participeChampionship(championship: Championship) {
        this.participeChampionshipDialog = true;
        this.championship = championship;
    }

    confirmParticipation(){
        this.participeChampionshipSingle(this.championship);

    }

    participeChampionshipSingle(championship: Championship) {
        this.championshipService.participate(championship.id, this.teamSelected.id).subscribe(
            (classification) => {
                console.log(classification);
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Participação no campeonato confirmada!',
                    life: 3000
                });

                this.initChampionships();

                this.verifyParticipate();

                this.participeChampionshipDialog = false;
            },
            error => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: `Error na participação do campeonato ${error.error.error}`,
                    life: 3000
                });
            }
        );
    }


    hideDialog() {
        this.championshipDialog = false;
        this.submitted = false;
    }

    openNew() {
        this.championship = new Championship;
        this.submitted = false;
        this.championshipDialog = true;
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}
