import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersSettingsListComponent } from './users-settings-list/users-settings-list.component';
import { UsersSettingsFormComponent } from './users-settings-form/users-settings-form.component';

const routes: Routes = [
    {
        path: '',
        component: UsersSettingsListComponent
    },

    {
        path: 'edit',
        component: UsersSettingsFormComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
