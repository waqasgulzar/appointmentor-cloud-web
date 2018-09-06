import { Injectable } from '@angular/core';
import { RestService } from './rest.service';
import * as _model from '../../shared/models/models';
import { HttpClient } from '@angular/common/http';
import { ErrorHandlerService } from '../../shared/services/error-handler.service';
import { Entity } from '../../shared/models/entity';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class PaymentService extends RestService<_model.PaymentInfo> {
  constructor(
    protected httpClient: HttpClient,
    protected errorHandler: ErrorHandlerService
  ) {
    super(httpClient, errorHandler);
  }

  getId(model: _model.PaymentInfo): number {
    return 1;
  }

  getUri(): string {
    return `/api/payment`;
  }

  getInstance(): Entity {
    return new _model.PaymentInfo();
  }

  Charge(model: _model.PaymentInfo): Observable<any> {
    return this.http
      .post(this.getUri() + '/charge', model)
      .pipe(map((response: Response) => response.json()));
  }
}
