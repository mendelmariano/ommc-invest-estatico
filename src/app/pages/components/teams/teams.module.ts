import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeamsRoutingModule } from './teams-routing.module';
import { TeamsFormComponent } from './teams-form/teams-form.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { MyteamListComponent } from './myteam-list/myteam-list.component';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { ToolbarModule } from 'primeng/toolbar';
import { DialogModule } from 'primeng/dialog';


@NgModule({
  declarations: [
    TeamsFormComponent,
    MyteamListComponent
  ],
  imports: [
    CommonModule,
    TeamsRoutingModule,
    HttpClientModule,
    FormsModule,
    ToastModule,
    CardModule,
    InputTextModule,
    DropdownModule,
    ReactiveFormsModule,
    ButtonModule,
    TableModule,
    PaginatorModule,
	ButtonModule,
    ToolbarModule,
    DialogModule,

  ],
  providers: [MessageService]
})
export class TeamsModule { }
