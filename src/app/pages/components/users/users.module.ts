import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersSettingsFormComponent } from './users-settings-form/users-settings-form.component';
import { UsersSettingsListComponent } from './users-settings-list/users-settings-list.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { ToolbarModule } from 'primeng/toolbar';
import { DialogModule } from 'primeng/dialog';
import { PasswordModule } from 'primeng/password';


@NgModule({
  declarations: [
    UsersSettingsFormComponent,
    UsersSettingsListComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
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
    PasswordModule,

  ],
  providers: [MessageService]
})
export class UsersModule { }
