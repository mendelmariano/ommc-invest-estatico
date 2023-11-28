import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Category } from 'src/app/pages/api/category';
import { MovementRequest } from 'src/app/pages/api/movement';
import { Out } from 'src/app/pages/api/out';
import { PeriodSearch } from 'src/app/pages/api/patrimony';
import { OutService } from 'src/app/pages/service/out.service';

@Component({
  selector: 'app-outs-crud',
  templateUrl: './outs-crud.component.html',
  styleUrls: ['./outs-crud.component.scss']
})
export class OutsCrudComponent implements OnInit, OnChanges {


    @Output() totalOutsChanged = new EventEmitter<number>();
    @Output() outsChanged = new EventEmitter<Out[]>();

    @Input() categorias: Category[];

    @Input() type_id: number = 2;
    @Input() user_id: string;

    @Input() periodSearch: PeriodSearch;


    outDialog: boolean = false;

    deleteOutDialog: boolean = false;

    deleteOutsDialog: boolean = false;

    outs: Out[] = [];

    out: Out = {};

    selectedOuts: Out[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    totalOuts: number = 0;
    msgTotalOuts: string = `Valor Total: R$ 0000,00`


    rowsPerPageOptions = [5, 10, 20];


    categoriasGastos: Category[];

    constructor(private outService: OutService, private messageService: MessageService) { }

    ngOnInit() {

        this.cols = [
            { field: 'out', header: 'Out' },
            { field: 'price', header: 'Price' },
            { field: 'category', header: 'Category' },
        ];


       // this.getOuts();
       this.getOutsForPeriod(this.periodSearch);

    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['categorias']) {
            this.filtraCategorias();
          }

        if (changes['periodSearch'] && !changes['periodSearch'].firstChange) {
        // A propriedade periodSearch foi alterada, você pode realizar ações aqui
        this.getOutsForPeriod(this.periodSearch);
        }
    }

    filtraCategorias() {
        if(this.categorias){
            this.categoriasGastos = this.categorias.filter(categoria => categoria.type_id === 2);
        }

    }


    getOuts() {
        this.outService.getOuts()
        .then((outsValues: Out[]) => {
            this.outs.push(...outsValues);
            this.sumOuts();
        }
        )

    }

    getOutsForPeriod(period: PeriodSearch) {
        this.outService.getOutsForPeriod(period)
        .then((outsValues: Out[]) => {
            this.outs = outsValues;
            this.sumOuts();
        }
        )

    }

    mockOuts() {
        const mockOutsValues: Out[] = [
            { "name": "C6", "data": new Date("2023-11-07T19:23:37.686Z"),  "category": "Cartão de Crédito", "price": 3500, "id": "xRTVJ" },
            { "name": "IPVA", "data": new Date("2023-11-07T19:23:37.686Z"),  "category": "Transporte", "price": 3500, "id": "5ylbe" },
            { "name": "IPTU", "data": new Date("2023-11-07T19:23:37.686Z"),  "category": "Moradia", "price": 1400, "id": "5xRpA" }
        ];
         this.outs.push(...mockOutsValues);
         this.sumOuts();
     }

    openNew() {
        this.out = {};
        this.out.data = new Date();
        this.submitted = false;
        this.outDialog = true;
    }

    deleteSelectedOuts() {
        this.deleteOutsDialog = true;
        this.sumOuts();
    }

    editOut(out: Out) {

        const categoriaEncontrada = this.categoriasGastos.find(categoria => categoria.name === out.category);

        if (categoriaEncontrada) {
            out.category = categoriaEncontrada.id.toString();
        }

        this.out = { ...out };
        this.outDialog = true;
        this.sumOuts();
    }

    deleteOut(out: Out) {
        this.deleteOutDialog = true;
        this.out = { ...out };
        this.sumOuts();
    }

    confirmDeleteSelected() {
        this.deleteOutsDialog = false;
        this.selectedOuts.map(
            (out: Out) => {
                this.outService.delete(out).then(
                    out => {
                        this.outs = this.outs.filter(val => val.id !== this.out.id);
                        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Gasto Deleted', life: 3000 });
                        this.out = {};
                        this.sumOuts();
                    }
                ).catch(
                    err => {
                        this.messageService.add({ severity: 'danger', summary: 'Erro', detail: 'Erro na execução', life: 3000 });
                    }
                )
            }
        )
        this.outs = this.outs.filter(val => !this.selectedOuts.includes(val));
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Gastos Deleted', life: 3000 });
        this.selectedOuts = [];
        this.sumOuts();
    }

    confirmDelete() {
        this.deleteOutDialog = false;
        this.outService.delete(this.out).then(
            out => {
                this.outs = this.outs.filter(val => val.id !== this.out.id);
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Gasto Deleted', life: 3000 });
                this.out = {};
                this.sumOuts();
            }
        ).catch(
            err => {
                this.messageService.add({ severity: 'danger', summary: 'Erro', detail: 'Erro na execução', life: 3000 });
            }
        )

    }

    hideDialog() {
        this.outDialog = false;
        this.submitted = false;
    }

    saveOut() {
        this.submitted = true;

        if  (this.out.name?.trim() && this.out.category && this.out.price && this.out.data  ) {
            if (this.out.id) {
                const outRequest: MovementRequest = {
                    category_id: +this.out.category,
                    data: this.out.data,
                    description: this.out.description,
                    name: this.out.name,
                    price: this.out.price,
                    type_id: this.type_id,
                    user_id: this.user_id,
                    id: this.out.id,
                }

                this.outService.update(outRequest).then(
                    entrada => {
                        const categoriaEncontrada = this.categoriasGastos.find(categoria => categoria.id === +this.out.category);

                        if (categoriaEncontrada) {
                        this.out.category = categoriaEncontrada.name;
                        }

                        // @ts-ignore
                        this.outs[this.findIndexById(this.out.id)] = entrada;
                        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Gasto atualizado', life: 1000 });
                    });

                const categoriaEncontrada = this.categoriasGastos.find(categoria => categoria.id === +this.out.category);

                if (categoriaEncontrada) {
                this.out.category = categoriaEncontrada.name;
                }
                // @ts-ignore
                this.outs[this.findIndexById(this.out.id)] = this.out;
                this.sumOuts();
            } else {
                const outRequest: MovementRequest = {
                    category_id: +this.out.category,
                    data: this.out.data,
                    description: this.out.description,
                    name: this.out.name,
                    price: this.out.price,
                    type_id: this.type_id,
                    user_id: this.user_id,
                }

                this.outService.createOuts(outRequest).then(
                    entrada => {
                        this.out.id = entrada.id;
                        this.outs.push(entrada);
                        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Gasto criado', life: 3000 });
                        this.sumOuts();
                    }
                )
            }

            this.outs = [...this.outs];
            this.outDialog = false;
            this.out = {};
            this.sumOuts();

        }
    }

    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.outs.length; i++) {
            if (this.outs[i].id === id) {
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
        for (const out of this.outs) {
          if (out.price) {
            total += out.price;
          }
        }

        this.totalOuts = total;
        this.msgTotalOuts = `Valor Total: ${total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`;

        // Emitir o total e as entradas para o componente pai
        this.totalOutsChanged.emit(total);
        this.outsChanged.emit(this.outs);

        return total;
      }
}

