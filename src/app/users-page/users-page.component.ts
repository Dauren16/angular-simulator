import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { UserApiService } from '../services/user-api.service';
import { Observable, tap } from 'rxjs';
import { IUser } from '../interfaces/IUser';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-users-page',
  imports: [AsyncPipe],
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.scss',
})
export class UsersPageComponent implements OnInit {

  userService: UserService = inject(UserService);
  users$: Observable<IUser[]> = this.userService.users$;

  ngOnInit(): void {
    this.userService.loadUsers()
    .pipe(
      tap((users: IUser[]) => this.userService.setUsers(users)),
    ).subscribe();
  }

}
