import { Injectable } from '@angular/core';
import { RestService } from './rest.service';
import * as _model from '../../shared/models/models';
import { HttpClient } from '@angular/common/http';
import { ErrorHandlerService } from '../../shared/services/error-handler.service';
import { Entity } from '../../shared/models/entity';
import { environment } from '../../../environments/environment';
import { catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LookupService extends RestService<_model.User> {
  
  
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
    return `/api/lookups`;
  }

  getInstance(): Entity {
    return new _model.User();
  }

  load(category: string): Observable<_model.Lookup> {
    return this.http.get<_model.Lookup>(environment.apiUrl + this.getUri() + `?lookupCategory=${category}`).pipe(
      catchError(this.errorHandler.handleError),
      map((response: _model.Lookup) => {
        return response;
      })
    );
  }

  static openingTimes(id): any {
    return [
      { "openingId": 0, "organizationId": id, "dayId": 1, "openingTime": "09:00:00", "closingTime": "18:00:00", "isOpen": true, "isDeleted": false },
      { "openingId": 0, "organizationId": id, "dayId": 2, "openingTime": "09:00:00", "closingTime": "18:00:00", "isOpen": true, "isDeleted": false },
      { "openingId": 0, "organizationId": id, "dayId": 3, "openingTime": "09:00:00", "closingTime": "18:00:00", "isOpen": true, "isDeleted": false },
      { "openingId": 0, "organizationId": id, "dayId": 4, "openingTime": "09:00:00", "closingTime": "18:00:00", "isOpen": true, "isDeleted": false },
      { "openingId": 0, "organizationId": id, "dayId": 5, "openingTime": "09:00:00", "closingTime": "18:00:00", "isOpen": true, "isDeleted": false },
      { "openingId": 0, "organizationId": id, "dayId": 6, "openingTime": "09:00:00", "closingTime": "18:00:00", "isOpen": false, "isDeleted": false },
      { "openingId": 0, "organizationId": id, "dayId": 7, "openingTime": "09:00:00", "closingTime": "18:00:00", "isOpen": false, "isDeleted": false }];
  }

}