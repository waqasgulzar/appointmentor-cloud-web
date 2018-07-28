import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { environment } from '../../../environments/environment';

@Injectable()
export class PaymentService {
  constructor(private http: Http) {}

  Charge(paymentInfo): Observable<any> {
    return this.http.post(environment.apiUrl + 'payment/charge', paymentInfo)
      .map((response: Response) => response.json());
  }
}
