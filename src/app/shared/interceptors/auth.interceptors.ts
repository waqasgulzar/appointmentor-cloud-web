import { Injectable } from '@angular/core';

import {
  HttpInterceptor,
  HttpEvent,
  HttpRequest,
  HttpHandler,
  HttpEventType
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable()
export class AppointmentorAuthInterceptor implements HttpInterceptor {
  constructor(private spinner: NgxSpinnerService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token: string = localStorage.getItem('token');
    if (token) {
      const cloned = req.clone({
        headers: req.headers.set("Authorization", `Bearer ${token}`)
      });
      return next.handle(cloned);
    }
    else {
      return next.handle(req);
    }
  }
}
