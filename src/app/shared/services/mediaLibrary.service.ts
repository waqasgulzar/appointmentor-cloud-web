import { Injectable } from '@angular/core';
import { RestService } from './rest.service';
import * as _model from '../../shared/models/models';
import { HttpClient } from '@angular/common/http';
import { ErrorHandlerService } from '../../shared/services/error-handler.service';
import { Entity } from '../../shared/models/entity';
import { environment } from '../../../environments/environment';
import { catchError, map } from 'rxjs/operators';

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

  upload(formData: FormData) {
    return this.http.post<Entity>(environment.apiUrl + this.getUri(), formData).pipe(
      catchError(this.errorHandler.handleError),
      map((response: Entity) => {
        return this.getInstance().deserialize(response);
      })
    );
  }

  private handleError(error: Response | any) {
    console.error('File Uploading Error: ', error);
    return error;
  }
}