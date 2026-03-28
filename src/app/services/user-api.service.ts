import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IUser } from '../interfaces/IUser';

@Injectable({
  providedIn: 'root',
})
export class UserApiService {

  private http: HttpClient = inject(HttpClient);
  private readonly API_URL: string = 'https://jsonplaceholder.typicode.com/users';
  
  getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(this.API_URL);
  }

}
