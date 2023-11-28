import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Category } from 'src/app/pages/api/category';
import { Investment } from 'src/app/pages/api/investment';
import { MovementRequest } from 'src/app/pages/api/movement';
import { PeriodSearch } from 'src/app/pages/api/patrimony';
import { InvestmentService } from 'src/app/pages/service/investment.service';

@Component({
  selector: 'app-investments-crud',
  templateUrl: './investments-crud.component.html',
  styleUrls: ['./investments-crud.component.scss']
})
export class InvestmentsCrudComponent implements OnInit, OnChanges {



    @Output() totalInvestmentsChanged = new EventEmitter<number>();
    @Output() investmentsChanged = new EventEmitter<Investment[]>();

    @Input() categorias: Category[];

    @Input() busca: any;
    @Input() type_id: number = 3;
    @Input() user_id: string;

    @Input() periodSearch: PeriodSearch;

    investmentDialog: boolean = false;

    deleteInvestmentDialog: boolean = false;

    deleteInvestmentsDialog: boolean = false;

    investments: Investment[] = [];

    investment: Investment = {};

    selectedInvestments: Investment[] = [];

    submitted: boolean = false;

    cols: any[] = [];


    categoriasInvestimentos: Category[];

    totalInvestments: number = 0;
    msgTotalInvestments: string = `Valor Total: R$ 0000,00`


    rowsPerPageOptions = [5, 10, 20];

    constructor(private investmentService: InvestmentService, private messageService: MessageService) { }

    ngOnInit() {
       // this.investmentService.getInvestments().then(data => this.investments = data);

        this.cols = [
            { field: 'investment', header: 'Investment' },
            { field: 'price', header: 'Price' },
            { field: 'category', header: 'Category' },
        ];

       this.getInvestmentsForPeriod(this.periodSearch);

    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['categorias']) {
            this.filtraCategorias();
          }

