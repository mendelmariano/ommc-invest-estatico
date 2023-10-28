import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ModeService } from 'src/app/pages/service/mode.service';
import { Championship } from 'src/app/pages/shareds/models/championship.interface';
import { Classification } from 'src/app/pages/shareds/models/classification.interface';
import { Mode } from 'src/app/pages/shareds/models/mode.interface';
import { Team } from 'src/app/pages/shareds/models/team.interface';
import { User } from 'src/app/pages/shareds/models/user.interface';
import { ChampionshipService } from '../../administrator/championships/championship.service';
import { AuthServiceService } from '../../auth/auth-service.service';
import { TeamsService } from '../../teams/teams.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-my-championships',
  templateUrl: './my-championships.component.html',
  styleUrls: ['./my-championships.component.scss']
})
export class MyChampionshipsComponent implements OnInit {


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

    championship_id: number;

    constructor(
        private modeService: ModeService,
        private messageService: MessageService,
        private championshipService: ChampionshipService,
        private authService: AuthServiceService,
        private teamService: TeamsService,
        private router: Router,
        private route: ActivatedRoute,
    ) {
        this.route.params.subscribe(params => {
            this.championship_id = params['championship_id'];
            // Agora você pode usar idChampionship em seu componente
          });

    }
    ngOnInit(): void {

        this.loadLoggedInUser();
        this.initModes();
        this.initChampionships();
        this.filterChampionshipsByClassification();
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
                    this.filterChampionshipsByClassification();
                }
            );


    }

    filterChampionshipsByClassification() {
        if (this.championshipsInClassification && this.championships) {
          const filteredChampionships = this.championships.filter(championship => {
            return this.championshipsInClassification.some(classification => classification.championship_id === championship.id);
          });
          this.championships = filteredChampionships;
        }
      }

    // Função para verificar se o usuário está na lista de classificação de um campeonato específico.


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



    goToRanking(championship) {
        this.router.navigate(['/championships/classifications', championship.id]);
    }

    goToMatch(championship) {
        this.router.navigate(['/results/create', championship.id]);
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
