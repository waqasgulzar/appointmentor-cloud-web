import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
@Injectable()
export class DashboardService {
    constructor(private http: Http) { }
    get(url: string, organizationId: number): Observable<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let params: URLSearchParams = new URLSearchParams();
        params.set('organizationId', JSON.stringify(organizationId));
        let options = new RequestOptions({ headers: headers, search: params });
        return this.http.get(url + 'user', options)
            .map((response: Response) => <any>response.json())
            .catch(this.handleError);
    }
    onSubmit(formData: any) { }
    private handleError(error: Response | any) {
        console.error('ApiService::handleError', error);
        return Observable.throw(error);
    }
}