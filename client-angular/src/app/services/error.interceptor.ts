import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ObservableInput, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AccountService } from './account.service';
import { AlertService } from './alert.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private accountService: AccountService,
    private alertService: AlertService
  ) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((err) => {
        if (err.status === 401) {
          // auto logout if 401 response returned from backend
          this.accountService.logout();
        }
        if (err.status === 403) {
          // show message if user doesn't have permissions for this request
          this.alertService.error(
            `You don't have permission to access this feature`
          );
        }
        const error = err.error.message || err.statusText;
        return throwError(error);
      })
    );
  }
}
