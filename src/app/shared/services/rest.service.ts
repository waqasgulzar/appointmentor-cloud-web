import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ErrorHandlerService } from './error-handler.service';
import { Entity } from '../models/entity';
import { environment } from '../../../environments/environment';

@Injectable()
export abstract class RestService<T> {
  constructor(
    protected http: HttpClient,
    protected errorHandler: ErrorHandlerService
  ) {}

  abstract getId(model: T): number;
  abstract getUri(): string;
  abstract getInstance(): Entity;

  getAll(): Observable<Entity[]> {
    return this.http.get<Entity[]>(environment.apiUrl + this.getUri()).pipe(
      catchError(this.errorHandler.handleError),
      map((response: Entity[]) => {
        return response.map(item => this.getInstance().deserialize(item));
      })
    );
  }

  get(id: number): Observable<T> {
    return this.http.get<T>(environment.apiUrl + this.getUri() + `/${id}`).pipe(
      catchError(this.errorHandler.handleError),
      map((response: T) => {
        return response;
      })
    );
  }

  search(model: T): Observable<Entity> {
    return this.http
      .post<Entity>(environment.apiUrl + this.getUri() + '/search', model)
      .pipe(
        catchError(this.errorHandler.handleError),
        map((response: Entity) => {
          return this.getInstance().deserialize(response);
        })
      );
  }

  create(model: T): Observable<Entity> {
    return this.http
      .post<Entity>(environment.apiUrl + this.getUri(), model)
      .pipe(
        catchError(this.errorHandler.handleError),
        map((response: Entity) => {
          return this.getInstance().deserialize(response);
        })
      );
  }

  bulk(operation: string, model: Array<T>): Observable<Entity> {
    return this.http
      .post<Entity>(
        environment.apiUrl + this.getUri() + '/bulk/' + operation,
        model
      )
      .pipe(
        catchError(this.errorHandler.handleError),
        map((response: Entity) => {
          return this.getInstance().deserialize(response);
        })
      );
  }

  update(id: number, model: T): Observable<boolean> {
    return this.http
      .put<T>(environment.apiUrl + this.getUri() + `?id=${id}`, model, {
        observe: 'response'
      })
      .pipe(
        catchError(this.errorHandler.handleError),
        map((response: HttpResponse<T>) => {
          return response.status === 200 && response.statusText === 'OK';
        })
      );
  }

  delete(id: number): Observable<boolean> {
    return this.http
      .delete(environment.apiUrl + this.getUri() + `?id=${id}`, {
        observe: 'response'
      })
      .pipe(
        catchError(this.errorHandler.handleError),
        map((response: HttpResponse<T>) => {
          return response.status === 200 && response.statusText === 'OK';
        })
      );
  }
}
