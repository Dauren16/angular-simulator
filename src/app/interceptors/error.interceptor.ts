import { HttpEvent, HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { MessageService } from '../services/message.service';

export const errorInterceptor: HttpInterceptorFn = (request, next): Observable<HttpEvent<unknown>> => {
  const messageService: MessageService = inject(MessageService);

  return next(request).pipe(
    catchError((error: HttpErrorResponse) => {
      const isServerError: boolean = error.status >= 500 && error.status < 600;

      if (isServerError) {
        messageService.showError('Произошла ошибка сервера. Попробуйте позже.');
      }

      return throwError(() => error);
    })
  );
};