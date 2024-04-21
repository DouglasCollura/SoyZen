import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { tap } from 'rxjs';
import { UserAuth } from '@interfaces/user-request.interface';
import { Router } from '@angular/router';

export enum Roles {

  GUEST = 'guest',
  SUBSCRIBE = 'subscribe',
  REGISTER = 'register'

}


export interface AuthServiceData{
  loading:boolean,
  userAuth:UserAuth | null,
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  
  private http = inject(HttpClient);
  private router = inject(Router);
  private urlApi = environment.apiUrl;


  #authData = signal<AuthServiceData>({
    loading:false,
    userAuth:null
  });

  public authData = computed(() => this.#authData());
  // constructor(private http = inject(HttpClient)) { }

  login(data:any){

    if(data?.email){
      if(data.email == 'subscribe@gmail.com') localStorage.setItem('role',Roles.SUBSCRIBE);
      else if(data.email == 'register@gmail.com') localStorage.setItem('role',Roles.REGISTER);
      else localStorage.setItem('role',Roles.GUEST);
      return
    }

    this.#authData.update(
      value=> ({...value, loading:true})
    );

    this.http.post<UserAuth>(`https://api-dev.soyzen.com/api/v1/auth/login`, data)
    .subscribe(
      (data: UserAuth)=>{
        this.#authData.update(
          _=> ({ userAuth: data , loading:false})
        );
        localStorage.setItem('token', data.token);
        localStorage.setItem('role', data.tier.name)
        this.router.navigate(['/home']);
      }
    )

  }

}
