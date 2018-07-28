import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
@Injectable()
export class UserService {
    constructor(private http: Http) { }
    get(url: string, emailAddress: string): Observable<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let params: URLSearchParams = new URLSearchParams();
        params.set('emailAddress', emailAddress);
        let options = new RequestOptions({ headers: headers, search: params });
        return this.http.get(url + 'validation', options)
            .map((response: Response) => <any>response.json())
            .catch(this.handleError);
    }
    getEmailAddress(url: string, id: number): Observable<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let params: URLSearchParams = new URLSearchParams();
        params.set('organizationId', JSON.stringify(id));
        let options = new RequestOptions({ headers: headers, search: params });
        console.log(options);
        console.log(url + 'user');
        return this.http.get(url + 'user', options)
            .map((response: Response) => <any>response.json())
            .catch(this.handleError);
    }
    post(url: string, model: any): Observable<any> {
        let body = JSON.stringify(model);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(url + 'user', body, options)
            .map((response: Response) => <any>response.json())
            .catch(this.handleError);
    }
    put(url: string, id: number, model: any): Observable<any> {
        let body = JSON.stringify(model);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let params: URLSearchParams = new URLSearchParams();
        params.set('organizationId', JSON.stringify(id));
        let options = new RequestOptions({ headers: headers, search: params });
        return this.http.put(url + 'user', body, options)
            .catch(this.handleError);
    }
    private handleError(error: Response | any) {
        console.error('ApiService::handleError', error);
        return Observable.throw(error);
    }
}