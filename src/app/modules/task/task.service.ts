import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
@Injectable()
export class TaskService {
    constructor(private http: Http) { }
    get(url: string, id: number): Observable<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let params: URLSearchParams = new URLSearchParams();
        params.set('organizationId', JSON.stringify(id));
        let options = new RequestOptions({ headers: headers, search: params });
        return this.http.get(url + 'task', options)
            .map((response: Response) => <any>response.json())
            .catch(this.handleError);
    }
    post(url: string, model: any): Observable<any> {
        let body = JSON.stringify(model);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(url + 'task', body, options)
            .catch(this.handleError);
    }
    put(url: string, id: number, isComplete: boolean): Observable<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let params: URLSearchParams = new URLSearchParams();
        params.set('taskId', JSON.stringify(id));
        params.set('isComplete', JSON.stringify(isComplete));
        let options = new RequestOptions({ headers: headers, search: params });
        return this.http.put(url + 'task', "", options)
            .catch(this.handleError);
    }
    delete(url: string, id: number): Observable<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let params: URLSearchParams = new URLSearchParams();
        params.set('taskId', JSON.stringify(id));
        let options = new RequestOptions({ headers: headers, search: params });
        return this.http.delete(url + 'task', options)
            .catch(this.handleError);
    }
    private handleError(error: Response | any) {
        console.error('ApiService::handleError', error);
        return Observable.throw(error);
    }
}