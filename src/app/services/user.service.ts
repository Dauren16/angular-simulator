import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, finalize, Observable, of, tap } from 'rxjs';
import { IUser } from '../interfaces/IUser';
import { LoaderService } from './loader.service';
import { UserApiService } from './user-api.service';
import { MessageService } from './message.service';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  
  private userApiService: UserApiService = inject(UserApiService);
  private loaderService: LoaderService = inject(LoaderService);
  private messageService: MessageService = inject(MessageService);
  private localStorageService: LocalStorageService = inject(LocalStorageService);
  
  private readonly USERS_KEY: 'users' = 'users';

  private usersSubject: BehaviorSubject<IUser[]> = new BehaviorSubject<IUser[]>([]);
  users$: Observable<IUser[]> = this.usersSubject.asObservable();

  getUsers(): IUser[] {
    return this.usersSubject.getValue();
  }

  setUsers(users: IUser[]): void {
    this.usersSubject.next(users);
    this.localStorageService.setItem(this.USERS_KEY, users);
  }

  getUsersFromCache(): IUser[] | null {
    return this.localStorageService.getItem<IUser[]>(this.USERS_KEY);
  }

  loadUsers(): Observable<IUser[]> {
    const cachedUsers: IUser[] | null = this.getUsersFromCache();
    
    if(cachedUsers) {
      this.setUsers(cachedUsers);
      return of(cachedUsers);
    }
    
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

  deleteUser(id: number): void {
    const users: IUser[] =  this.usersSubject.getValue()
      .filter((deletedUser: IUser) => deletedUser.id !== id);
    this.setUsers(users);
  }

  addUser(user: IUser): void {
    const users: IUser[] = this.usersSubject.getValue();
    this.setUsers([...users, user]);
  }

}
