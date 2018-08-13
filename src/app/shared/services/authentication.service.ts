import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';


@Injectable()
export class AuthenticationService {
  private authUrl = environment.apiUrl + '/api/token';

  constructor(private http: HttpClient) {
  }

  login(username: string, password: string): Observable<boolean> {
    let httpOptions = {
      headers: new HttpHeaders({ 'content-Type': 'application/x-www-form-urlencoded' })
    };
    let body = `grant_type=password&userName=${username}&password=${password}`;
    return this.http.post(this.authUrl, body, httpOptions)
      .map(data => {
        if (data && data["access_token"]) {
          localStorage.setItem('token', data["access_token"]);
        }
        return data;
      })
      .catch(this.handleError);
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return token != null;
  }

  getToken(): String {
    var token = localStorage.getItem('token');
    return token ? token : "";
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
  }

  private handleError(error: Response | any) {
    return Observable.throw(error);
  }
}