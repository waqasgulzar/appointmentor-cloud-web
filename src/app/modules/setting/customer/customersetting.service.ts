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
import { environment } from '../../../../environments/environment';
@Injectable()
export class CustomerSettingService {
  url = environment.apiUrl;
  constructor(private http: Http) {}
  get(id: number): Observable<any> {
    console.log(id);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let params: URLSearchParams = new URLSearchParams();
    params.set('organizationId', JSON.stringify(id));
    params.set('customId', '0');
    let options = new RequestOptions({ headers: headers, search: params });
    return this.http
      .get(this.url + 'customersetting', options)
      .map((response: Response) => <any>response.json())
      .catch(this.handleError);
  }
  getCustomFieldById(customId: number): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let params: URLSearchParams = new URLSearchParams();
    params.set('organizationId', '0');
    params.set('customId', JSON.stringify(customId));
    let options = new RequestOptions({ headers: headers, search: params });
    return this.http
      .get(this.url + 'customersetting', options)
      .map((response: Response) => <any>response.json())
      .catch(this.handleError);
  }
  post(model: any): Observable<any> {
    let body = JSON.stringify(model);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http
      .post(this.url + 'customersetting', body, options)
      .map((response: Response) => <any>response.json())
      .catch(this.handleError);
  }
  put(customId: number, model: any): Observable<any> {
    let body = JSON.stringify(model);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let params: URLSearchParams = new URLSearchParams();
    params.set('customId', JSON.stringify(customId));
    let options = new RequestOptions({ headers: headers, search: params });
    return this.http
      .put(this.url + 'customersetting', body, options)
      .catch(this.handleError);
  }
  delete(customId: number): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let params: URLSearchParams = new URLSearchParams();
    params.set('customId', JSON.stringify(customId));
    let options = new RequestOptions({ headers: headers, search: params });
    return this.http
      .delete(this.url + 'customersetting', options)
      .catch(this.handleError);
  }
  private handleError(error: Response | any) {
    console.error('ApiService::handleError', error);
    return Observable.throw(error);
  }
}
