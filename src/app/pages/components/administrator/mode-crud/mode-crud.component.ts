import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ModeService } from 'src/app/pages/service/mode.service';
import { Mode } from 'src/app/pages/shareds/models/mode.interface';

@Component({
  selector: 'app-mode-crud',
  templateUrl: './mode-crud.component.html',
  styleUrls: ['./mode-crud.component.scss']
})
export class ModeCrudComponent implements OnInit {

    mode: Mode;
    modes: Mode[];

    modeDialog: boolean = false;

    deleteModeDialog: boolean = false;

    deleteModesDialog: boolean = false;

    selectedModes: Mode[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    constructor(
        private modeService: ModeService,
        private messageService: MessageService
    ) {

    }
    ngOnInit(): void {


        this.cols = [
            { field: 'name', header: 'Modo de Jogo' },

        ];
        this.initModes();
    }

    initModes() {
        this.modeService.getAll().subscribe(
            (modes: Mode[]) => this.modes = modes
        );
    }

    saveMode() {

        if(!this.mode.id){
            this.modeService.save(this.mode).subscribe(
                {
                    next:  (mode: Mode) => {
                        this.modes.push(mode);
                        this.messageService.add({ severity: 'success',
                                                  summary: 'Successful',
                                                  detail: 'Mode save',
                                                  life: 3000 });
                    this.modeDialog = false;
                    this.mode = new Mode();
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
            this.modeService.update(this.mode).subscribe(
                {
                    next: (mode: Mode) => {
                        this.modes.push(mode);
                        this.messageService.add({ severity: 'success',
                                                  summary: 'Successful',
                                                  detail: 'Mode save',
                                                  life: 3000 });

                    this.modeDialog = false;
                    this.mode = new Mode();
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

    editMode(mode: Mode) {
        this.mode = {...mode};
        this.modeDialog = true;
    }

    deleteMode(mode: Mode) {
        this.deleteModeDialog = true;
        this.mode = mode;
    }

    deleteModeSelecteds() {
        this.deleteModesDialog = true;
    }

    confirmDeleteSelected() {
        this.deleteModesDialog = false;
        this.selectedModes.forEach(mode => {
            this.deleteSingle(mode);
        });
        this.modes = this.modes.filter(val => !this.selectedModes.includes(val));
        this.selectedModes = [];
    }

    confirmDelete(){
        this.deleteSingle(this.mode);
        const index = this.modes.findIndex(m => m.id === this.mode.id);
                if (index !== -1) {
                    this.modes.splice(index, 1);
                }
    }

    deleteSingle(mode: Mode) {
        this.modeService.delete(mode.id).subscribe(
            () => {

                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Mode deleted',
                    life: 3000
                });

                this.deleteModeDialog = false;
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


    hideDialog() {
        this.modeDialog = false;
        this.submitted = false;
    }

    openNew() {
        this.mode = new Mode;
        this.submitted = false;
        this.modeDialog = true;
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

}
