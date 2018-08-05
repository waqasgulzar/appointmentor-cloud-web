﻿import { Injectable } from '@angular/core';
import {
  Http,
  Response,
  Headers,
  RequestOptions,
  URLSearchParams
} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { environment } from '../../../../environments/environment.prod';
@Injectable()
export class GeneralService {
  url = environment.apiUrl;
  constructor(private http: Http) {}
  put(
    organizationId: number,
    timezoneID: number,
    currencyID: number,
    dateFormat: string,
    calendarIncrement: number
  ): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let params: URLSearchParams = new URLSearchParams();
    params.set('organizationId', JSON.stringify(organizationId));
    params.set('timezoneID', JSON.stringify(timezoneID));
    params.set('currencyID', JSON.stringify(currencyID));
    params.set('dateFormat', dateFormat);
    params.set('calendarIncrement', JSON.stringify(calendarIncrement));
    let options = new RequestOptions({ headers: headers, search: params });
    return this.http
      .put(this.url + 'user', '', options)
      .map((response: Response) => <any>response.json())
      .catch(this.handleError);
  }
  private handleError(error: Response | any) {
    console.error('ApiService::handleError', error);
    return Observable.throw(error);
  }
}
