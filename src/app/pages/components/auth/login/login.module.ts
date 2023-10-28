import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { RouterModule } from '@angular/router';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        LoginRoutingModule,
        ButtonModule,
        CheckboxModule,
        InputTextModule,
        ReactiveFormsModule,
        PasswordModule,
        ToastModule,
        RouterModule,
        MessagesModule,
		MessageModule,
    ],
    declarations: [LoginComponent]
})
export class LoginModule { }
