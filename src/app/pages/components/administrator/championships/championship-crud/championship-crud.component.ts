import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ModeService } from 'src/app/pages/service/mode.service';
import { Championship } from 'src/app/pages/shareds/models/championship.interface';
import { Mode } from 'src/app/pages/shareds/models/mode.interface';
import { ChampionshipService } from '../championship.service';

@Component({
  selector: 'app-championship-crud',
  templateUrl: './championship-crud.component.html',
  styleUrls: ['./championship-crud.component.scss']
})
export class ChampionshipCrudComponent implements OnInit {



    championship: Championship;

    championships: Championship[];

    modes: Mode[];

    championshipDialog: boolean = false;

    deleteChampionshipDialog: boolean = false;

    deleteChampionshipsDialog: boolean = false;

    selectedChampionships: Championship[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    constructor(
        private modeService: ModeService,
        private messageService: MessageService,
        private championshipService: ChampionshipService,
    ) {

    }
    ngOnInit(): void {


        this.cols = [
            { field: 'name', header: 'Modo de Jogo' },

        ];
        this.initModes();
        this.initChampionships();
    }

    initModes() {
        this.modeService.getAll().subscribe(
            (modes: Mode[]) => this.modes = modes
        );
    }

    initChampionships() {
        this.championshipService.listAll().subscribe(
            (championships: Championship[]) => this.championships = championships
        );
    }

    saveChampionship() {

        if(!this.championship.id){
            this.championship.mode_id = this.championship.mode.id;

            this.championshipService.save(this.championship).subscribe(
                {
                    next:  (championship: Championship) => {
                        this.championships.push(championship);
                        this.messageService.add({ severity: 'success',
                                                  summary: 'Successful',
                                                  detail: 'Mode save',
                                                  life: 3000 });
                    this.championshipDialog = false;
                    this.championship = new Championship();
                    this.submitted = true;

                    },
                    error: (error: HttpErrorResponse) => {
                        // Lida com erros, como validação de campos ou falhas na API
                        console.error('Erro ao cadastrar:', error);
                        this.messageService.add({ severity: 'error',
                                                  summary: 'Falhou!',
                                                  detail: `Erro! ${error.error.error}`,
                                                  life: 3000 })
                    }
                });


        }else{
            this.championship.mode_id = this.championship.mode.id;
            this.championshipService.update(this.championship).subscribe(
                {
                    next: (championship: Championship) => {
                        this.messageService.add({ severity: 'success',
                                                  summary: 'Successful',
                                                  detail: 'Mode save',
                                                  life: 3000 });

                    this.championshipDialog = false;
                    this.championship = new Championship();
                    const index = this.championships.findIndex(t => t.id === championship.id);
                    if (index !== -1) {
                    this.championships[index] = championship;
                }
                    this.submitted = true;

                    } ,
                    error: (error: HttpErrorResponse) => {
                        // Lida com erros, como validação de campos ou falhas na API
                        console.error('Erro ao cadastrar:', error);
                        this.messageService.add({ key: 'tst', severity: 'error', summary: 'Falhou!', detail: `Erro! ${error.error.error}` })
                    }
                }

            );


        }



    }

    editChampionship(championship: Championship) {

        this.championship = {...championship};
        this.championshipDialog = true;
    }

    deleteChampionship(championship: Championship) {
        this.deleteChampionshipDialog = true;
        this.championship = championship;
    }

    confirmDelete(){
        this.deleteSingle(this.championship);
        const index = this.championships.findIndex(m => m.id === this.championship.id);
                if (index !== -1) {
                    this.championships.splice(index, 1);
                }
    }

    deleteSingle(championship: Championship) {
        this.championshipService.delete(championship.id).subscribe(
            () => {

                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Campeonato deletado',
                    life: 3000
                });

                this.deleteChampionshipDialog = false;
            },
            error => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Error deleting mode',
                    life: 3000
                });
            }
        );
    }


    deleteChampionshipSelecteds() {
        this.deleteChampionshipsDialog = true;
    }

    confirmDeleteSelected() {
        this.deleteChampionshipsDialog = false;
        this.selectedChampionships.forEach(championship => {
            this.deleteSingle(championship);
        });
        this.championships = this.championships.filter(val => !this.selectedChampionships.includes(val));
        this.selectedChampionships = [];
    }


   /*








    confirmDelete(){
        this.deleteSingle(this.mode);
        const index = this.modes.findIndex(m => m.id === this.mode.id);
                if (index !== -1) {
                    this.modes.splice(index, 1);
                }
    }





     */

    hideDialog() {
        this.championshipDialog = false;
        this.submitted = false;
    }

    openNew() {
        this.championship = new Championship;
        this.submitted = false;
        this.championshipDialog = true;
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

}
