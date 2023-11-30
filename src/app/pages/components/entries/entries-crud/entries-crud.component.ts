import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Category } from 'src/app/pages/api/category';
import { Entry } from 'src/app/pages/api/entry';
import { MovementRequest } from 'src/app/pages/api/movement';
import { PeriodSearch } from 'src/app/pages/api/patrimony';
import { EntryService } from 'src/app/pages/service/entry.service';

@Component({
  selector: 'app-entries-crud',
  templateUrl: './entries-crud.component.html',
  styleUrls: ['./entries-crud.component.scss']
})
export class EntriesCrudComponent implements OnInit, OnChanges {

    @Output() totalEntriesChanged = new EventEmitter<number>();
    @Output() entriesChanged = new EventEmitter<Entry[]>();

    @Input() busca: any;


    @Input() categorias: Category[];

    @Input() type_id: number = 1;
    @Input() user_id: string;

    @Input() periodSearch: PeriodSearch;


    entryDialog: boolean = false;

    deleteEntryDialog: boolean = false;

    deleteEntriesDialog: boolean = false;

    entries: Entry[] = [];

    entry: Entry = {};

    selectedEntries: Entry[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    categoriasReceita: Category[];



    totalEntries: number = 0;
    msgTotalEntries: string = `Valor Total: R$ 0000,00`


    rowsPerPageOptions = [5, 10, 20];

    constructor(private entryService: EntryService, private messageService: MessageService) { }

    ngOnInit() {

        this.cols = [
            { field: 'entry', header: 'Entry' },
            { field: 'price', header: 'Price' },
            { field: 'category', header: 'Category' },
        ];

        this.getEntriesForPeriod(this.periodSearch);


    }


    ngOnChanges(changes: SimpleChanges) {
        if (changes['categorias']) {
            this.filtraCategorias();
          }

        if (changes['periodSearch'] && !changes['periodSearch'].firstChange) {
        // A propriedade periodSearch foi alterada, você pode realizar ações aqui
        this.getEntriesForPeriod(this.periodSearch);
        }
    }

    filtraCategorias() {
        if(this.categorias){
            this.categoriasReceita = this.categorias.filter(categoria => categoria.type_id === 1);
        }

    }

    getEntries() {
        this.entryService.getEntries()
        .then((entriesValues: Entry[]) => {
            this.entries.push(...entriesValues);
            this.sumEntries();
        }
        )

    }

    getEntriesForPeriod(period: PeriodSearch) {
        this.entryService.getEntriesForPeriod(period)
        .then((entriesValues: Entry[]) => {
            this.entries = entriesValues;
            this.sumEntries();
        }
        )

    }

    mockEntries() {
       const mockEntriesValues: Entry[] = [
            { "name": "Coopersytem", "data": new Date("2023-11-07T19:23:37.686Z"), "category": "Salário", "price": 20000, "id": "1ZIta" },
            { "name": "FAB", "data": new Date("2023-11-07T19:23:37.686Z"), "category": "Salário", "price": 5000, "id": "IEkO7" },
            { "name": "Controles", "data": new Date("2023-11-07T19:23:37.686Z"), "category": "Outros", "price": 300, "id": "IEkO8" },
            { "name": "Casa 01", "data": new Date("2023-11-07T19:23:37.686Z"), "category": "Renda Extra", "price": 1300, "id": "IEkO9" }
           ];
        this.entries.push(...mockEntriesValues);
        this.sumEntries();
    }

    openNew() {
        this.entry = {};
        this.entry.data = new Date();
        this.submitted = false;
        this.entryDialog = true;
    }

    deleteSelectedEntries() {
        this.deleteEntriesDialog = true;
    }

    editEntry(entry: Entry) {
        const categoriaEncontrada = this.categoriasReceita.find(categoria => categoria.name === entry.category);

        if (categoriaEncontrada) {
            entry.category = categoriaEncontrada.id.toString();
        }

        this.entry = { ...entry };
        this.entryDialog = true;
        this.sumEntries();
    }

    deleteEntry(entry: Entry) {
        this.deleteEntryDialog = true;
        this.entry = { ...entry };
        this.sumEntries();
    }

    confirmDeleteSelected() {
        this.deleteEntriesDialog = false;
        this.selectedEntries.map(
            (entry: Entry) => {
                this.entryService.delete(entry).then(
                    entry => {
                        this.entries = this.entries.filter(val => val.id !== this.entry.id);
                        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Entry Deleted', life: 3000 });
                        this.entry = {};
                        this.sumEntries();
                    }
                ).catch(
                    err => {
                        this.messageService.add({ severity: 'danger', summary: 'Erro', detail: 'Erro na execução', life: 3000 });
                    }
                )
            }
        );
        this.entries = this.entries.filter(val => !this.selectedEntries.includes(val));
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Entries Deleted', life: 3000 });
        this.selectedEntries = [];
        this.sumEntries();
    }

    confirmDelete() {
        this.deleteEntryDialog = false;
        this.entryService.delete(this.entry).then(
            entry => {
                this.entries = this.entries.filter(val => val.id !== this.entry.id);
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Entry Deleted', life: 3000 });
                this.entry = {};
                this.sumEntries();
            }
        ).catch(
            err => {
                this.messageService.add({ severity: 'danger', summary: 'Erro', detail: 'Erro na execução', life: 3000 });
            }
        )

    }

    hideDialog() {
        this.entryDialog = false;
        this.submitted = false;
    }

    saveEntry() {
        this.submitted = true;


        if (this.entry.name?.trim() && this.entry.category && this.entry.price && this.entry.data  ) {
            if (this.entry.id) {
                const entryRequest: MovementRequest = {
                    category_id: +this.entry.category,
                    data: this.entry.data,
                    description: this.entry.description,
                    name: this.entry.name,
                    price: this.entry.price,
                    type_id: this.type_id,
                    user_id: this.user_id,
                    id: this.entry.id,
                }

                this.entryService.update(entryRequest).then(
                    entrada => {
                        const categoriaEncontrada = this.categoriasReceita.find(categoria => categoria.id === +this.entry.category);

                        if (categoriaEncontrada) {
                        this.entry.category = categoriaEncontrada.name;
                        }

                        // @ts-ignore
                        this.entries[this.findIndexById(this.entry.id)] = entrada;
                        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Entry Updated', life: 3000 });
                    });

                const categoriaEncontrada = this.categoriasReceita.find(categoria => categoria.id === +this.entry.category);

                if (categoriaEncontrada) {
                this.entry.category = categoriaEncontrada.name;
                }

                // @ts-ignore
                this.entries[this.findIndexById(this.entry.id)] = this.entry;
                this.sumEntries();
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Entry Updated', life: 3000 });
            } else {
                const entryRequest: MovementRequest = {
                    category_id: +this.entry.category,
                    data: this.entry.data,
                    description: this.entry.description,
                    name: this.entry.name,
                    price: this.entry.price,
                    type_id: this.type_id,
                    user_id: this.user_id,
                }

                this.entryService.createEntries(entryRequest).then(
                    entrada => {
                        this.entry.id = entrada.id;
                        this.entries.push(entrada);
                        this.sumEntries();
                        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Entry Created', life: 3000 });
                    }
                )
                // this.entry.id = this.createId();
                // @ts-ignore

            }

            this.entries = [...this.entries];
            this.entryDialog = false;
            this.entry = {};
            // this.sumEntries();

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
