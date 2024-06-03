import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { tap } from 'rxjs';
import { UserAuth } from '@interfaces/user-request.interface';
import { Router } from '@angular/router';
import { Post } from '@interfaces/post';

export enum Roles {

  GUEST = 'guest',
  SUBSCRIBE = 'subscribe',
  REGISTER = 'register'

}


export interface AuthServiceData{
  loading:boolean,
  userAuth:UserAuth | null,
  role:string | null,
  notifications:Notification[]
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
    role: null,
    notifications: []
  });

  public authData = computed(() => this.#authData());

  constructor(){
    !this.#authData().role && this.#authData.update(value=> ({...value, role: localStorage.getItem('role')}));
  }
  // constructor(private http = inject(HttpClient)) { }

  login(data:any){

    // if(data?.email){
    //   if(data.email == 'subscribe@gmail.com') {localStorage.setItem('role',Roles.SUBSCRIBE); localStorage.setItem('phone', '04125459173')}
    //   else if(data.email == 'register@gmail.com') localStorage.setItem('role',Roles.REGISTER);
    //   else localStorage.setItem('role',Roles.GUEST);
    //   return
    // }

    this.#authData.update(
      value=> ({...value, loading:true})
    );
    return this.http.post<UserAuth>(`${this.urlApi}/auth/login`, data)
    .pipe(
      tap((data: UserAuth)=>{
        this.#authData.update(
          value=> ({ ...value ,userAuth: data , loading:false, role: data.tier.name})
        );
        if(data.tier.name!='guest'){
          localStorage.setItem('token', data.token);
        }

        localStorage.setItem('name', data.name);
        localStorage.setItem('email', data.email);
        localStorage.setItem('role', data.tier.name)
        localStorage.setItem('userId', data.id.toString())
       })
    )

  }

  signup(data:any){

    this.#authData.update(
      value=> ({...value, loading:true})
    );
    data = {...data, name:''}
    return this.http.post<UserAuth>(`${this.urlApi}/users`, data)
    // .pipe(
    //   tap((data: UserAuth)=>{
    //     this.#authData.update(
    //       value=> ({ ...value ,userAuth: data , loading:false, role: data.tier.name})
    //     );
    //     if(data.tier.name!='guest'){
    //       localStorage.setItem('token', data.token);
    //     }

    //     localStorage.setItem('name', data.name);
    //     localStorage.setItem('email', data.email);
    //     localStorage.setItem('role', data.tier.name)
    //     localStorage.setItem('userId', data.id.toString())
    //    })
    // )
  }

  getNotification(){
    const userId = localStorage.getItem('userId')
    if(!userId) return;

    return this.http.get<any>(`${this.urlApi}/notifications/user/${userId}`)
    .subscribe((data)=>{
      console.log(data)
      this.#authData.update(value=> ({...value, notifications:data}))

    })

  }

  finalLoading(){
    this.#authData.update((data)=> ({...data, loading:false}))
  }

  isUnLock(item:Post){
    return item.tier?.name == Roles.GUEST ||
          (item.tier?.name == Roles.REGISTER && this.#authData().role != Roles.GUEST) ||
            (item.tier?.name == Roles.SUBSCRIBE && this.#authData().role == Roles.SUBSCRIBE);
  }

}
