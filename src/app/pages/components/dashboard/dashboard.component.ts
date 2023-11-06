import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Plan } from '../../shareds/models/plan.model';
import { Entry } from '../../api/entry';
import { Out } from '../../api/out';
import { Investment } from '../../api/investment';

@Component({
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

    items: MenuItem[] | undefined;
    visiblePeriodPlan: boolean = false;
    visibleInOut: boolean = false;
    planForm: FormGroup;
    plan: Plan = new Plan();
    pieDataGeneral: any;
    pieOptionsGeneral: any;

    totalEntries: number = 0;
    entries: Entry[] = [];

    totalOuts: number = 0;
    outs: Out[] = [];

    totalInvestments: number = 0;
    investments: Investment[] = [];

    constructor(private messageService: MessageService,
                public layoutService: LayoutService,
                private fb: FormBuilder) {
        this.planForm = this.fb.group({
            dataInicio: ['', Validators.required],
            dataFim: ['', Validators.required],
            namePlan: ['', Validators.required],
        });

        this.mockDatas();


    }


    ngOnInit() {
        this.initMenuNew();
        this.updatePieChart();
    }

    mockDatas() {
        // Valores mockados
        const mockValues = {
            dataInicio: "2023-11-01T03:00:00.000Z",
            dataFim: "2023-11-30T03:00:00.000Z",
            namePlan: "Novembro/2024"
        };

        // Use o método patchValue para definir os valores iniciais
        this.planForm.patchValue(mockValues);
        this.salvarPeriodo();
        this.updatePieChart();
    }

    onTotalEntriesChanged(total: number) {
        this.totalEntries = total;
        this.updatePieChart();
    }

    onEntriesChanged(entries: Entry[]) {
        this.entries = entries;
        this.updatePieChart();
    }


    onTotalInvestmentsChanged(total: number) {
        this.totalInvestments = total;
        this.updatePieChart();
    }

    onInvestmentsChanged(investments: Investment[]) {
        this.investments = investments;
        this.updatePieChart();
    }


    onTotalOutsChanged(total: number) {
        this.totalOuts = total;
        this.updatePieChart();
    }

    onOutsChanged(outs: Out[]) {
        this.outs = outs;
        this.updatePieChart();
    }

    initMenuNew() {
        this.items = [
            {
                icon: 'one',
                label: 'Selecionar período',
                command: () => {
                    this.messageService.add({ severity: 'info', summary: 'Add', detail: 'Data Added' });
                    this.visiblePeriodPlan = true;
                }
            },
            {
                icon: 'salvar',
                command: () => {
                    this.messageService.add({ severity: 'success', summary: 'Update', detail: 'Data Updated' });
                }
            },
        ];
    }



    updatePieChart() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');


        this.pieDataGeneral = {
            labels: ['Receitas', 'Gastos', 'Investimentos'],
            datasets: [
                {
                    label: 'Situação mensal',
                    data: [this.totalEntries, this.totalOuts, this.totalInvestments],
                    backgroundColor: [ 'rgba(75, 192, 192, 0.2)', 'rgba(255, 50, 0, 0.2)', 'rgba(255, 215, 0, 0.2)'],
                    borderColor: ['rgb(255, 159, 64)', 'rgb(75, 192, 192)', 'rgb(255, 215, 0)'],
                    borderWidth: 1
                }
            ]
        };

        this.pieOptionsGeneral = { plugins: {
            legend: {
                labels: {
                    color: textColor
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder,
                    drawBorder: false
                }
            },
            x: {
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder,
                    drawBorder: false
                }
            }
        }
        };
    }

    salvarPeriodo() {
        this.visiblePeriodPlan = false;
        this.visibleInOut = true;
        this.plan.namePlan = this.planForm.get('namePlan').value;
    }
}
