import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResultCreateComponent } from './result-create/result-create.component';
import { ResultListComponent } from './result-list/result-list.component';

const routes: Routes = [
    {
        path: 'create',
        component: ResultCreateComponent
    },

    {
        path: 'create/:championship_id',
        component: ResultCreateComponent
    },

    {
        path: 'myList',
        component: ResultListComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResultRoutingModule { }
