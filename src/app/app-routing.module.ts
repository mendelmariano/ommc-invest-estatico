import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './pages/components/notfound/notfound.component';
import { AppLayoutComponent } from "./layout/app.layout.component";
import { AuthGuard } from './core/guards/auth.guard';
import { AuthGuardLogin } from './core/guards/auth-login.guard';
import { canMatchAdminGuard } from './core/guards/can-match-admin.guard';

@NgModule({
    imports: [
        RouterModule.forRoot([
           /*  {
                path: '', component: AppLayoutComponent,
                children: [
                    { path: '', loadChildren: () => import('./demo/components/dashboard/dashboard.module').then(m => m.DashboardModule) },
                    { path: 'uikit', loadChildren: () => import('./demo/components/uikit/uikit.module').then(m => m.UIkitModule) },
                    { path: 'utilities', loadChildren: () => import('./demo/components/utilities/utilities.module').then(m => m.UtilitiesModule) },
                    { path: 'documentation', loadChildren: () => import('./demo/components/documentation/documentation.module').then(m => m.DocumentationModule) },
                    { path: 'blocks', loadChildren: () => import('./demo/components/primeblocks/primeblocks.module').then(m => m.PrimeBlocksModule) },
                    { path: 'pages', loadChildren: () => import('./demo/components/pages/pages.module').then(m => m.PagesModule) }
                ]
            }, */
             {
        path: '', component: AppLayoutComponent,
        canActivate: [AuthGuard], // Aplicar o AuthGuard à rota raiz
        children: [
          { path: '', loadChildren: () => import('./pages/components/dashboard/dashboard.module').then(m => m.DashboardModule) },
          { path: 'administrator', loadChildren: () => import('./pages/components/administrator/administrator.module').then(m => m.AdministratorModule), canMatch: [canMatchAdminGuard] },
          { path: 'users-settings', loadChildren: () => import('./pages/components/users/users.module').then(m => m.UsersModule) },
        ]
      },
      {
        path: 'login',
        loadChildren: () => import('./pages/components/auth/auth.module').then(m => m.AuthModule),
        canActivate: [AuthGuardLogin], // Aplicar o AuthGuardLogin à rota de login
      },
            { path: 'landing', loadChildren: () => import('./pages/components/landing/landing.module').then(m => m.LandingModule) },
            { path: 'register', loadChildren: () => import('./pages/components/auth/register/register.module').then(m => m.RegisterModule) },
            { path: 'notfound', component: NotfoundComponent },
            { path: '**', redirectTo: '/notfound' },
        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
