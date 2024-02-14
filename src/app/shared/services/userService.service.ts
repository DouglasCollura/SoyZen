import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { User, UserRequest } from '../interfaces/user-request.interface';
import { Observable, map, pipe, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private http = inject(HttpClient);
  private urlApi = environment.apiUrl;


  getUsersById(  id: number): Observable<User>{
    return this.http.get<UserRequest>(`${this.urlApi}/users/${id}`)
    .pipe(
      map(response => response.data),
      tap(console.log),
    )
  }
}
