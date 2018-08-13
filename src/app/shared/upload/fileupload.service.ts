//import { Injectable } from '@angular/core';

//import {
//  Http,
//  Response,
//  Headers,
//  RequestOptions,
//  URLSearchParams
//} from '@angular/http';
//import { Observable } from 'rxjs/Observable';
//import 'rxjs/add/operator/map';
//import 'rxjs/add/operator/catch';
//import 'rxjs/add/observable/throw';
//import { environment } from '../../../environments/environment';

//@Injectable()
//export class UploadFileService {
//  url = environment.apiUrl;

//  constructor(private http: Http) {}

//  upload(formData: FormData) {
//    return this.http.post(this.url + 'files/upload/image', formData).map((response: Response) => <any>response.json()).catch(this.handleError);
//  }

//  post(file: any): Observable<any> {
//    let formData: FormData = new FormData();
//    formData.append('uploadFile', file, file.name);
//    let headers = new Headers();

//    let options = new RequestOptions({ headers: headers });
//    return this.http
//      .post(this.url + 'UploadFileApi', '', options)
//      .map((response: Response) => <any>response.json())
//      .catch(this.handleError);
//  }

//  private handleError(error: Response | any) {
//    console.error('ApiService::handleError', error);
//    return Observable.throw(error);
//  }
//}
