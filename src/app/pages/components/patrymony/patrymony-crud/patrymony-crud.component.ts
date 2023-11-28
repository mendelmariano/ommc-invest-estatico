import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Category } from 'src/app/pages/api/category';
import { Patrimony, PatrimonyRequest, PeriodSearch } from 'src/app/pages/api/patrimony';
import { Patrymony } from 'src/app/pages/api/patrymony';
import { PatrymonyService } from 'src/app/pages/service/patrymony.service';

@Component({
  selector: 'app-patrymony-crud',
  templateUrl: './patrymony-crud.component.html',
  styleUrls: ['./patrymony-crud.component.scss']
})
export class PatrymonyCrudComponent implements OnInit, OnChanges {




    @Output() totalPatrimoniesChanged = new EventEmitter<number>();
    @Output() patrimoniesChanged = new EventEmitter<Patrymony[]>();

    @Input() categorias: Category[];

    @Input() busca: any;
    @Input() type_id: number = 3;
    @Input() user_id: string;
    @Input() periodSearch: PeriodSearch;

    patrimonyDialog: boolean = false;

    patrimonyDialogUpdate: boolean = false;

    deletePatrimonyDialog: boolean = false;

    desativatePatrimonyDialog: boolean = false;

    deletePatrymonysDialog: boolean = false;

    patrimonies: Patrymony[] = [];

    patrimony: Patrymony = {};

    selectedPatrymonys: Patrymony[] = [];

    submitted: boolean = false;

    categoriasPatrimonios: Category[];

    cols: any[] = [];


    // categorias = ['Imóveis', 'Veículos', 'Investimentos', 'Outro'];
    totalPatrymonys: number = 0;
    msgTotalPatrymonys: string = `Valor Total: R$ 0000,00`


    rowsPerPageOptions = [5, 10, 20];

    constructor(private patrimonyService: PatrymonyService, private messageService: MessageService) { }

    ngOnInit() {
       // this.patrimonyService.getPatrymonys().then(data => this.patrimonies = data);

        this.cols = [
            { field: 'patrimony', header: 'Patrymony' },
            { field: 'price', header: 'Price' },
            { field: 'category', header: 'Category' },
        ];

        // this.getPatromonies();
        this.getPatromoniesForPeriod(this.periodSearch);

    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['categorias']) {
            this.filtraCategorias();
          }

