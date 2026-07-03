import { HttpEvent, HttpInterceptorFn, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export const loggingInterceptor: HttpInterceptorFn = (request,next): Observable<HttpEvent<unknown>> => {
  const startTime: number = Date.now();

  return next(request).pipe(
    tap({
      next: (event: HttpEvent<unknown>): void => {
        if (event instanceof HttpResponse) {
          const duration: number = Date.now() - startTime;
          console.log(`${ request.method } ${ request.url } — ${ event.status } — ${ duration }ms`);
        }
      },
      error: (error: HttpErrorResponse): void => {
        const duration: number = Date.now() - startTime;
        console.log(`${ request.method } ${ request.url } — ${ error.status ?? 'ERROR' } — ${ duration }ms`);
      }
    })
  );
};