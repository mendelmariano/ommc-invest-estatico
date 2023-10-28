import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthServiceService } from 'src/app/pages/components/auth/auth-service.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthServiceService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if(this.authService.hasToken()){
        const token = this.authService.getToken();
        const modifiedReq = request.clone({
            setHeaders: {
              'Authorization': `Bearer ${token}`,
            },
          });

          return next.handle(modifiedReq);
    }
    return next.handle(request);
  }
}
