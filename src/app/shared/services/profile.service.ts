import { Injectable } from '@angular/core';
import { RestService } from './rest.service';
import * as _model from '../../shared/models/models';
import { HttpClient } from '@angular/common/http';
import { ErrorHandlerService } from '../../shared/services/error-handler.service';
import { Entity } from '../../shared/models/entity';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ProfileService extends RestService<_model.Profile> {

  constructor(
    protected httpClient: HttpClient,
    protected errorHandler: ErrorHandlerService
  ) {
    super(httpClient, errorHandler);
  }

  getId(model: _model.Profile): number {
    return 1;
  }

  getUri(): string {
    return `/api/profile`;
  }

  getInstance(): Entity {
    return new _model.Profile();
  }

  getCredentials(): Observable<_model.ApiCredential> {
    return this.httpClient.get<_model.ApiCredential>(environment.apiUrl + this.getUri() + '/apicredentials').pipe(
      catchError(this.errorHandler.handleError),
      map((response: _model.ApiCredential) => {
        return response;
      })
    );
  }

  private handleError(error: Response | any) {
    console.error(error);
    return error;
  }
}