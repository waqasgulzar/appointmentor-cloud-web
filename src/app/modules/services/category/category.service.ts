import { Injectable } from '@angular/core';

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
export class CategoryService {
  url = environment.apiUrl;

  constructor(private http: Http) { }

  getAll(id: number): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let params: URLSearchParams = new URLSearchParams();
    params.set('organizationId', JSON.stringify(id));
    params.set('categoryId', '0');
    let options = new RequestOptions({ headers: headers, search: params });
    return this.http
      .get(this.url + 'category', options)
      .map((response: Response) => <any>response.json())
      .catch(this.handleError);
  }

  get(id: number): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let params: URLSearchParams = new URLSearchParams();
    params.set('organizationId', '0');
    params.set('categoryId', JSON.stringify(id));
    let options = new RequestOptions({ headers: headers, search: params });
    return this.http
      .get(this.url + 'category', options)
      .map((response: Response) => <any>response.json())
      .catch(this.handleError);
  }

  post(model: any): Observable<any> {
    let body = JSON.stringify(model);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http
      .post(this.url + 'category', body, options)
      .catch(this.handleError);
  }

  put(id: number, model: any): Observable<any> {
    let body = JSON.stringify(model);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let params: URLSearchParams = new URLSearchParams();
    let options = new RequestOptions({ headers: headers, search: params });
    return this.http
      .put(this.url + 'category', body, options)
      .catch(this.handleError);
  }

  delete(id: number): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let params: URLSearchParams = new URLSearchParams();
    params.set('id', JSON.stringify(id));
    let options = new RequestOptions({ headers: headers, search: params });
    return this.http
      .delete(this.url + 'category', options)
      .catch(this.handleError);
  }

  private handleError(error: Response | any) {
    console.error('ApiService::handleError', error);
    return Observable.throw(error);
  }
}