        if (changes['periodSearch'] && !changes['periodSearch'].firstChange) {
        // A propriedade periodSearch foi alterada, você pode realizar ações aqui
        this.getInvestmentsForPeriod(this.periodSearch);
        }
    }

    getInvestments() {
        this.investmentService.getInvestments()
        .then((investmentsValues: Investment[]) => {
            this.investments.push(...investmentsValues);
            this.sumInvestments();
        }
        )

    }

    getInvestmentsForPeriod(period: PeriodSearch) {
        this.investmentService.getInvestmentsForPeriod(period)
        .then((investmentsValues: Investment[]) => {
            this.investments = investmentsValues;
            this.sumInvestments();
        }
        )

    }

    filtraCategorias() {
        if(this.categorias){
            this.categoriasInvestimentos = this.categorias.filter(categoria => categoria.type_id === 3);
        }

    }

    mockInvestments() {
       const mockInvestmentsValues: Investment[] = [
            { "name": "PagSeguro", "data": new Date("2023-11-07T19:23:37.686Z"), "category": "CDB", "price": 20000, "id": "1ZIta" },
            { "name": "Nubank", "data": new Date("2023-11-07T19:23:37.686Z"), "category": "CDI", "price": 5000, "id": "IEkO7" },
            { "name": "Sofisa", "data": new Date("2023-11-07T19:23:37.686Z"), "category": "Investmentros", "price": 15000, "id": "IEkO8" },
            { "name": "99 Pay", "data": new Date("2023-11-07T19:23:37.686Z"), "category": "IPCA+", "price": 1300, "id": "IEkO9" }
           ];
        this.investments.push(...mockInvestmentsValues);
        this.sumInvestments();
    }

    openNew() {
        this.investment = {};
        this.submitted = false;
        this.investment.data = new Date();
        this.investmentDialog = true;
    }

    deleteSelectedInvestments() {
        this.deleteInvestmentsDialog = true;
    }

    editInvestment(investment: Investment) {

        const categoriaEncontrada = this.categoriasInvestimentos.find(categoria => categoria.name === investment.category);

        if (categoriaEncontrada) {
            investment.category = categoriaEncontrada.id.toString();
        }

        this.investment = { ...investment };
        this.investmentDialog = true;

    }

    deleteInvestment(investment: Investment) {
        this.deleteInvestmentDialog = true;
        this.investment = { ...investment };
        this.sumInvestments();
    }

    confirmDeleteSelected() {
        this.deleteInvestmentsDialog = false;

        this.selectedInvestments.map(
            (investment: Investment) => {
                this.investmentService.delete(investment).then(
                    investment => {
                        this.investments = this.investments.filter(val => val.id !== this.investment.id);
                        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Gasto Deleted', life: 3000 });
                        this.investment = {};
                        this.sumInvestments();
                    }
                ).catch(
                    err => {
                        this.messageService.add({ severity: 'danger', summary: 'Erro', detail: 'Erro na execução', life: 3000 });
                    }
                )
            }
        )

        this.investments = this.investments.filter(val => !this.selectedInvestments.includes(val));
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Investments Deleted', life: 3000 });
        this.selectedInvestments = [];
        this.sumInvestments();
    }

    confirmDelete() {
        this.deleteInvestmentDialog = false;
        this.investmentService.delete(this.investment).then(
            investment => {
                this.investments = this.investments.filter(val => val.id !== this.investment.id);
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Gasto Deleted', life: 3000 });
                this.investment = {};
                this.sumInvestments();
            }
        ).catch(
            err => {
                this.messageService.add({ severity: 'danger', summary: 'Erro', detail: 'Erro na execução', life: 3000 });
            }
        )

    }

    hideDialog() {
        this.investmentDialog = false;
        this.submitted = false;
    }


    saveInvestment() {
        this.submitted = true;


        if (this.investment.name?.trim() && this.investment.category && this.investment.price && this.investment.data  ) {
            if (this.investment.id) {
                const investmentRequest: MovementRequest = {
                    category_id: +this.investment.category,
                    data: this.investment.data,
                    description: this.investment.description,
                    name: this.investment.name,
                    price: this.investment.price,
                    type_id: this.type_id,
                    user_id: this.user_id,
                    id: this.investment.id,
                }

                this.investmentService.update(investmentRequest).then(
                    entrada => {
                        const categoriaEncontrada = this.categoriasInvestimentos.find(categoria => categoria.id === +this.investment.category);

                        if (categoriaEncontrada) {
                        this.investment.category = categoriaEncontrada.name;
                        }

                        // @ts-ignore
                        this.investments[this.findIndexById(this.investment.id)] = entrada;
                        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Entry Updated', life: 3000 });
                    });

                const categoriaEncontrada = this.categoriasInvestimentos.find(categoria => categoria.id === +this.investment.category);

                if (categoriaEncontrada) {
                this.investment.category = categoriaEncontrada.name;
                }

                // @ts-ignore
                this.investments[this.findIndexById(this.investment.id)] = this.investment;
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Entry Updated', life: 3000 });
                this.sumInvestments();
            } else {
                const investmentRequest: MovementRequest = {
                    category_id: +this.investment.category,
                    data: this.investment.data,
                    description: this.investment.description,
                    name: this.investment.name,
                    price: this.investment.price,
                    type_id: this.type_id,
                    user_id: this.user_id,
                }

                this.investmentService.createInvestments(investmentRequest).then(
                    entrada => {
                        this.investment.id = entrada.id;
                        this.investments.push(entrada);
                        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Entry Created', life: 3000 });
                        this.sumInvestments();
                    }
                )
                // this.investment.id = this.createId();
                // @ts-ignore

            }

            this.investments = [...this.investments];
            this.investmentDialog = false;
            this.investment = {};
            this.sumInvestments();

        }
    }


    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.investments.length; i++) {
            if (this.investments[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    createId(): string {
        let id = '';
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    sumInvestments(): number {
        let total = 0;
        for (const investment of this.investments) {
          if (investment.price) {
            total += investment.price;
          }
        }

        this.totalInvestments = total;
        this.msgTotalInvestments = `Valor Total: ${total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`;

        // Emitir o total e as entradas para o componente pai
        this.totalInvestmentsChanged.emit(total);
        this.investmentsChanged.emit(this.investments);

        return total;
      }

}
