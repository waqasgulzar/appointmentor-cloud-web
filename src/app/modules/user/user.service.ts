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
import { environment } from '../../../environments/environment';
@Injectable()
export class UserService {
  url = environment.apiUrl;
  constructor(private http: Http) {}
  get(emailAddress: string): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let params: URLSearchParams = new URLSearchParams();
    params.set('emailAddress', emailAddress);
    let options = new RequestOptions({ headers: headers, search: params });
    return this.http
      .get(this.url + 'validation', options)
      .map((response: Response) => <any>response.json())
      .catch(this.handleError);
  }
  getEmailAddress(id: number): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let params: URLSearchParams = new URLSearchParams();
    params.set('organizationId', JSON.stringify(id));
    let options = new RequestOptions({ headers: headers, search: params });
    console.log(options);
    console.log(this.url + 'user');
    return this.http
      .get(this.url + 'user', options)
      .map((response: Response) => <any>response.json())
      .catch(this.handleError);
  }
  post(model: any): Observable<any> {
    let body = JSON.stringify(model);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http
      .post(this.url + 'user', body, options)
      .map((response: Response) => <any>response.json())
      .catch(this.handleError);
  }
  put(id: number, model: any): Observable<any> {
    let body = JSON.stringify(model);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let params: URLSearchParams = new URLSearchParams();
    params.set('organizationId', JSON.stringify(id));
    let options = new RequestOptions({ headers: headers, search: params });
    return this.http
      .put(this.url + 'user', body, options)
      .catch(this.handleError);
  }
  private handleError(error: Response | any) {
    console.error('ApiService::handleError', error);
    return Observable.throw(error);
  }
}
