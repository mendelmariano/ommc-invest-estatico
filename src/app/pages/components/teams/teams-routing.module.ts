import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeamsFormComponent } from './teams-form/teams-form.component';
import { MyteamListComponent } from './myteam-list/myteam-list.component';

const routes: Routes = [
    {
        path: 'create',
        component: TeamsFormComponent
    },
    {
        path: 'myList',
        component: MyteamListComponent
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeamsRoutingModule { }
