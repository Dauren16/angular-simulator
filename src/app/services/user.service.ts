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
  
  private userApiService: UserApiService = inject(UserApiService);
  private loaderService: LoaderService = inject(LoaderService);
  private messageService: MessageService = inject(MessageService);

  private usersSubject: BehaviorSubject<IUser[]> = new BehaviorSubject<IUser[]>([]);
  users$: Observable<IUser[]> = this.usersSubject.asObservable();

  getUsers(): IUser[] {
    return this.usersSubject.getValue();
  }

  setUsers(user: IUser[]): void {
    this.usersSubject.next(user);
  }

  loadUsers(): Observable<IUser[]> { 
    return this.userApiService.getUsers()
      .pipe(
        tap(() => this.loaderService.showLoader()),
        finalize(() => this.loaderService.hideLoader()),
        catchError(() => { 
          this.messageService.showError('Нет пользователей для отображения');
          return of([]);
        }),
      );
  }

}
