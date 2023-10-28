import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResultRoutingModule } from './result-routing.module';
import { ResultCreateComponent } from './result-create/result-create.component';

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
import { ResultListComponent } from './result-list/result-list.component';

@NgModule({
  declarations: [
    ResultCreateComponent,
    ResultListComponent
  ],
  imports: [
    CommonModule,
    ResultRoutingModule,
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
export class ResultModule { }
