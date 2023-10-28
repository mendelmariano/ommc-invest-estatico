import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChampionshipsRoutingModule } from './championships-routing.module';
import { ChampionshipListComponent } from './championship-list/championship-list.component';
import { ToastModule } from 'primeng/toast';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { DialogModule } from 'primeng/dialog';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { MyChampionshipsComponent } from './my-championships/my-championships.component';
import { ClassificationsComponent } from './classifications/classifications.component';
import { ClassificationTableComponent } from './classifications/classification-table/classification-table.component';



@NgModule({
  declarations: [
    ChampionshipListComponent,
    MyChampionshipsComponent,
    ClassificationsComponent,
    ClassificationTableComponent
  ],
  imports: [
    CommonModule,
    ChampionshipsRoutingModule,
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

  providers: [MessageService, DialogService]
})
export class ChampionshipsModule { }
