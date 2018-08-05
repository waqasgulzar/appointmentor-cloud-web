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
import { environment } from '../../../../environments/environment.prod';
@Injectable()
export class UserSettingService {
  url = environment.apiUrl;
  constructor(private http: Http) {}
  get(id: number): Observable<any> {
    console.log(id);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let params: URLSearchParams = new URLSearchParams();
    params.set('organizationId', JSON.stringify(id));
    params.set('userId', '0');
    let options = new RequestOptions({ headers: headers, search: params });
    return this.http
      .get(this.url + 'usersetting', options)
      .map((response: Response) => <any>response.json())
      .catch(this.handleError);
  }
  getUserById(userId: number): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let params: URLSearchParams = new URLSearchParams();
    params.set('organizationId', '0');
    params.set('userId', JSON.stringify(userId));
    let options = new RequestOptions({ headers: headers, search: params });
    return this.http
      .get(this.url + 'usersetting', options)
      .map((response: Response) => <any>response.json())
      .catch(this.handleError);
  }
  post(model: any): Observable<any> {
    let body = JSON.stringify(model);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http
      .post(this.url + 'usersetting', body, options)
      .map((response: Response) => <any>response.json())
      .catch(this.handleError);
  }
  put(userId: number, model: any): Observable<any> {
    let body = JSON.stringify(model);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let params: URLSearchParams = new URLSearchParams();
    params.set('userId', JSON.stringify(userId));
    let options = new RequestOptions({ headers: headers, search: params });
    return this.http
      .put(this.url + 'usersetting', body, options)
      .catch(this.handleError);
  }
  delete(userId: number): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let params: URLSearchParams = new URLSearchParams();
    params.set('userId', JSON.stringify(userId));
    let options = new RequestOptions({ headers: headers, search: params });
    return this.http
      .delete(this.url + 'usersetting', options)
      .catch(this.handleError);
  }
  private handleError(error: Response | any) {
    console.error('ApiService::handleError', error);
    return Observable.throw(error);
  }
}
