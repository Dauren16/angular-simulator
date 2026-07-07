import { HttpEvent, HttpInterceptorFn, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

export const loggingInterceptor: HttpInterceptorFn = (request, next) => {
  const startTime: number = Date.now();

  return next(request).pipe(
    tap((event: HttpEvent<unknown>): void => {
      if (event instanceof HttpResponse) {
        const duration: number = Date.now() - startTime;
        console.log(`${ request.method } ${ request.url } — ${ event.status } — ${ duration }ms`);
      }
    }),
    catchError((error: HttpErrorResponse) => {
      const duration: number = Date.now() - startTime;
      console.log(`${ request.method } ${ request.url } — ${ error.status ?? 'ERROR' } — ${ duration }ms`);
      return throwError(() => error);
    })
  );
};