import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, finalize, Observable, of, tap } from 'rxjs';
import { IUser } from '../interfaces/IUser';
import { LoaderService } from './loader.service';
import { UserApiService } from './user-api.service';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  
  private userSubject: BehaviorSubject<IUser[]> = new BehaviorSubject<IUser[]>([]);
  private userApiService: UserApiService = inject(UserApiService);
  private loaderService: LoaderService = inject(LoaderService);
  private messageService: MessageService = inject(MessageService);

  users$: Observable<IUser[]> = this.userSubject.asObservable();

  getUsers(): Observable<IUser[]> {
    return this.users$;
  }

  setUsers(user: IUser[]): void {
    this.userSubject.next(user);
  }

  loadUsers(): Observable<IUser[]> {
    this.loaderService.showLoader(); 
    return this.userApiService.getUsers().pipe(
      catchError(() => {
        this.messageService.showError('Нет пользователей для отображения')
        return of<IUser[]>([])
      }),
      tap(users => this.setUsers(users)),
      finalize(() => this.loaderService.hideLoader())
    );
  }

}
