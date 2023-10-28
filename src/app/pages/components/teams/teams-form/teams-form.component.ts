import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ModeService } from 'src/app/pages/service/mode.service';
import { Mode } from 'src/app/pages/shareds/models/mode.interface';
import { Team } from 'src/app/pages/shareds/models/team.interface';
import { AuthServiceService } from '../../auth/auth-service.service';
import { User } from 'src/app/pages/shareds/models/user.model';
import {  Subscription } from 'rxjs';
import { TeamsService } from '../teams.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-teams-form',
  templateUrl: './teams-form.component.html',
  styleUrls: ['./teams-form.component.scss']
})
export class TeamsFormComponent implements OnInit, OnDestroy {

    modes: Mode[];
    teamForm: FormGroup;
    team: Team;
    myUser: Subscription;
    myModes: Subscription;
    loggedInUser: User;

    constructor (
        public messageService: MessageService,
        private modeService: ModeService,
        private fb: FormBuilder,
        private authService: AuthServiceService,
        private teamService: TeamsService,
    ) {
        this.teamForm = this.fb.group({
            name: ['', Validators.required],
            mode: ['', [Validators.required]],


          });
    }

    ngOnInit(): void {
        this.loadModes();
        this.loadLoggedInUser();
    }

    ngOnDestroy(): void {
        if(this.myUser){
        this.myUser.unsubscribe();
        }

        if(this.myModes) {
            this.myModes.unsubscribe();
        }
    }

    loadModes() {
        this.myModes = this.modeService.getAll().subscribe(
            (modes: Mode[]) => {
                this.modes = modes;
            }
        );
    }

    loadLoggedInUser() {
        this.myUser = this.authService.getUser().subscribe(
            (user: User) => {
                this.loggedInUser = user;
            }
        );
    }

    onSubmit() {
        const team: Team = new Team();
        team.team = this.teamForm.get('name').value;
        team.mode_id = this.teamForm.get('mode').value.id;
        team.check = true;

        if (this.loggedInUser) {
            team.user_id = this.loggedInUser.profile_id;
        }

        this.teamService.save(team).subscribe(
            {
                next:  (teamSave: Team) => {

                    this.teamForm.reset();
                    this.messageService.add({ severity: 'success',
                                              summary: 'Successful',
                                              detail: `Time ${teamSave.team} cadastrado, agora peça a confirmação para o administrador para começar a jogar!`,
                                              life: 3000 });



                },
                error: (error: HttpErrorResponse) => {
                    // Lida com erros, como validação de campos ou falhas na API
                    console.error('Erro ao cadastrar:', error);
                    this.messageService.add({ severity: 'error',
                                              summary: 'Falhou!',
                                              detail: `Erro! ${error.error.error}`,
                                              life: 3000 })
                }
            }
        )


    }
}
