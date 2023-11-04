import { Component, EventEmitter, Output } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Entry } from 'src/app/pages/api/entry';
import { EntryService } from 'src/app/pages/service/entry.service';

@Component({
  selector: 'app-entries-crud',
  templateUrl: './entries-crud.component.html',
  styleUrls: ['./entries-crud.component.scss']
})
export class EntriesCrudComponent {

    @Output() totalEntriesChanged = new EventEmitter<number>();
    @Output() entriesChanged = new EventEmitter<Entry[]>();

    entryDialog: boolean = false;

    deleteProductDialog: boolean = false;

    deleteEntriesDialog: boolean = false;

    entries: Entry[] = [];

    entry: Entry = {};

    selectedEntries: Entry[] = [];

    submitted: boolean = false;

    cols: any[] = [];



    categorias = ['Salário', 'Renda Extra', 'Investimentos', 'Outros'];
    totalEntries: number = 0;
    msgTotalEntries: string = `Valor Total: R$ 0000,00`


    rowsPerPageOptions = [5, 10, 20];

    constructor(private entryService: EntryService, private messageService: MessageService) { }

    ngOnInit() {
       // this.entryService.getEntries().then(data => this.entries = data);

        this.cols = [
            { field: 'entry', header: 'Entry' },
            { field: 'price', header: 'Price' },
            { field: 'category', header: 'Category' },
        ];

        this.mockEntries();

    }

    mockEntries() {
       const mockEntriesValues: Entry[] = [
            { "name": "Coopersytem", "category": "Salário", "price": 20000, "id": "1ZIta" },
            { "name": "FAB", "category": "Salário", "price": 5000, "id": "IEkO7" },
            { "name": "Controles", "category": "Outros", "price": 300, "id": "IEkO8" },
            { "name": "Casa 01", "category": "Renda Extra", "price": 1300, "id": "IEkO9" }
           ];
        this.entries.push(...mockEntriesValues);
        this.sumEntries();
    }

    openNew() {
        this.entry = {};
        this.submitted = false;
        this.entryDialog = true;
    }

    deleteSelectedEntries() {
        this.deleteEntriesDialog = true;
    }

    editProduct(entry: Entry) {
        this.entry = { ...entry };
        this.entryDialog = true;
    }

    deleteProduct(entry: Entry) {
        this.deleteProductDialog = true;
        this.entry = { ...entry };
    }

    confirmDeleteSelected() {
        this.deleteEntriesDialog = false;
        this.entries = this.entries.filter(val => !this.selectedEntries.includes(val));
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Entries Deleted', life: 3000 });
        this.selectedEntries = [];
    }

    confirmDelete() {
        this.deleteProductDialog = false;
        this.entries = this.entries.filter(val => val.id !== this.entry.id);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Entry Deleted', life: 3000 });
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
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Entry Updated', life: 3000 });
            } else {
                this.entry.id = this.createId();
                // @ts-ignore
                this.entries.push(this.entry);
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Entry Created', life: 3000 });
            }

            this.entries = [...this.entries];
            this.entryDialog = false;
            this.entry = {};
            this.sumEntries();

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

    sumEntries(): number {
        let total = 0;
        for (const entry of this.entries) {
          if (entry.price) {
            total += entry.price;
          }
        }

        this.totalEntries = total;
        this.msgTotalEntries = `Valor Total: ${total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`;

        // Emitir o total e as entradas para o componente pai
        this.totalEntriesChanged.emit(total);
        this.entriesChanged.emit(this.entries);

        return total;
      }
}
