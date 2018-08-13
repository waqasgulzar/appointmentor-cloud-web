import { Injectable } from '@angular/core';
import { RestService } from './rest.service';
import * as _model from '../../shared/models/models';
import { HttpClient } from '@angular/common/http';
import { ErrorHandlerService } from '../../shared/services/error-handler.service';
import { Entity } from '../../shared/models/entity';

@Injectable()
export class ForgotPasswordService extends RestService<_model.User> {
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
    return `/api/password/forgot`;
  }

  getInstance(): Entity {
    return new _model.User();
  }
}