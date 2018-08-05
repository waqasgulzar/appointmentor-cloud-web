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
import { environment } from '../../../environments/environment';
@Injectable()
export class ServicesService {
  url = environment.apiUrl;

  constructor(private http: Http) {}
  getByCategory(lookupCategory: string): Observable<any> {
    console.log(lookupCategory);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let params: URLSearchParams = new URLSearchParams();
    params.set('lookupCategory', lookupCategory);
    params.set('id', null);
    let options = new RequestOptions({ headers: headers, search: params });
    return this.http
      .get(this.url + 'lookup', options)
      .map((response: Response) => <any>response.json())
      .catch(this.handleError);
  }
  getByCategoryId(id: number, lookupCategory: string): Observable<any> {
    console.log(lookupCategory);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let params: URLSearchParams = new URLSearchParams();
    params.set('lookupCategory', lookupCategory);
    params.set('id', JSON.stringify(id));
    let options = new RequestOptions({ headers: headers, search: params });
    return this.http
      .get(this.url + 'lookup', options)
      .map((response: Response) => <any>response.json())
      .catch(this.handleError);
  }
  postServices(model: any): Observable<any> {
    let body = JSON.stringify(model);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http
      .post(this.url + 'service', body, options)
      .catch(this.handleError);
  }
  putServices(id: number, model: any): Observable<any> {
    let body = JSON.stringify(model);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let params: URLSearchParams = new URLSearchParams();
    params.set('serviceId', JSON.stringify(id));
    let options = new RequestOptions({ headers: headers, search: params });
    return this.http
      .put(this.url + 'service', body, options)
      .catch(this.handleError);
  }
  deleteServices(id: number): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let params: URLSearchParams = new URLSearchParams();
    params.set('serviceId', JSON.stringify(id));
    let options = new RequestOptions({ headers: headers, search: params });
    return this.http
      .delete(this.url + 'service', options)
      .catch(this.handleError);
  }
  getServices(id: number): Observable<any> {
    console.log(id);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let params: URLSearchParams = new URLSearchParams();
    params.set('organizationId', JSON.stringify(id));
    params.set('serviceId', '0');
    params.set('resourceId', '0');
    let options = new RequestOptions({ headers: headers, search: params });
    return this.http
      .get(this.url + 'service', options)
      .map((response: Response) => <any>response.json())
      .catch(this.handleError);
  }
  getServiceById(id: number): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let params: URLSearchParams = new URLSearchParams();
    params.set('organizationId', '0');
    params.set('serviceId', JSON.stringify(id));
    params.set('resourceId', '0');
    let options = new RequestOptions({ headers: headers, search: params });
    return this.http
      .get(this.url + 'service', options)
      .map((response: Response) => <any>response.json())
      .catch(this.handleError);
  }
  private handleError(error: Response | any) {
    console.error('ApiService::handleError', error);
    return Observable.throw(error);
  }
}
