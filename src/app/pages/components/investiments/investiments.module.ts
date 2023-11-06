import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvestimentsRoutingModule } from './investiments-routing.module';
import { InvestmentsCrudComponent } from './investments-crud/investments-crud.component';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { FieldsetModule } from 'primeng/fieldset';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ToolbarModule } from 'primeng/toolbar';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { RatingModule } from 'primeng/rating';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { InvestmentService } from '../../service/investment.service';


@NgModule({
  declarations: [
    InvestmentsCrudComponent
  ],
  imports: [
    CommonModule,
    InvestimentsRoutingModule,
    ReactiveFormsModule,
    CalendarModule,
    InputMaskModule,
    InputTextModule,
    FieldsetModule,
    ToastModule,
    ToolbarModule,
    TableModule,
    DialogModule,
    FormsModule,
    RatingModule,
    InputTextModule,
    InputTextareaModule,
    DropdownModule,
    RadioButtonModule,
    InputNumberModule,
  ],
  exports: [
    InvestmentsCrudComponent,
  ],
  providers: [MessageService, InvestmentService]
})
export class InvestimentsModule { }
