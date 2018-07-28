import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
@Injectable()
export class BookingQuestionService {
    constructor(private http: Http) { }
    get(url: string, id: number): Observable<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let params: URLSearchParams = new URLSearchParams();
        params.set('organizationId', JSON.stringify(id));
        params.set('bookingQuestionId', '0');
        let options = new RequestOptions({ headers: headers, search: params });
        return this.http.get(url + 'bookingquestion', options)
            .map((response: Response) => <any>response.json())
            .catch(this.handleError);
    }
    getBookingQuestionById(url: string, id: number): Observable<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let params: URLSearchParams = new URLSearchParams();
        params.set('organizationId', '0');
        params.set('bookingQuestionId', JSON.stringify(id));
        let options = new RequestOptions({ headers: headers, search: params });
        return this.http.get(url + 'bookingquestion', options)
            .map((response: Response) => <any>response.json())
            .catch(this.handleError);
    }
    post(url: string, model: any): Observable<any> {
        let body = JSON.stringify(model);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(url + 'bookingquestion', body, options)
            .catch(this.handleError);
    }
    postQuestion(url: string, bookingQuestionId: number): Observable<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let params: URLSearchParams = new URLSearchParams();
        params.set('bookingQuestionId', JSON.stringify(bookingQuestionId));
        let options = new RequestOptions({ headers: headers, search: params });
        return this.http.post(url + 'questionservice', "", options)
            .map((response: Response) => <any>response.json())
            .catch(this.handleError);
    }
    postQuestionServices(url: string, model: any): Observable<any> {
        let body = JSON.stringify(model);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(url + 'questionservice', body, options)
            .catch(this.handleError);
    }
    put(url: string, id: number, model: any): Observable<any> {
        let body = JSON.stringify(model);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let params: URLSearchParams = new URLSearchParams();
        params.set('bookingQuestionId', JSON.stringify(id));
        let options = new RequestOptions({ headers: headers, search: params });
        return this.http.put(url + 'bookingquestion', body, options)
            .catch(this.handleError);
    }
    delete(url: string, id: number): Observable<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let params: URLSearchParams = new URLSearchParams();
        params.set('bookingQuestionId', JSON.stringify(id));
        let options = new RequestOptions({ headers: headers, search: params });
        return this.http.delete(url + 'bookingquestion', options)
            .catch(this.handleError);
    }
    private handleError(error: Response | any) {
        console.error('ApiService::handleError', error);
        return Observable.throw(error);
    }
}