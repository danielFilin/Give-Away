import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AuthService } from './auth/auth.service';
import { Injectable } from '@angular/core';

@Injectable()

export class ErrorInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
   return next.handle(req).pipe(
     catchError( (error: HttpErrorResponse) => {
      return throwError(error);
     })
   );
  }
}
