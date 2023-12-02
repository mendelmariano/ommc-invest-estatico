import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Plan } from '../../shareds/models/plan.model';
import { Entry } from '../../api/entry';
import { Out } from '../../api/out';
import { Investment } from '../../api/investment';
import { Patrymony } from '../../api/patrymony';
import { CategoryService } from '../../service/category.service';
import { Category } from '../../api/category';
import { UsersService } from '../users/users.service';
import { AuthServiceService } from '../auth/auth-service.service';
import { PeriodSearch } from '../../api/patrimony';

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

    receitasDataGeneral: any;
    receitasOptionsGeneral: any;


    gastosData: any;
    gastosGraphOpt: any;

    periodSearch: PeriodSearch;

    patrymoniesDataGraph: any;
    patrymoniesDataOpt: any;

    totalEntries: number = 0;
    entries: Entry[] = [];

    totalOuts: number = 0;
    outs: Out[] = [];

    totalPatrymonies: number = 0;
    patrymonies: Patrymony[] = [];

    totalInvestments: number = 0;
    investments: Investment[] = [];

    categorias: Category[] = [];
    user_id: string;

    exibirReceitasEmPercentual = true;

    showPatrymoniesPercentages: boolean = false;

    showGastosPercentages: boolean = false;

    constructor(private messageService: MessageService,
                public layoutService: LayoutService,
                private fb: FormBuilder,
                private categoryService: CategoryService,
                private authService: AuthServiceService,
                ) {
        this.planForm = this.fb.group({
            startDate: ['', Validators.required],
            endDate: ['', Validators.required],
            namePlan: ['', Validators.required],
        });




    }


    ngOnInit() {
        this.initMenuNew();
        this.updatePieChart();
        this.updateGraphPatrymonies();
        this.mockDatas();
        this.initCategories();
        this.updateGastosChart();
        this.updateReceitasChart();

        this.authService.getUser().subscribe(
            user => this.user_id = user.id
        )
    }

    initCategories() {
        this.categoryService.getCategories()
            .then(data => {
                this.categorias = data;
                this.updateGastosChart(); // Mova a chamada para cá
            })
            .catch(error => {
                console.error("Erro ao obter categorias:", error);
                // Trate o erro conforme necessário
            });
    }

    mockDatas() {
        // Valores mockados
        const mockValues = {
            dataInicio: new Date("2023-11-01T03:00:00.000Z"),
            dataFim: new Date("2023-11-30T03:00:00.000Z"),
            namePlan: "Mês Atual"
        };

        // Use o método patchValue para definir os valores iniciais
        this.planForm.patchValue(mockValues);
        this.salvarPeriodo();
        this.updatePieChart();
    }

    onTotalEntriesChanged(total: number) {
        this.totalEntries = total;
        this.updatePieChart();
        this.updateReceitasChart();
    }

    onEntriesChanged(entries: Entry[]) {
        this.entries = entries;
        this.updatePieChart();
        this.updateReceitasChart();
    }

    onTotalPatrymoniesChanged(total: number) {
        this.totalPatrymonies = total;
        this.updatePieChart();
    }

    onPatrymoniesChanged(patrymonies: Patrymony[]) {
        this.patrymonies = patrymonies;
        this.updatePieChart();
        this.updateGraphPatrymonies();
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
        this.updateGastosChart();
    }

    onOutsChanged(outs: Out[]) {
        this.outs = outs;
        this.updatePieChart();
        this.updateGastosChart();
    }

    togglePatrymoniesPercentages() {
        this.showPatrymoniesPercentages = !this.showPatrymoniesPercentages;
        this.updateGraphPatrymonies();
      }

    toggleGastosPercentages() {
        this.showGastosPercentages = !this.showGastosPercentages;
        this.updateGastosChart();
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
            }
        ];
    }



    updateGraphPatrymonies() {
        const categoryValues = this.calculateCategoryValues(this.patrymonies);

        const labels = Object.keys(categoryValues);
        const data = Object.values(categoryValues);

        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');

        // Verifica se deve exibir em percentuais ou valores absolutos
        if (this.showPatrymoniesPercentages) {
          // Converte os valores para números
          const numericData = data.map((value: any) => parseFloat(value));

          const totalPatrymoniesValue = numericData.reduce((total, value) => total + value, 0);

          // Calcula percentagens
          const percentages = numericData.map(value => ((value / totalPatrymoniesValue) * 100).toFixed(2));

          // Atualiza os dados com percentagens
          this.patrymoniesDataGraph = {
            labels: labels,
            datasets: [
              {
                data: percentages,
                backgroundColor: [documentStyle.getPropertyValue('--blue-500'), documentStyle.getPropertyValue('--yellow-500'), documentStyle.getPropertyValue('--green-500')],
                hoverBackgroundColor: [documentStyle.getPropertyValue('--blue-400'), documentStyle.getPropertyValue('--yellow-400'), documentStyle.getPropertyValue('--green-400')]
              }
            ]
          };
        } else {
          // Exibe os valores absolutos
          this.patrymoniesDataGraph = {
            labels: labels,
            datasets: [
              {
                data: data,
                backgroundColor: [documentStyle.getPropertyValue('--blue-500'), documentStyle.getPropertyValue('--yellow-500'), documentStyle.getPropertyValue('--green-500')],
                hoverBackgroundColor: [documentStyle.getPropertyValue('--blue-400'), documentStyle.getPropertyValue('--yellow-400'), documentStyle.getPropertyValue('--green-400')]
              }
            ]
          };
        }

        this.patrymoniesDataOpt = {
          cutout: '60%',
          plugins: {
            legend: {
              labels: {
                color: textColor
              }
            },
            tooltip: {
                callbacks: {
                  label: (context) => {
                    const label = context.label || '';
                    const value = context.parsed;
                    return this.showPatrymoniesPercentages ? `${label}: ${value.toFixed(2)}%` : this.formatarParaReais(Number(value));
                  },
                },
              },
          }
        };
      }

    calculateCategoryValues(data) {
        const categoryValues = {};

        data.forEach(item => {
          const category = item.category;
          const price = item.price;

          if (categoryValues[category]) {
            categoryValues[category] += price;
          } else {
            categoryValues[category] = price;
          }
        });

        return categoryValues;
      }

      calculateCategoryPercentages(data) {
        const categoryPercentages = {};
        let total = 0;

        // Calcular o total dos preços
        data.forEach(item => {
          total += item.price;
        });

        // Calcular as porcentagens para cada categoria
        data.forEach(item => {
          const category = item.category;
          const price = item.price;

          const percentage = (price / total) * 100;

          if (categoryPercentages[category]) {
            categoryPercentages[category] += percentage;
          } else {
            categoryPercentages[category] = percentage;
          }
        });

        return categoryPercentages;
      }



      getUniqueCategoriesAndSum(expenses: Out[]) {
        const sumByCategory: Record<string, number> = {};
        const uniqueCategories = new Set<string>();

        expenses.forEach(expense => {
          const { category, price } = expense;

          uniqueCategories.add(category);
          sumByCategory[category] = (sumByCategory[category] || 0) + price;
        });

        const labels: string[] = Array.from(uniqueCategories);
        const values: number[] = labels.map(category => sumByCategory[category] || 0);

        return { labels, values };
      }


      updateGastosChart() {

        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');

        const gastos =
        this.showGastosPercentages ? this.calculateCategoryPercentages(this.outs) : this.calculateCategoryValues(this.outs)
       //  this.getUniqueCategoriesAndSum(this.outs);

       const labels = Object.keys(gastos);
        const data = Object.values(gastos);

        this.gastosData = {
            labels: labels,
            datasets: [
                {
                    data: data,
                    backgroundColor: [
                        documentStyle.getPropertyValue('--indigo-500'),
                        documentStyle.getPropertyValue('--purple-500'),
                        documentStyle.getPropertyValue('--teal-500')
                    ],
                    hoverBackgroundColor: [
                        documentStyle.getPropertyValue('--indigo-400'),
                        documentStyle.getPropertyValue('--purple-400'),
                        documentStyle.getPropertyValue('--teal-400')
                    ]
                }]
        };

        this.gastosGraphOpt = {
            plugins: {
                legend: {
                    labels: {
                        usePointStyle: true,
                        color: textColor
                    }
                },
            tooltip: {
                callbacks: {
                    label: (context) => {
                    const label = context.label || '';
                    const value = context.parsed;
                    return this.showGastosPercentages ? `${label}: ${value.toFixed(2)}%` : this.formatarParaReais(Number(value));
                    },
                },
                },
            }
        };
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

        this.pieOptionsGeneral = {

        plugins: {
            legend: {
                labels: {
                    color: textColor
                }
            },
            tooltip: {
                callbacks: {
                  label: (context) => {
                    const label = context.dataset.label || '';
                    const value = context.parsed.y;
                    return this.formatarParaReais(Number(value));
                  },
                },
              },

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
        this.updateGraphPatrymonies();
    }

    updateReceitasChart() {



        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');



        const dadosGrafico = this.exibirReceitasEmPercentual
        ? this.calculateCategoryPercentages(this.entries)
        : this.calculateCategoryValues(this.entries);

        const labels = Object.keys(dadosGrafico);
        const data = Object.values(dadosGrafico);

        this.receitasDataGeneral = {
            labels: labels,
            datasets: [
                {
                    label: 'Minhas Receitas',
                    data: data,
                    backgroundColor: [ 'rgba(75, 192, 192, 0.2)', 'rgba(255, 50, 0, 0.2)', 'rgba(255, 215, 0, 0.2)'],
                    borderColor: ['rgb(255, 159, 64)', 'rgb(75, 192, 192)', 'rgb(255, 215, 0)'],
                    borderWidth: 1
                }
            ]
        };

        this.receitasOptionsGeneral = {

            plugins: {
            legend: {
                labels: {
                    color: textColor
                }
            },
            tooltip: {
                callbacks: {
                  label: (context) => {
                    const label = context.dataset.label || '';
                    const value = context.parsed.y;
                    return this.exibirReceitasEmPercentual ? `${label}: ${value.toFixed(2)}%` : this.formatarParaReais(Number(value));
                  },
                },
              },

        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    color: textColorSecondary,
                    callback: (value) => this.exibirReceitasEmPercentual ? `${value}%` : value,

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
        this.updateGraphPatrymonies();
    }

    formatarParaReais(valor: number): string {
        const formatoReais = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
        return formatoReais.format(valor);
      }

    toggleExibirReceitasEmPercentual() {
        this.exibirReceitasEmPercentual = !this.exibirReceitasEmPercentual;
        this.updateReceitasChart();
      }

    salvarPeriodo() {
        this.visiblePeriodPlan = false;
        this.visibleInOut = true;
        this.plan.namePlan = this.planForm.get('namePlan').value;
        const newDataSearch: PeriodSearch = {
            endDate: new Date(this.planForm.get('startDate').value),
            startDate: new Date(this.planForm.get('endDate').value)
        }
       this.periodSearch = newDataSearch;
       this.updateGraphPatrymonies();

    }
}
