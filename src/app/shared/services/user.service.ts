import { Injectable } from '@angular/core';
import { RestService } from './rest.service';
import * as _model from '../../shared/models/models';
import { HttpClient } from '@angular/common/http';
import { ErrorHandlerService } from '../../shared/services/error-handler.service';
import { Entity } from '../../shared/models/entity';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class UserService extends RestService<_model.User> {
  constructor(
    protected httpClient: HttpClient,
    protected errorHandler: ErrorHandlerService
  ) {
    super(httpClient, errorHandler);
  }

  getId(model: _model.User): number {
    return 1;
  }

  getUri(): string {
    return `/api/users`;
  }

  getInstance(): Entity {
    return new _model.User();
  }

  getCurrentUser(): Observable<_model.User> {
    return this.httpClient.get<_model.User>(environment.apiUrl + this.getUri() + '/current').pipe(
      catchError(this.errorHandler.handleError),
      map((response: _model.User) => {
        return response;
      })
    );
  }
}