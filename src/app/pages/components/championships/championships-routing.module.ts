import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChampionshipListComponent } from './championship-list/championship-list.component';
import { MyChampionshipsComponent } from './my-championships/my-championships.component';
import { ClassificationsComponent } from './classifications/classifications.component';

const routes: Routes = [
    {
        path: 'list',
        component: ChampionshipListComponent
    },

    {
        path: 'myList',
        component: MyChampionshipsComponent
    },

    {
        path: 'classifications',
        component: ClassificationsComponent
    },

    {
        path: 'classifications/:championship_id', // Rota com o parâmetro
        component: ClassificationsComponent
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChampionshipsRoutingModule { }
