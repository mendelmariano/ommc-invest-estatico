import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministratorRoutingModule } from './administrator-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { UsersListComponent } from './users-list/users-list.component';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { RippleModule } from 'primeng/ripple';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToastModule } from 'primeng/toast';
import { SliderModule } from 'primeng/slider';
import { RatingModule } from 'primeng/rating';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { PaginatorModule } from 'primeng/paginator';
import { UserFormComponent } from './user-form/user-form.component';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { CheckboxModule } from 'primeng/checkbox';
import { PasswordModule } from 'primeng/password';
import { ToolbarModule } from 'primeng/toolbar';
import { DialogModule } from 'primeng/dialog';


@NgModule({
  declarations: [
    UsersListComponent,
    UserFormComponent,

  ],
  imports: [
    CommonModule,
    AdministratorRoutingModule,
    HttpClientModule,
    FormsModule,
	TableModule,
    PaginatorModule,
	RatingModule,
	ButtonModule,
	SliderModule,
	InputTextModule,
	ToggleButtonModule,
	RippleModule,
	MultiSelectModule,
	DropdownModule,
	ProgressBarModule,
	ToastModule,
    DynamicDialogModule,
    ButtonModule,
    CheckboxModule,
    InputTextModule,
    ReactiveFormsModule,
    PasswordModule,
    ToolbarModule,
    DialogModule,
  ],
  providers: [MessageService, DialogService]
})
export class AdministratorModule { }
