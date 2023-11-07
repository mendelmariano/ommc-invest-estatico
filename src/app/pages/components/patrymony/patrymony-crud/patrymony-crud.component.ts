import { Component, EventEmitter, Output } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Patrymony } from 'src/app/pages/api/patrymony';
import { PatrymonyService } from 'src/app/pages/service/patrymony.service';

@Component({
  selector: 'app-patrymony-crud',
  templateUrl: './patrymony-crud.component.html',
  styleUrls: ['./patrymony-crud.component.scss']
})
export class PatrymonyCrudComponent {




    @Output() totalPatrimoniesChanged = new EventEmitter<number>();
    @Output() patrimoniesChanged = new EventEmitter<Patrymony[]>();

    entryDialog: boolean = false;

    deleteProductDialog: boolean = false;

    deletePatrymonysDialog: boolean = false;

    entries: Patrymony[] = [];

    entry: Patrymony = {};

    selectedPatrymonys: Patrymony[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    categorias = ['Imóveis', 'Veículos', 'Investimentos', 'Outro'];
    totalPatrymonys: number = 0;
    msgTotalPatrymonys: string = `Valor Total: R$ 0000,00`


    rowsPerPageOptions = [5, 10, 20];

    constructor(private patrymonyService: PatrymonyService, private messageService: MessageService) { }

    ngOnInit() {
       // this.entryService.getPatrymonys().then(data => this.entries = data);

        this.cols = [
            { field: 'entry', header: 'Patrymony' },
            { field: 'price', header: 'Price' },
            { field: 'category', header: 'Category' },
        ];

        this.mockEntries();

    }

    mockEntries() {
        const mockEntriesValues: Patrymony[] = [
            { "name": "Casa", "category": "Imóveis", "price": 250000, "id": "xRTVJ" },
            { "name": "Carro", "category": "Veículos", "price": 90000, "id": "5ylbe" },
            { "name": "Nubank", "category": "Investimentos", "price": 20000, "id": "5xRpA" },
            { "name": "PagBank", "category": "Investimentos", "price": 20000, "id": "5xRpA" },
        ];
         this.entries.push(...mockEntriesValues);
         this.sumPatrymonys();
     }

    openNew() {
        this.entry = {};
        this.submitted = false;
        this.entryDialog = true;
    }

    deleteSelectedPatrymonys() {
        this.deletePatrymonysDialog = true;
    }

    editProduct(entry: Patrymony) {
        this.entry = { ...entry };
        this.entryDialog = true;
    }

    deleteProduct(entry: Patrymony) {
        this.deleteProductDialog = true;
        this.entry = { ...entry };
    }

    confirmDeleteSelected() {
        this.deletePatrymonysDialog = false;
        this.entries = this.entries.filter(val => !this.selectedPatrymonys.includes(val));
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Patrymonys Deleted', life: 3000 });
        this.selectedPatrymonys = [];
    }

    confirmDelete() {
        this.deleteProductDialog = false;
        this.entries = this.entries.filter(val => val.id !== this.entry.id);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Patrymony Deleted', life: 3000 });
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
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Patrymony Updated', life: 3000 });
            } else {
                this.entry.id = this.createId();
                // @ts-ignore
                this.entries.push(this.entry);
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Patrymony Created', life: 3000 });
            }

            this.entries = [...this.entries];
            this.entryDialog = false;
            this.entry = {};
            this.sumPatrymonys();

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

    sumPatrymonys(): number {
        let total = 0;
        for (const entry of this.entries) {
          if (entry.price) {
            total += entry.price;
          }
        }

        this.totalPatrymonys = total;
        this.msgTotalPatrymonys = `Valor Total: ${total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`;

        // Emitir o total e as entradas para o componente pai
        this.totalPatrimoniesChanged.emit(total);
        this.patrimoniesChanged.emit(this.entries);

        return total;
      }

}
