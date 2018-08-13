import { Injectable } from '@angular/core';
import { RestService } from './rest.service';
import * as _model from '../../shared/models/models';
import { HttpClient } from '@angular/common/http';
import { ErrorHandlerService } from '../../shared/services/error-handler.service';
import { Entity } from '../../shared/models/entity';

@Injectable()
export class SmsSettingService extends RestService<_model.SMSSetting> {
  constructor(
    protected httpClient: HttpClient,
    protected errorHandler: ErrorHandlerService
  ) {
    super(httpClient, errorHandler);
  }

  getId(model: _model.SMSSetting): number {
    return 1;
  }

  getUri(): string {
    return `/api/sms`;
  }

  getInstance(): Entity {
    return new _model.SMSSetting();
  }
}