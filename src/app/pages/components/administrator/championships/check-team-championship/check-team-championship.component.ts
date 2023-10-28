import { Component, OnInit } from '@angular/core';
import { ChampionshipService } from '../championship.service';
import { IClassificationCheck } from 'src/app/pages/shareds/models/classification.interface';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-check-team-championship',
  templateUrl: './check-team-championship.component.html',
  styleUrls: ['./check-team-championship.component.scss']
})
export class CheckTeamChampionshipComponent implements OnInit {

    championships: IClassificationCheck[];
    championship: IClassificationCheck;
    activeChampionshipDialog: boolean = false;

    constructor(
        private championshipService: ChampionshipService,
    ) {}

    ngOnInit(): void {

        this.loadTeamsForCheck();

    }

    loadTeamsForCheck() {
        this.championshipService.forCheck(false).subscribe(
            (camps: IClassificationCheck[]) => {
                this.championships = camps;

            }
        );

    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    activeTeam(championship: IClassificationCheck) {
        this.championship = championship
        this.activeChampionshipDialog = true;
    }

    confirmActiveTeam() {
        this.championshipService.checkChampionship(this.championship.id).subscribe(
            (camp: IClassificationCheck) => {
                this.loadTeamsForCheck();
                this.activeChampionshipDialog = false;
            }
        );
    }
}
