import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthServiceService } from '../../auth/auth-service.service';
import { TeamsService } from '../../teams/teams.service';
import { User } from 'src/app/pages/shareds/models/user.interface';
import { Subscription } from 'rxjs';
import { Team } from 'src/app/pages/shareds/models/team.interface';
import { ClassificationService } from './classification.service';
import { IClassificationCheck } from 'src/app/pages/shareds/models/classification.interface';

@Component({
  selector: 'app-classifications',
  templateUrl: './classifications.component.html',
  styleUrls: ['./classifications.component.scss']
})


export class ClassificationsComponent implements OnInit {

    championship_id: number;
    myUser: Subscription;
    loggedInUser: User;
    myTeamsChecked: Team[];
    myTeamsCheckedIds: number[] = [];
    rankingsTables: IClassificationCheck[] = [];

    constructor(
        private route: ActivatedRoute,
        private authService: AuthServiceService,
        private teamService: TeamsService,
        private classificationService: ClassificationService,
        ) {
        this.route.params.subscribe(params => {
          this.championship_id = params['championship_id'];
          // Agora você pode usar idChampionship em seu componente
        });
}

    ngOnInit(): void {
        this.loadLoggedInUser();
        this.loadTeams(this.loggedInUser);
    }


    loadLoggedInUser() {
        this.myUser = this.authService.getUser().subscribe(
            (user: User) => {
                this.loggedInUser = user;

            }
        );
    }

    loadTeams(user: User) {
        this.teamService.loadTeamsUserChecked(user.id).subscribe({
            next: (teams: Team[]) =>{
                this.myTeamsChecked = teams;
                this.searchRankings();
            }
        });
    }

    searchRankings() {
        if(!this.championship_id) {
            this.myTeamsChecked.map( team => this.myTeamsCheckedIds.push(team.id));
            this.classificationService.champsForTeams(this.myTeamsCheckedIds).subscribe(
                (rankings: IClassificationCheck[]) => {
                    this.rankingsTables = rankings;
                }
            )
        } else {
            this.classificationService.champClassification(this.championship_id).subscribe(
                (ranking: IClassificationCheck) => {
                    this.rankingsTables.push(ranking);
                }
            )
        }
    }


}

