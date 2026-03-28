import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { UserApiService } from '../services/user-api.service';
import { Observable } from 'rxjs';
import { IUser } from '../interfaces/IUser';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-users-page',
  imports: [AsyncPipe],
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.scss',
})
export class UsersPageComponent implements OnInit {

  usersService: UserService = inject(UserService);
  users$: Observable<IUser[]> = this.usersService.getUsers();

  ngOnInit(): void {
    this.usersService.loadUsers().subscribe()
  }

}
