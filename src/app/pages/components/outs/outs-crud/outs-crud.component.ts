import { Component, EventEmitter, Output } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Out } from 'src/app/pages/api/out';
import { OutService } from 'src/app/pages/service/out.service';

@Component({
  selector: 'app-outs-crud',
  templateUrl: './outs-crud.component.html',
  styleUrls: ['./outs-crud.component.scss']
})
export class OutsCrudComponent {


    @Output() totalOutsChanged = new EventEmitter<number>();
    @Output() outsChanged = new EventEmitter<Out[]>();

    entryDialog: boolean = false;

    deleteProductDialog: boolean = false;

    deleteOutsDialog: boolean = false;

    entries: Out[] = [];

    entry: Out = {};

    selectedOuts: Out[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    categorias = ['Cartão de Crédito', 'Moradia', 'Alimentação', 'Transporte', 'Saúde', 'Educação', 'Lazer e Entretenimento', 'Vestuário e Acessórios'];
    totalOuts: number = 0;
    msgTotalOuts: string = `Valor Total: R$ 0000,00`


    rowsPerPageOptions = [5, 10, 20];

    constructor(private outService: OutService, private messageService: MessageService) { }

    ngOnInit() {
       // this.entryService.getOuts().then(data => this.entries = data);

        this.cols = [
            { field: 'entry', header: 'Out' },
            { field: 'price', header: 'Price' },
            { field: 'category', header: 'Category' },
        ];

        this.mockEntries();

    }

    mockEntries() {
        const mockEntriesValues: Out[] = [
            { "name": "C6", "category": "Cartão de Crédito", "price": 3500, "id": "xRTVJ" },
            { "name": "IPVA", "category": "Transporte", "price": 3500, "id": "5ylbe" },
            { "name": "IPTU", "category": "Moradia", "price": 1400, "id": "5xRpA" }
        ];
         this.entries.push(...mockEntriesValues);
         this.sumOuts();
     }

    openNew() {
        this.entry = {};
        this.submitted = false;
        this.entryDialog = true;
    }

    deleteSelectedOuts() {
        this.deleteOutsDialog = true;
    }

    editProduct(entry: Out) {
        this.entry = { ...entry };
        this.entryDialog = true;
    }

    deleteProduct(entry: Out) {
        this.deleteProductDialog = true;
        this.entry = { ...entry };
    }

    confirmDeleteSelected() {
        this.deleteOutsDialog = false;
        this.entries = this.entries.filter(val => !this.selectedOuts.includes(val));
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Outs Deleted', life: 3000 });
        this.selectedOuts = [];
    }

    confirmDelete() {
        this.deleteProductDialog = false;
        this.entries = this.entries.filter(val => val.id !== this.entry.id);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Out Deleted', life: 3000 });
        this.entry = {};
    }

    hideDialog() {
        this.entryDialog = false;
        this.submitted = false;
    }

    saveProduct() {
        this.submitted = true;

        if (this.entry.name?.trim()) {
            if (this.entry.id) {
                // @ts-ignore
                this.entries[this.findIndexById(this.entry.id)] = this.entry;
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Out Updated', life: 3000 });
            } else {
                this.entry.id = this.createId();
                // @ts-ignore
                this.entries.push(this.entry);
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Out Created', life: 3000 });
            }

            this.entries = [...this.entries];
            this.entryDialog = false;
            this.entry = {};
            this.sumOuts();

        }
    }

    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.entries.length; i++) {
            if (this.entries[i].id === id) {
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

    sumOuts(): number {
        let total = 0;
        for (const entry of this.entries) {
          if (entry.price) {
            total += entry.price;
          }
        }

        this.totalOuts = total;
        this.msgTotalOuts = `Valor Total: ${total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`;

        // Emitir o total e as entradas para o componente pai
        this.totalOutsChanged.emit(total);
        this.outsChanged.emit(this.entries);

        return total;
      }
}

