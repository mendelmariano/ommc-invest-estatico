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

                ];
                if(user.profile_id === 2){
                    this.model.push(
                        {
                            label: 'Administrador',
                            items: [
                                { label: 'Usuários', icon: 'pi pi-fw pi-user', routerLink: ['/administrator/'] },
                            ]
                        },
                    )
                }
            }
        );

    }
}
