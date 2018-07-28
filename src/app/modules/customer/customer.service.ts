import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
@Injectable()
export class CustomerService {
    constructor(private http: Http) { }
    get(url: string, id: number): Observable<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let params: URLSearchParams = new URLSearchParams();
        params.set('organizationId', JSON.stringify(id));
        params.set('customerId', '0');
        let options = new RequestOptions({ headers: headers, search: params });
        return this.http.get(url + 'customer', options)
            .map((response: Response) => <any>response.json())
            .catch(this.handleError);
    }
    getCustomerByFilter(url: string, id: number, firstName: string, lastName: string, emailAddress: string, city: string): Observable<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let params: URLSearchParams = new URLSearchParams();
        params.set('organizationId', JSON.stringify(id));
        params.set('firstName', firstName);
        params.set('lastName', lastName);
        params.set('emailAddress', emailAddress);
        params.set('city', city);
        let options = new RequestOptions({ headers: headers, search: params });
        return this.http.get(url + 'customer', options)
            .map((response: Response) => <any>response.json())
            .catch(this.handleError);
    }
    getCustomerById(url: string, id: number): Observable<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let params: URLSearchParams = new URLSearchParams();
        params.set('organizationId', '0');
        params.set('customerId', JSON.stringify(id));
        let options = new RequestOptions({ headers: headers, search: params });
        return this.http.get(url + 'customer', options)
            .map((response: Response) => <any>response.json())
            .catch(this.handleError);
    }
    postCustomer(url: string, model: any): Observable<any> {
        let body = JSON.stringify(model);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(url + 'customer', body, options)
            .catch(this.handleError);
    }
    putCustomer(url: string, id: number, model: any): Observable<any> {
        let body = JSON.stringify(model);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let params: URLSearchParams = new URLSearchParams();
        params.set('customerId', JSON.stringify(id));
        let options = new RequestOptions({ headers: headers, search: params });
        return this.http.put(url + 'customer', body, options)
            .catch(this.handleError);
    }
    deleteCustomer(url: string, id: number): Observable<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let params: URLSearchParams = new URLSearchParams();
        params.set('customerId', JSON.stringify(id));
        let options = new RequestOptions({ headers: headers, search: params });
        return this.http.delete(url + 'customer', options)
            .catch(this.handleError);
    }
    postEmail(url: string, customerId: number, subject: string, message: string): Observable<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let params: URLSearchParams = new URLSearchParams();
        params.set('customerId', JSON.stringify(customerId));
        params.set('subject', subject);
        params.set('message', message);
        let options = new RequestOptions({ headers: headers, search: params });
        return this.http.post(url + 'customer', "", options)
            .map((response: Response) => <any>response.json())
            .catch(this.handleError);
    }
    private handleError(error: Response | any) {
        console.error('ApiService::handleError', error);
        return Observable.throw(error);
    }
}