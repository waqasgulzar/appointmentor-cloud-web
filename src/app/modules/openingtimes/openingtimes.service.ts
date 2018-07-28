import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
@Injectable()
export class OpeningTimesService {
    constructor(private http: Http) { }
    get(url: string, id: number): Observable<any> {
        console.log(id);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let params: URLSearchParams = new URLSearchParams();
        params.set('organizationId', JSON.stringify(id));
        let options = new RequestOptions({ headers: headers, search: params });
        return this.http.get(url + 'openingtime', options)
            .map((response: Response) => <any>response.json())
            .catch(this.handleError);
    }
    putOrganization(url: string, organizationId: number, timezoneID: number, currencyID: number): Observable<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let params: URLSearchParams = new URLSearchParams();
        console.log(timezoneID);
        console.log(currencyID);
        params.set('timezoneID', JSON.stringify(timezoneID));
        params.set('currencyID', JSON.stringify(currencyID));
        params.set('organizationId', JSON.stringify(organizationId));
        let options = new RequestOptions({ headers: headers, search: params });
        return this.http.put(url + 'user', "", options)
            .map((response: Response) => <any>response.json())
            .catch(this.handleError);
    }
    getByCategory(url: string, lookupCategory: string): Observable<any> {
        console.log(lookupCategory);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let params: URLSearchParams = new URLSearchParams();
        params.set('lookupCategory', lookupCategory);
        params.set('id', null);
        let options = new RequestOptions({ headers: headers, search: params });
        return this.http.get(url + 'lookup', options)
            .map((response: Response) => <any>response.json())
            .catch(this.handleError);
    }
    getByCategoryId(url: string, id: number, lookupCategory: string): Observable<any> {
        console.log(lookupCategory);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let params: URLSearchParams = new URLSearchParams();
        params.set('lookupCategory', lookupCategory);
        params.set('id', JSON.stringify(id));
        let options = new RequestOptions({ headers: headers, search: params });
        return this.http.get(url + 'lookup', options)
            .map((response: Response) => <any>response.json())
            .catch(this.handleError);
    }
    postOpeningTime(url: string, model: any): Observable<any> {
        let body = JSON.stringify(model);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(url + 'openingtime', body, options)
            .catch(this.handleError);
    }
    putOpeningTime(url: string, model: any): Observable<any> {
        let body = JSON.stringify(model);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.put(url + 'openingtime', body, options)
            .catch(this.handleError);
    }
    private handleError(error: Response | any) {
        console.error('ApiService::handleError', error);
        return Observable.throw(error);
    }
}