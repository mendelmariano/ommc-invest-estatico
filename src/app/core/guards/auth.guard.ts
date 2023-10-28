import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AuthServiceService } from 'src/app/pages/components/auth/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthServiceService, private router: Router) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.authToken.pipe(map(token => {
      if (token) {
        return true;
      } else {
        // Redirecione para a página de login se o usuário não estiver autenticado
        this.router.navigate(['/login']);
        return false;
      }
    }));
  }
}
