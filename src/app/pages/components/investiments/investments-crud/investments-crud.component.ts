import { Component, EventEmitter, Output } from '@angular/core';

import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Investment } from 'src/app/pages/api/investment';
import { InvestmentService } from 'src/app/pages/service/investment.service';

@Component({
  selector: 'app-investments-crud',
  templateUrl: './investments-crud.component.html',
  styleUrls: ['./investments-crud.component.scss']
})
export class InvestmentsCrudComponent {



    @Output() totalInvestmentsChanged = new EventEmitter<number>();
    @Output() investmentsChanged = new EventEmitter<Investment[]>();

    investmentDialog: boolean = false;

    deleteProductDialog: boolean = false;

    deleteInvestmentsDialog: boolean = false;

    investments: Investment[] = [];

    investment: Investment = {};

    selectedInvestments: Investment[] = [];

    submitted: boolean = false;

    cols: any[] = [];



    categorias = ['CDI', 'CDB', 'IPCA+', 'Outros'];
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

        this.mockInvestments();

    }

    mockInvestments() {
       const mockInvestmentsValues: Investment[] = [
            { "name": "PagSeguro", "category": "CDB", "price": 20000, "id": "1ZIta" },
            { "name": "Nubank", "category": "CDI", "price": 5000, "id": "IEkO7" },
            { "name": "Sofisa", "category": "Outros", "price": 15000, "id": "IEkO8" },
            { "name": "99 Pay", "category": "IPCA+", "price": 1300, "id": "IEkO9" }
           ];
        this.investments.push(...mockInvestmentsValues);
        this.sumInvestments();
    }

    openNew() {
        this.investment = {};
        this.submitted = false;
        this.investmentDialog = true;
    }

    deleteSelectedInvestments() {
        this.deleteInvestmentsDialog = true;
    }

    editProduct(investment: Investment) {
        this.investment = { ...investment };
        this.investmentDialog = true;
    }

    deleteProduct(investment: Investment) {
        this.deleteProductDialog = true;
        this.investment = { ...investment };
    }

    confirmDeleteSelected() {
        this.deleteInvestmentsDialog = false;
        this.investments = this.investments.filter(val => !this.selectedInvestments.includes(val));
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Investments Deleted', life: 3000 });
        this.selectedInvestments = [];
    }

    confirmDelete() {
        this.deleteProductDialog = false;
        this.investments = this.investments.filter(val => val.id !== this.investment.id);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Investment Deleted', life: 3000 });
        this.investment = {};
    }

    hideDialog() {
        this.investmentDialog = false;
        this.submitted = false;
    }

    saveProduct() {
        this.submitted = true;

        if (this.investment.name?.trim()) {
            if (this.investment.id) {
                // @ts-ignore
                this.investments[this.findIndexById(this.investment.id)] = this.investment;
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Investment Updated', life: 3000 });
            } else {
                this.investment.id = this.createId();
                // @ts-ignore
                this.investments.push(this.investment);
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Investment Created', life: 3000 });
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
