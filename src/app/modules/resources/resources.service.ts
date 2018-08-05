import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';


@Injectable()
export class ResourcesService {
  url = environment.apiUrl

  constructor(private http: Http) {}

  post(resourceId: number): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let params: URLSearchParams = new URLSearchParams();
    params.set('resourceId', JSON.stringify(resourceId));
    let options = new RequestOptions({ headers: headers, search: params });
    return this.http.post(this.url + 'serviceresource', "", options)
      .map((response: Response) => <any>response.json())
      .catch(this.handleError);
  }

  postResources(model: any): Observable<any> {
    let body = JSON.stringify(model);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.url + 'resource', body, options)
      .map((response: Response) => <any>response.json())
      .catch(this.handleError);
  }

  postServiceResources(model: any): Observable<any> {
    let body = JSON.stringify(model);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.url + 'serviceresource', body, options)
      .catch(this.handleError);
  }

  putResources(id: number, model: any): Observable<any> {
    let body = JSON.stringify(model);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let params: URLSearchParams = new URLSearchParams();
    params.set('resourceId', JSON.stringify(id));
    let options = new RequestOptions({ headers: headers, search: params });
    return this.http.put(this.url + 'resource', body, options)
      .catch(this.handleError);
  }

  deleteResources(id: number): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let params: URLSearchParams = new URLSearchParams();
    params.set('resourceId', JSON.stringify(id));
    let options = new RequestOptions({ headers: headers, search: params });
    return this.http.delete(this.url + 'resource', options)
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
    return this.http.get(this.url + 'service', options)
      .map((response: Response) => <any>response.json())
      .catch(this.handleError);
  }

  getOrgResources(id: number): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let params: URLSearchParams = new URLSearchParams();
    params.set('id', JSON.stringify(id));
    let options = new RequestOptions({ headers: headers, search: params });
    return this.http.get(this.url + 'resource', options)
      .map((response: Response) => <any>response.json())
      .catch(this.handleError);
  }

  getResources(id: number): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let params: URLSearchParams = new URLSearchParams();
    params.set('organizationId', JSON.stringify(id));
    params.set('serviceId', '0');
    params.set('resourceId', '0');
    let options = new RequestOptions({ headers: headers, search: params });
    return this.http.get(this.url + 'resource', options)
      .map((response: Response) => <any>response.json())
      .catch(this.handleError);
  }

  getResourceById(id: number): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let params: URLSearchParams = new URLSearchParams();
    params.set('organizationId', '0');
    params.set('serviceId', '0');
    params.set('resourceId', JSON.stringify(id));
    let options = new RequestOptions({ headers: headers, search: params });
    return this.http.get(this.url + 'resource', options)
      .map((response: Response) => <any>response.json())
      .catch(this.handleError);
  }

  getServicesByResourceId(resourceId: number): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let params: URLSearchParams = new URLSearchParams();
    params.set('organizationId', '0');
    params.set('serviceId', '0');
    params.set('resourceId', JSON.stringify(resourceId));
    let options = new RequestOptions({ headers: headers, search: params });
    return this.http.get(this.url + 'service', options)
      .map((response: Response) => <any>response.json())
      .catch(this.handleError);
  }

  getResourcesByServiceId(serviceId: number): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let params: URLSearchParams = new URLSearchParams();
    params.set('organizationId', '0');
    params.set('serviceId', JSON.stringify(serviceId));
    params.set('resourceId', '0');
    let options = new RequestOptions({ headers: headers, search: params });
    return this.http.get(this.url + 'resource', options)
      .map((response: Response) => <any>response.json())
      .catch(this.handleError);
  }

  private handleError(error: Response | any) {
    console.error('ApiService::handleError', error);
    return Observable.throw(error);
  }
}