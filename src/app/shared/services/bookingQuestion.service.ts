import { Injectable } from '@angular/core';
import { RestService } from './rest.service';
import * as _model from '../../shared/models/models';
import { HttpClient } from '@angular/common/http';
import { ErrorHandlerService } from '../../shared/services/error-handler.service';
import { Entity } from '../../shared/models/entity';

@Injectable()
export class BookingQuestionService extends RestService<_model.BookingQuestion> {
  constructor(
    protected httpClient: HttpClient,
    protected errorHandler: ErrorHandlerService
  ) {
    super(httpClient, errorHandler);
  }

  getId(model: _model.BookingQuestion): number {
    return 1;
  }

  getUri(): string {
    return `/api/appointments/questions`;
  }

  getInstance(): Entity {
    return new _model.BookingQuestion();
  }
}