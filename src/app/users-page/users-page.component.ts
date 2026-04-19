import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { UserApiService } from '../services/user-api.service';
import { BehaviorSubject, combineLatest, map, Observable, tap } from 'rxjs';
import { IUser } from '../interfaces/IUser';
import { AsyncPipe } from '@angular/common';
import { UserCardComponent } from "../users/user-card/user-card.component";
import { UserCreateComponent } from "../users/user-create/user-create.component";
import { UsersFilterComponent } from "../users/users-filter/users-filter.component";

@Component({
  selector: 'app-users-page',
  imports: [AsyncPipe, UserCardComponent, UserCreateComponent, UsersFilterComponent],
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.scss',
})
export class UsersPageComponent implements OnInit {

  userService: UserService = inject(UserService);
  users$: Observable<IUser[]> = this.userService.users$;
  filterSubject = new BehaviorSubject<string>('');

  filteredUsers$: Observable<IUser[]> = combineLatest([
    this.userService.users$,
    this.filterSubject.asObservable()
  ]).pipe(
      map(([users, query]: [IUser[], string]) => {
        const trimmed = (query ?? '').trim().toLowerCase();
        return trimmed ? users.filter((user: IUser) => 
          user.name.toLowerCase().includes(trimmed)) : users;
      })
  );


  ngOnInit(): void {
    this.userService.loadUsers()
      .pipe(
        tap((users: IUser[]) => this.userService.setUsers(users)),
      )
      .subscribe();
  }

  onDeleteUser(id: number): void {
    this.userService.deleteUser(id);
  }
  
  onCreateUser(user: IUser): void {
    this.userService.addUser(user);
  }

  onFilterChange(value: string): void {
    this.filterSubject.next(value);
  }
  
}
