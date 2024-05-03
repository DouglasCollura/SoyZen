import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { tap } from 'rxjs';
import { UserAuth } from '@interfaces/user-request.interface';
import { Router } from '@angular/router';
import { Post } from '@interfaces/section_post';

export enum Roles {

  GUEST = 'guest',
  SUBSCRIBE = 'subscribe',
  REGISTER = 'register'

}


export interface AuthServiceData{
  loading:boolean,
  userAuth:UserAuth | null,
  role:string | null
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
    userAuth:null,
    role: null
  });

  public authData = computed(() => this.#authData());

  constructor(){
    !this.#authData().role && this.#authData.update(value=> ({...value, role: localStorage.getItem('role')}));
  }
  // constructor(private http = inject(HttpClient)) { }

  login(data:any){

    if(data?.email){
      if(data.email == 'subscribe@gmail.com') {localStorage.setItem('role',Roles.SUBSCRIBE); localStorage.setItem('phone', '04125459173')}
      else if(data.email == 'register@gmail.com') localStorage.setItem('role',Roles.REGISTER);
      else localStorage.setItem('role',Roles.GUEST);
      return
    }

    this.#authData.update(
      value=> ({...value, loading:true})
    );

    this.http.post<UserAuth>(`${this.urlApi}/auth/login`, data)
    .subscribe(
      (data: UserAuth)=>{
        this.#authData.update(
          _=> ({ userAuth: data , loading:false, role: data.tier.name})
        );
        localStorage.setItem('token', data.token);
        localStorage.setItem('name', data.name);
        localStorage.setItem('role', data.tier.name)
        this.router.navigate(['/home']);
      }
    )

  }

  isUnLock(item:Post){
    return item.tier?.name == Roles.GUEST ||
          (item.tier?.name == Roles.REGISTER && this.#authData().role != Roles.GUEST) ||
            (item.tier?.name == Roles.SUBSCRIBE && this.#authData().role == Roles.SUBSCRIBE);
  }

}
