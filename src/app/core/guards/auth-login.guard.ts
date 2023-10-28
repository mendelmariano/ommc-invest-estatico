// auth.guard.login.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AuthServiceService } from 'src/app/pages/components/auth/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardLogin implements CanActivate {
  constructor(private authService: AuthServiceService, private router: Router) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.authToken.pipe(map(token => {
      if (token) {
        // O usuário já está autenticado, então redirecione para o dashboard
        this.router.navigate(['/']);
        return false; // Impede que a rota de login seja acessada
      } else {
        return true; // Permite que a rota de login seja acessada
      }
    }));
  }
}
