import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register/register.component';

import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { ReactiveFormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { RouterModule } from '@angular/router';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';


@NgModule({
  declarations: [
    RegisterComponent
  ],
  imports: [
    CommonModule,
        ButtonModule,
        CheckboxModule,
        InputTextModule,
        ReactiveFormsModule,
        PasswordModule,
        RegisterRoutingModule,
        ToastModule,
        RouterModule,
        MessagesModule,
		MessageModule,
  ]
})
export class RegisterModule { }
