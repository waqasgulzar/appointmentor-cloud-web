import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
@Injectable()
export class AssetService {
    constructor(private http: Http) { }
    get(url: string, id: number): Observable<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let params: URLSearchParams = new URLSearchParams();
        params.set('organizationId', JSON.stringify(id));
        params.set('assetId', '0');
        let options = new RequestOptions({ headers: headers, search: params });
        return this.http.get(url + 'asset', options)
            .map((response: Response) => <any>response.json())
            .catch(this.handleError);
    }
    getAssetById(url: string, id: number): Observable<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let params: URLSearchParams = new URLSearchParams();
        params.set('organizationId', '0');
        params.set('assetId', JSON.stringify(id));
        let options = new RequestOptions({ headers: headers, search: params });
        return this.http.get(url + 'asset', options)
            .map((response: Response) => <any>response.json())
            .catch(this.handleError);
    }
    post(url: string, assetId: number): Observable<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let params: URLSearchParams = new URLSearchParams();
        params.set('assetId', JSON.stringify(assetId));
        let options = new RequestOptions({ headers: headers, search: params });
        return this.http.post(url + 'assetservice', "", options)
            .map((response: Response) => <any>response.json())
            .catch(this.handleError);
    }
    postAssets(url: string, model: any): Observable<any> {
        let body = JSON.stringify(model);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(url + 'asset', body, options)
            .map((response: Response) => <any>response.json())
            .catch(this.handleError);
    }
    postAssetServices(url: string, model: any): Observable<any> {
        let body = JSON.stringify(model);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(url + 'assetservice', body, options)
            .catch(this.handleError);
    }
    put(url: string, id: number): Observable<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let params: URLSearchParams = new URLSearchParams();
        params.set('assetId', JSON.stringify(id));
        let options = new RequestOptions({ headers: headers, search: params });
        return this.http.put(url + 'asset', "", options)
            .catch(this.handleError);
    }
    putAssets(url: string, id: number, model: any): Observable<any> {
        let body = JSON.stringify(model);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let params: URLSearchParams = new URLSearchParams();
        params.set('assetId', JSON.stringify(id));
        let options = new RequestOptions({ headers: headers, search: params });
        return this.http.put(url + 'asset', body, options)
            .catch(this.handleError);
    }
    delete(url: string, id: number): Observable<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let params: URLSearchParams = new URLSearchParams();
        params.set('assetId', JSON.stringify(id));
        let options = new RequestOptions({ headers: headers, search: params });
        return this.http.delete(url + 'asset', options)
            .catch(this.handleError);
    }
    private handleError(error: Response | any) {
        console.error('ApiService::handleError', error);
        return Observable.throw(error);
    }
}