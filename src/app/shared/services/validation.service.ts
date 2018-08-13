import { Injectable } from '@angular/core';
import { RestService } from './rest.service';
import * as _model from '../../shared/models/models';
import { HttpClient } from '@angular/common/http';
import { ErrorHandlerService } from '../../shared/services/error-handler.service';
import { Entity } from '../../shared/models/entity';
import { environment } from '../../../environments/environment';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class ValidationService extends RestService<_model.User> {
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
    return `/api/verify`;
  }

  getInstance(): Entity {
    return new _model.User();
  }

  verifyEmail(email) {
    return this.http.get<Entity>(environment.apiUrl + this.getUri() + `/email?emailAddress=${email}`).pipe(
      catchError(this.errorHandler.handleError),
      map((response: Entity) => {
        return this.getInstance().deserialize(response);
      })
    );
  }
}