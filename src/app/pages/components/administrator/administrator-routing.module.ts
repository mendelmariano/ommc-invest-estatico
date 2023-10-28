import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersListComponent } from './users-list/users-list.component';
import { ModeCrudComponent } from './mode-crud/mode-crud.component';
import { CheckTeamsComponent } from './teams/check-teams/check-teams.component';
import { ChampionshipCrudComponent } from './championships/championship-crud/championship-crud.component';
import { CheckTeamChampionshipComponent } from './championships/check-team-championship/check-team-championship.component';

const routes: Routes = [
    {
        path: '',
        component: UsersListComponent
    },
    {
        path: 'mode',
        component: ModeCrudComponent
    },

    {
        path: 'championship',
        component: ChampionshipCrudComponent,
    },

    {
        path: 'championship/check',
        component: CheckTeamChampionshipComponent,

    },


    {
        path: 'team/check',
        component: CheckTeamsComponent
    },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministratorRoutingModule { }
