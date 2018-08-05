import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { environment } from '../../../environments/environment';

@Injectable()
export class AppointmentService {
  constructor(private http: Http) {}

  get(organizationId: number): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let params: URLSearchParams = new URLSearchParams();
    params.set('id', JSON.stringify(organizationId));
    let options = new RequestOptions({ headers: headers, search: params });
    return this.http.get(environment.apiUrl + 'appointment', options)
      .map((response: Response) => <any>response.json())
      .catch(this.handleError);
  }

  post(model: any): Observable<any> {
    let body = JSON.stringify(model);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(environment.apiUrl + 'appointment', body, options)
      .catch(this.handleError);
  }

  private handleError(error: Response | any) {
    console.error('ApiService::handleError', error);
    return Observable.throw(error);
  }
}