import { Injectable } from '@angular/core';
import { CustomNGXLoggerService, NGXLogger, NgxLoggerLevel } from 'ngx-logger';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationProperties } from '../interfaces/NotificationProperties';
import { NotificationService } from './notification.service';

@Injectable()
export class ErrorHandlerService {
  Logger: NGXLogger;
  constructor(private loggerService: CustomNGXLoggerService, private notificationService: NotificationService, ) {
    this.Logger = this.loggerService.create({ level: NgxLoggerLevel.ERROR });
  }

  handleError<T>(error: HttpErrorResponse) {
    const errorNotification: NotificationProperties = {
      message: error.error,
      title: 'Server Error'
    };
    this.notificationService.error(errorNotification);
    return error.error || 'Server Error';
  }
}
