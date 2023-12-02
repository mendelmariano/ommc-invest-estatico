import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard.component';
import { ChartModule } from 'primeng/chart';
import { MenuModule } from 'primeng/menu';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { StyleClassModule } from 'primeng/styleclass';
import { PanelMenuModule } from 'primeng/panelmenu';
import { DashboardsRoutingModule } from './dashboard-routing.module';
import { SpeedDialModule } from 'primeng/speeddial';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ToolbarModule } from 'primeng/toolbar';
import { SidebarModule } from 'primeng/sidebar';
import { CalendarModule } from 'primeng/calendar';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { FieldsetModule } from 'primeng/fieldset';
import { EntriesModule } from '../entries/entries.module';
import { OutsModule } from '../outs/outs.module';
import { InvestimentsModule } from '../investiments/investiments.module';
import { PatrymonyModule } from '../patrymony/patrymony.module';
import { CategoryService } from '../../service/category.service';
import { TabViewModule } from 'primeng/tabview';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ChartModule,
        MenuModule,
        TableModule,
        StyleClassModule,
        PanelMenuModule,
        ButtonModule,
        RippleModule,
        DashboardsRoutingModule,
        SpeedDialModule,
        ToastModule,
        SplitButtonModule,
        ToolbarModule,
        SidebarModule,
        ReactiveFormsModule,
        CalendarModule,
        InputMaskModule,
        InputTextModule,
        FieldsetModule,
        EntriesModule,
        OutsModule,
        InvestimentsModule,
        PatrymonyModule,
        TabViewModule,
    ],
    declarations: [DashboardComponent],
    providers: [MessageService, CategoryService]
})
export class DashboardModule { }
