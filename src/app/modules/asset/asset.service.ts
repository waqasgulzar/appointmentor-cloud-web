import { Injectable } from '@angular/core';

import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { environment } from '../../../environments/environment';
@Injectable()
export class AssetService {
  url = environment.apiUrl;
    constructor(private http: Http) { }
    get(id: number): Observable<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let params: URLSearchParams = new URLSearchParams();
        params.set('organizationId', JSON.stringify(id));
        params.set('assetId', '0');
        let options = new RequestOptions({ headers: headers, search: params });
        return this.http.get(this.url + 'asset', options)
            .map((response: Response) => <any>response.json())
            .catch(this.handleError);
    }
    getAssetById(id: number): Observable<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let params: URLSearchParams = new URLSearchParams();
        params.set('organizationId', '0');
        params.set('assetId', JSON.stringify(id));
        let options = new RequestOptions({ headers: headers, search: params });
        return this.http.get(this.url + 'asset', options)
            .map((response: Response) => <any>response.json())
            .catch(this.handleError);
    }
    post(assetId: number): Observable<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let params: URLSearchParams = new URLSearchParams();
        params.set('assetId', JSON.stringify(assetId));
        let options = new RequestOptions({ headers: headers, search: params });
        return this.http.post(this.url + 'assetservice', "", options)
            .map((response: Response) => <any>response.json())
            .catch(this.handleError);
    }
    postAssets(model: any): Observable<any> {
        let body = JSON.stringify(model);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.url + 'asset', body, options)
            .map((response: Response) => <any>response.json())
            .catch(this.handleError);
    }
    postAssetServices(model: any): Observable<any> {
        let body = JSON.stringify(model);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.url + 'assetservice', body, options)
            .catch(this.handleError);
    }
    put(id: number): Observable<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let params: URLSearchParams = new URLSearchParams();
        params.set('assetId', JSON.stringify(id));
        let options = new RequestOptions({ headers: headers, search: params });
        return this.http.put(this.url + 'asset', "", options)
            .catch(this.handleError);
    }
    putAssets(id: number, model: any): Observable<any> {
        let body = JSON.stringify(model);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let params: URLSearchParams = new URLSearchParams();
        params.set('assetId', JSON.stringify(id));
        let options = new RequestOptions({ headers: headers, search: params });
        return this.http.put(this.url + 'asset', body, options)
            .catch(this.handleError);
    }
    delete(id: number): Observable<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let params: URLSearchParams = new URLSearchParams();
        params.set('assetId', JSON.stringify(id));
        let options = new RequestOptions({ headers: headers, search: params });
        return this.http.delete(this.url + 'asset', options)
            .catch(this.handleError);
    }
    private handleError(error: Response | any) {
        console.error('ApiService::handleError', error);
        return Observable.throw(error);
    }
}