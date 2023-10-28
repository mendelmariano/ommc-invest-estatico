import { Component, OnInit } from '@angular/core';
import { Team } from 'src/app/pages/shareds/models/team.interface';
import { TeamsService } from '../teams.service';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { AuthServiceService } from '../../auth/auth-service.service';
import { Subscription } from 'rxjs';
import { User } from 'src/app/pages/shareds/models/user.model';
import { HttpErrorResponse } from '@angular/common/http';
import { ModeService } from 'src/app/pages/service/mode.service';
import { Mode } from 'src/app/pages/shareds/models/mode.interface';

@Component({
  selector: 'app-myteam-list',
  templateUrl: './myteam-list.component.html',
  styleUrls: ['./myteam-list.component.scss']
})
export class MyteamListComponent implements OnInit {



    team: Team;
    teams: Team[];

    teamDialog: boolean = false;

    deleteTeamDialog: boolean = false;

    deleteTeamsDialog: boolean = false;

    selectedTeams: Team[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    myUser: Subscription;
    loggedInUser: User;
    modes: Mode[];

    constructor(
        private teamService: TeamsService,
        private messageService: MessageService,
        private authService: AuthServiceService,
        private modeService: ModeService,
    ) {
        this.cols = [
            { field: 'team', header: 'Times' },

        ];

    }

    ngOnInit(): void {
        this.loadLoggedInUser();
        this.loadTeams();
        this.initModes();

    }

    initModes() {
        this.modeService.getAll().subscribe(
            (modes: Mode[]) => this.modes = modes
        );
    }


    loadLoggedInUser() {
        this.myUser = this.authService.getUser().subscribe(
            (user: User) => {
                this.loggedInUser = user;
            }
        );
    }


    loadTeams() {
        this.teamService.loadTeamsUser(this.loggedInUser.id).subscribe({
            next: (teams: Team[]) =>{
                this.teams = teams}
        });
    }

    activeTeam(team: Team) {
        this.teamService.activeTeam(team.id).subscribe({
            next: (teamAct: Team) => {

                const index = this.teams.findIndex(t => t.id === teamAct.id);
                if (index !== -1) {
                    this.teams[index] = teamAct;
                }


                this.messageService.add({
                    severity: 'success',
                    summary: 'Sucesso',
                    detail: `Time ${teamAct.team} alterado com sucesso!`
                });
            },
            error: (error) => {
                console.error('Erro ao ativar o time:', error);
            }
        });
    }

    editTeam(team: Team) {
        this.team = team;
        this.teamDialog = true;
    }

    deleteTeam(team: Team) {
        this.deleteTeamDialog = true;
        this.team = team;
    }

    deleteTeams() {
        this.deleteTeamsDialog = true;

    }

    hideDialog() {
        this.teamDialog = false;

    }

    confirmDelete() {
        if(this.team){
            this.deleteSingle(this.team);
            const index = this.teams.findIndex(m => m.id === this.team.id);
            if (index !== -1) {
                this.teams.splice(index, 1);
            }
        }

    }

    deleteTeamsSelecteds(){
        this.selectedTeams.forEach(teamSel => {
            this.deleteSingle(teamSel);
        });
        this.teams = this.teams.filter(val => !this.selectedTeams.includes(val));

        this.selectedTeams = [];
        this.deleteTeamsDialog = false;
    }

    deleteSingle(teamDel: Team) {
        this.teamService.delete(teamDel.id).subscribe({
            next: () => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Time deletado',
                    life: 3000
                });

                this.deleteTeamDialog = false;
            },
            error: (error) => {
                console.error('Erro ao excluir o time:', error);
            }
        });
    }

    activeTeams() {
        this.selectedTeams.forEach(teamSel => {
            if(!teamSel.check){
                this.activeTeam(teamSel);
            }
        });

        this.selectedTeams = [];
    }

    desactiveTeams() {
        this.selectedTeams.forEach(teamSel => {
            if(teamSel.check){
                this.activeTeam(teamSel);
            }
        });

        this.selectedTeams = [];
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    saveTeam() {

        if(this.team.mode.id){
        this.team.mode_id = this.team.mode.id;
        }
        this.teamService.update(this.team).subscribe(
            {
                next: (team: Team) => {
                    this.messageService.add({ severity: 'success',
                                              summary: 'Successful',
                                              detail: 'Time salvo',
                                              life: 3000 });

                this.teamDialog = false;
                this.team = new Team();
                this.submitted = true;

                } ,
                error: (error: HttpErrorResponse) => {
                    // Lida com erros, como validação de campos ou falhas na API
                    console.error('Erro ao cadastrar:', error);
                    this.messageService.add({ key: 'tst', severity: 'error', summary: 'Falhou!', detail: `Erro! ${error.error.error}` })
                }
            }
        )
    }


}
