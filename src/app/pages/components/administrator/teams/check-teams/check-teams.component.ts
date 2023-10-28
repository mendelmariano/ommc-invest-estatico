import { Component, OnInit } from '@angular/core';
import { Team } from 'src/app/pages/shareds/models/team.interface';
import { TeamsService } from '../../../teams/teams.service';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-check-teams',
  templateUrl: './check-teams.component.html',
  styleUrls: ['./check-teams.component.scss']
})
export class CheckTeamsComponent implements OnInit {


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

    constructor(
        private teamService: TeamsService,
        private messageService: MessageService
    ) {
        this.cols = [
            { field: 'team', header: 'Times' },

        ];

    }

    ngOnInit(): void {
        this.loadTeams();
    }


    loadTeams() {
        this.teamService.loadTeams().subscribe({
            next: (teams: Team[]) => this.teams = teams
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

    deleteTeam(team: Team) {

        this.deleteTeamDialog = true;
        this.team = team;
    }

    deleteTeams() {
        this.deleteTeamsDialog = true;

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


}
