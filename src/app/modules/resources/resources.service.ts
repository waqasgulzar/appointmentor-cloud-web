import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
@Injectable()
export class ResourcesService {
  constructor(private http: Http) { }
  post(url: string, resourceId: number): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let params: URLSearchParams = new URLSearchParams();
    params.set('resourceId', JSON.stringify(resourceId));
    let options = new RequestOptions({ headers: headers, search: params });
    return this.http.post(url + 'serviceresource', "", options)
      .map((response: Response) => <any>response.json())
      .catch(this.handleError);
  }
  postResources(url: string, model: any): Observable<any> {
    let body = JSON.stringify(model);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(url + 'resource', body, options)
      .map((response: Response) => <any>response.json())
      .catch(this.handleError);
  }
  postServiceResources(url: string, model: any): Observable<any> {
    let body = JSON.stringify(model);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(url + 'serviceresource', body, options)
      .catch(this.handleError);
  }
  putResources(url: string, id: number, model: any): Observable<any> {
    let body = JSON.stringify(model);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let params: URLSearchParams = new URLSearchParams();
    params.set('resourceId', JSON.stringify(id));
    let options = new RequestOptions({ headers: headers, search: params });
    return this.http.put(url + 'resource', body, options)
      .catch(this.handleError);
  }
  deleteResources(url: string, id: number): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let params: URLSearchParams = new URLSearchParams();
    params.set('resourceId', JSON.stringify(id));
    let options = new RequestOptions({ headers: headers, search: params });
    return this.http.delete(url + 'resource', options)
      .catch(this.handleError);
  }
  getServices(url: string, id: number): Observable<any> {
    console.log(id);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let params: URLSearchParams = new URLSearchParams();
    params.set('organizationId', JSON.stringify(id));
    params.set('serviceId', '0');
    params.set('resourceId', '0');
    let options = new RequestOptions({ headers: headers, search: params });
    return this.http.get(url + 'service', options)
      .map((response: Response) => <any>response.json())
      .catch(this.handleError);
  }
  getOrgResources(url: string, id: number): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let params: URLSearchParams = new URLSearchParams();
    params.set('id', JSON.stringify(id));
    let options = new RequestOptions({ headers: headers, search: params });
    return this.http.get(url + 'resource', options)
      .map((response: Response) => <any>response.json())
      .catch(this.handleError);
  }
  getResources(url: string, id: number): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let params: URLSearchParams = new URLSearchParams();
    params.set('organizationId', JSON.stringify(id));
    params.set('serviceId', '0');
    params.set('resourceId', '0');
    let options = new RequestOptions({ headers: headers, search: params });
    return this.http.get(url + 'resource', options)
      .map((response: Response) => <any>response.json())
      .catch(this.handleError);
  }
  getResourceById(url: string, id: number): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let params: URLSearchParams = new URLSearchParams();
    params.set('organizationId', '0');
    params.set('serviceId', '0');
    params.set('resourceId', JSON.stringify(id));
    let options = new RequestOptions({ headers: headers, search: params });
    return this.http.get(url + 'resource', options)
      .map((response: Response) => <any>response.json())
      .catch(this.handleError);
  }
  getServicesByResourceId(url: string, resourceId: number): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let params: URLSearchParams = new URLSearchParams();
    params.set('organizationId', '0');
    params.set('serviceId', '0');
    params.set('resourceId', JSON.stringify(resourceId));
    let options = new RequestOptions({ headers: headers, search: params });
    return this.http.get(url + 'service', options)
      .map((response: Response) => <any>response.json())
      .catch(this.handleError);
  }
  getResourcesByServiceId(url: string, serviceId: number): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let params: URLSearchParams = new URLSearchParams();
    params.set('organizationId', '0');
    params.set('serviceId', JSON.stringify(serviceId));
    params.set('resourceId', '0');
    let options = new RequestOptions({ headers: headers, search: params });
    return this.http.get(url + 'resource', options)
      .map((response: Response) => <any>response.json())
      .catch(this.handleError);
  }
  private handleError(error: Response | any) {
    console.error('ApiService::handleError', error);
    return Observable.throw(error);
  }
}