import { Injectable } from '@angular/core';
import { RestService } from './rest.service';
import * as _model from '../../shared/models/models';
import { HttpClient } from '@angular/common/http';
import { ErrorHandlerService } from '../../shared/services/error-handler.service';
import { Entity } from '../../shared/models/entity';

@Injectable()
export class MediaLibraryService extends RestService<_model.MediaLibrary> {
  constructor(
    protected httpClient: HttpClient,
    protected errorHandler: ErrorHandlerService
  ) {
    super(httpClient, errorHandler);
  }

  getId(model: _model.MediaLibrary): number {
    return 1;
  }

  getUri(): string {
    return `/api/medialibrary`;
  }

  getInstance(): Entity {
    return new _model.MediaLibrary();
  }
}
