import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthenticationService {
  private authUrl = environment.apiUrl + '/api/token';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<boolean> {
    let httpOptions = {
      headers: new HttpHeaders({
        'content-Type': 'application/x-www-form-urlencoded'
      })
    };
    let body = `grant_type=password&userName=${username}&password=${password}`;
    return this.http.post(this.authUrl, body, httpOptions).pipe(
      map((response: any) => {
        if (response && response['access_token']) {
          localStorage.setItem('token', response['access_token']);
        }
        return response;
      })
    );
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return token != null;
  }

  getToken(): String {
    var token = localStorage.getItem('token');
    return token ? token : '';
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
  }

  private handleError(error: Response | any) {
    return Observable.throw(error);
  }
}
