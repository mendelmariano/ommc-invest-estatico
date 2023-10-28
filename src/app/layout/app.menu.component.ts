import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { AuthServiceService } from '../pages/components/auth/auth-service.service';
import { User } from '../pages/shareds/models/user.model';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];
    profile_id_local: number;

    constructor(public layoutService: LayoutService, private authService: AuthServiceService) { }

    ngOnInit() {
        this.authService.getUser().subscribe(
            (user:User) => {
                this.model = [
                    {
                        label: 'Home',
                        items: [
                            { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/'] }
                        ]
                    },


                    {
                        label: 'Jogar',
                        items: [
                            { label: 'Criar partida', icon: 'pi pi-fw pi-play', routerLink: ['/results/create'] },
                            { label: 'Meus jogos', icon: 'pi pi-fw pi-database', routerLink: ['/results/myList'] },

                        ]
                    },

                    {
                        label: 'Times',
                        items: [
                            { label: 'Criar time', icon: 'pi pi-fw pi-angle-double-down', routerLink: ['/teams/create'] },
                            { label: 'Meus times', icon: 'pi pi-fw pi-users', routerLink: ['/teams/myList'] },

                        ]
                    },

                    {
                        label: 'Campeonatos',
                        items: [
                            { label: 'Lista de Campeonatos', icon: 'pi pi-fw pi-server', routerLink: ['/championships/list'] },
                            { label: 'Meus Campeonatos', icon: 'pi pi-fw pi-verified', routerLink: ['/championships/myList'] },
                            { label: 'Classificação', icon: 'pi pi-fw pi-chart-bar', routerLink: ['/championships/classifications'] },
                        ]
                    },

                ];
                if(user.profile_id === 2){
                    this.model.push(
                        {
                            label: 'Administrador',
                            items: [
                                { label: 'Usuários', icon: 'pi pi-fw pi-user', routerLink: ['/administrator/'] },
                                {
                                    label: 'Campeonatos',
                                    icon: 'pi pi-fw pi-verified',
                                    items: [
                                        {
                                            label: 'Criar',
                                            icon: 'pi pi-fw pi-sign-in',
                                            routerLink: ['/administrator/championship']
                                        },
                                        {
                                            label: 'Liberar participantes',
                                            icon: 'pi pi-fw pi-check',
                                            routerLink: ['/administrator/championship/check']
                                        },
                                    ]
                                },
                                { label: 'Modos de Jogo', icon: 'pi pi-fw pi-server', routerLink: ['/administrator/mode'] },
                                { label: 'Liberar times', icon: 'pi pi-fw pi-check', routerLink: ['/administrator/team/check'] },
                            ]
                        },
                    )
                }
            }
        );

    }
}
