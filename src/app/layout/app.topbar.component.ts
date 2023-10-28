import { Component, ElementRef, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import { AuthServiceService } from '../pages/components/auth/auth-service.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent {

    items!: MenuItem[];

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    settingsItems: MenuItem[] = [];

    constructor(public layoutService: LayoutService, private authService: AuthServiceService, private router: Router) {
        this.settingsItems = [

            {
                label: 'Atualizar dados', icon: 'pi pi-fw pi-refresh', routerLink: ['/users-settings/edit'],
            },

        ];

    }

    logout() {
        this.authService.logout();
        this.router.navigate(['/login']);
    }

}
