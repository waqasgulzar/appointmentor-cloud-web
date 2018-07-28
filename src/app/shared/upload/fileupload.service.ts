import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
@Injectable()
export class UploadFileService {
    constructor(private http: Http) { }
    post(url: string, file: any): Observable<any> {
        let formData: FormData = new FormData();
        formData.append('uploadFile', file, file.name);
        let headers = new Headers()
        //headers.append('Content-Type', 'json');  
        //headers.append('Accept', 'application/json');  
        let options = new RequestOptions({ headers: headers });  
        return this.http.post(url + 'UploadFileApi', "", options)
            .map((response: Response) => <any>response.json())
            .catch(this.handleError);
    }
    private handleError(error: Response | any) {
        console.error('ApiService::handleError', error);
        return Observable.throw(error);
    }
}