        if (changes['periodSearch'] && !changes['periodSearch'].firstChange) {
        // A propriedade periodSearch foi alterada, você pode realizar ações aqui
        this.getPatromoniesForPeriod(this.periodSearch);
        }
    }

    mockEntries() {
        const mockEntriesValues: Patrymony[] = [
            { "name": "Casa", "data": new Date("2023-11-07T19:23:37.686Z"), "category": "Imóveis", "price": 250000, "id": "xRTVJ" },
            { "name": "Carro", "data": new Date("2023-11-07T19:23:37.686Z"), "category": "Veículos", "price": 90000, "id": "5ylbe" },
            { "name": "Nubank", "data": new Date("2023-11-07T19:23:37.686Z"), "category": "Investimentos", "price": 20000, "id": "5xRpA" },
            { "name": "PagBank", "data": new Date("2023-11-07T19:23:37.686Z"), "category": "Investimentos", "price": 20000, "id": "5xRpA" },
        ];
         this.patrimonies.push(...mockEntriesValues);
         this.sumPatrymonys();
     }


     getPatromonies() {
        this.patrimonyService.getPatromonies()
        .then((patrimoniesValues: Patrimony[]) => {
            this.patrimonies.push(...patrimoniesValues);
            this.sumPatrymonys();
        }
        )

    }

    getPatromoniesForPeriod(period: PeriodSearch) {
        this.patrimonyService.getPatromoniesForPeriod(period)
        .then((patrimoniesValues: Patrimony[]) => {
            this.patrimonies = patrimoniesValues;
            this.sumPatrymonys();
        }
        )

    }

     filtraCategorias() {
        if(this.categorias){
            this.categoriasPatrimonios = this.categorias.filter(categoria => categoria.type_id === 4);
        }

    }

    openNew() {
        this.patrimony = {};
        this.patrimony.data = new Date();
        this.submitted = false;
        this.patrimonyDialog = true;
    }

    deleteSelectedPatrymonys() {
        this.deletePatrymonysDialog = true;
    }

    updatePatrimony(patrimony: Patrymony) {

        const categoriaEncontrada = this.categoriasPatrimonios.find(categoria => categoria.name === patrimony.category);

        if (categoriaEncontrada) {
            patrimony.category = categoriaEncontrada.id.toString();
        }

        this.patrimony = { ...patrimony };
        this.patrimony.data = new Date();
        this.patrimonyDialogUpdate = true;
        this.sumPatrymonys();
    }

    editPatrimony(patrimony: Patrymony) {

        const categoriaEncontrada = this.categoriasPatrimonios.find(categoria => categoria.name === patrimony.category);

        if (categoriaEncontrada) {
            patrimony.category = categoriaEncontrada.id.toString();
        }

        this.patrimony = { ...patrimony };
        this.patrimonyDialog = true;
        this.sumPatrymonys();
    }

    deletePatrimony(patrimony: Patrymony) {
        this.deletePatrimonyDialog = true;
        this.patrimony = { ...patrimony };
        this.sumPatrymonys();
    }

    desativatePatrimony(patrimony: Patrymony) {
        this.desativatePatrimonyDialog = true;
        this.patrimony = { ...patrimony };
        this.sumPatrymonys();
    }

    confirmDeleteSelected() {
        this.deletePatrymonysDialog = false;
        this.selectedPatrymonys.map(
            (patrimony: Patrimony) => {
                this.patrimonyService.delete(patrimony).then(
                    patrimony => {
                        this.patrimonies = this.patrimonies.filter(val => val.id !== this.patrimony.id);
                        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Patrimônio Deletado', life: 1000 });
                        this.patrimony = {};
                        this.sumPatrymonys();
                    }
                ).catch(
                    err => {
                        this.messageService.add({ severity: 'danger', summary: 'Erro', detail: 'Erro na execução', life: 1000 });
                    }
                )
            }
        )
        this.patrimonies = this.patrimonies.filter(val => !this.selectedPatrymonys.includes(val));
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Patrymonys Deleted', life: 1000 });
        this.selectedPatrymonys = [];
    }

    confirmDelete() {
        this.deletePatrimonyDialog = false;
        this.patrimonyService.delete(this.patrimony).then(
            investment => {
                this.patrimonies = this.patrimonies.filter(val => val.id !== this.patrimony.id);
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Patrimônio Deletado', life: 1000 });
                this.patrimony = {};
                this.sumPatrymonys();
            }
        ).catch(
            err => {
                this.messageService.add({ severity: 'danger', summary: 'Erro', detail: 'Erro na execução', life: 1000 });
            }
        )
    }

    confirmDesativated() {
        this.desativatePatrimonyDialog = false;
        this.patrimonyService.desative(this.patrimony).then(
            patrimony => {
                this.patrimonies = this.patrimonies.filter(val => val.id !== this.patrimony.id);
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Patrimônio desativado', life: 1000 });
                this.patrimony = {};
                this.sumPatrymonys();
            }
        ).catch(
            err => {
                this.messageService.add({ severity: 'danger', summary: 'Erro', detail: 'Erro na execução', life: 1000 });
            }
        )
    }

    hideDialog() {
        this.patrimonyDialog = false;
        this.submitted = false;
        this.patrimonyDialogUpdate = false;
    }


    savePatrimony() {
        this.submitted = true;


        if (this.patrimony.name?.trim() && this.patrimony.category && this.patrimony.price && this.patrimony.data  ) {
            if (this.patrimony.id) {
                const patrimonyRequest: PatrimonyRequest = {
                    category_id: +this.patrimony.category,
                    data: this.patrimony.data,
                    description: this.patrimony.description,
                    name: this.patrimony.name,
                    price: this.patrimony.price,
                    type_id: this.type_id,
                    user_id: this.user_id,
                    id: this.patrimony.id,
                    status: 1,
                }

                if(!this.patrimonyDialogUpdate){
                    this.patrimonyService.update(patrimonyRequest).then(
                        entrada => {
                            const categoriaEncontrada = this.categoriasPatrimonios.find(categoria => categoria.id === +this.patrimony.category);

                            if (categoriaEncontrada) {
                            this.patrimony.category = categoriaEncontrada.name;
                            }

                            // @ts-ignore
                            this.patrimonies[this.findIndexById(this.patrimony.id)] = entrada;
                            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Entry Updated', life: 1000 });
                        });
                }else{
                    this.patrimonyService.updatePart(patrimonyRequest).then(
                        entrada => {
                            const categoriaEncontrada = this.categoriasPatrimonios.find(categoria => categoria.id === +this.patrimony.category);

                            if (categoriaEncontrada) {
                            this.patrimony.category = categoriaEncontrada.name;
                            }

                            // @ts-ignore
                            this.patrimonies[this.findIndexById(this.patrimony.id)] = entrada;
                            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Entry Updated', life: 1000 });
                        });
                }


                const categoriaEncontrada = this.categoriasPatrimonios.find(categoria => categoria.id === +this.patrimony.category);

                if (categoriaEncontrada) {
                this.patrimony.category = categoriaEncontrada.name;
                }

                // @ts-ignore
                this.patrimonies[this.findIndexById(this.patrimony.id)] = this.patrimony;
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Entry Updated', life: 1000 });
                this.sumPatrymonys();
            } else {
                const patrimonyRequest: PatrimonyRequest = {
                    category_id: +this.patrimony.category,
                    data: this.patrimony.data,
                    description: this.patrimony.description,
                    name: this.patrimony.name,
                    price: this.patrimony.price,
                    type_id: this.type_id,
                    user_id: this.user_id,
                    status:1,
                }

                this.patrimonyService.createPatrimony(patrimonyRequest).then(
                    entrada => {
                        this.patrimony.id = entrada.id;
                        this.patrimonies.push(entrada);
                        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Entry Created', life: 1000 });
                        this.sumPatrymonys();
                    }
                )
                // this.patrimony.id = this.createId();
                // @ts-ignore

            }

            this.patrimonies = [...this.patrimonies];
            this.patrimonyDialog = false;
            this.patrimonyDialogUpdate = false;
            this.patrimony = {};
            this.sumPatrymonys();

        }
    }

    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.patrimonies.length; i++) {
            if (this.patrimonies[i].id === id) {
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
        for (const patrimony of this.patrimonies) {
          if (patrimony.price) {
            total += patrimony.price;
          }
        }

        this.totalPatrymonys = total;
        this.msgTotalPatrymonys = `Valor Total: ${total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`;

        // Emitir o total e as entradas para o componente pai
        this.totalPatrimoniesChanged.emit(total);
        this.patrimoniesChanged.emit(this.patrimonies);

        return total;
      }

}
