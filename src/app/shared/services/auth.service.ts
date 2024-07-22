import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { tap } from 'rxjs';
import { UserAuth } from '@interfaces/user-request.interface';
import { Router } from '@angular/router';
import { Post } from '@interfaces/post';
import { MatSnackBar } from '@angular/material/snack-bar';

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
export interface LinkServiceData{

  link:any
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {


  private http = inject(HttpClient);
  private router = inject(Router);
  private urlApi = environment.apiUrl;
  private _snackBar = inject(MatSnackBar);
  private token = localStorage.getItem('token');


  #authData = signal<AuthServiceData>({
    loading:false,
    userAuth:null,
    role: null,
    notifications: []
  });

  #linkData = signal<LinkServiceData>({

    link: []
  });

  public authData = computed(() => this.#authData());
  public linkData = computed(() => this.#linkData());

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
        if(data?.tier?.name!='guest'){
          localStorage.setItem('token', data.token);
        }

        localStorage.setItem('name', data.name);
        localStorage.setItem('email', data.email);
        localStorage.setItem('role', data?.tier?.name)
        localStorage.setItem('userId', data.id.toString())
       })
    )

  }

  signup(data:any){

    this.#authData.update(
      value=> ({...value, loading:true})
    );
    data = {...data, name:''}
    return this.http.post<UserAuth>(`${this.urlApi}/users`, data).pipe(tap(()=>{
      this.#authData.update(
        value=> ({...value, loading:false})
      );
    }))
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
      this.#authData.update(value=> ({...value, notifications:data}))

    })

  }

  getCancelar(){
    const userId = localStorage.getItem('userId')
    if(!userId) return;

    return this.http.get<any>(`${this.urlApi}/auth/cancelacion`)
    .subscribe((data)=>{
      // this.#linkData.update(value=> ({...value, link:data}))
      if(data.operator=='Digitel'){
        localStorage.clear();
        window.open(`${data.link}`, "_blank");
        this.router.navigate(['/'])
        localStorage.setItem('role', 'guest');
      }else{
      if(data.error===false){

        this._snackBar.open(data.message, '', {
          duration:3000,
          horizontalPosition: 'left',
          verticalPosition: 'bottom',
          panelClass:'snack-green'
        });
        localStorage.clear();
        // window.open(`${link}`, "_blank");
        this.router.navigate(['/'])
        localStorage.setItem('role', 'guest');

      }else{
        this._snackBar.open(data.message, '', {
          duration:3000,
          horizontalPosition: 'left',
          verticalPosition: 'bottom',
          panelClass:'snack-red'
        });
      }
    }



    })

  }

  finalLoading(){
    this.#authData.update((data)=> ({...data, loading:false}))
  }

  clearNotification(){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    })
    this.#authData.update((data)=> ({...data, notifications:[]}));
    this.http.delete<any>(`${this.urlApi}/notifications/read/all/user`,{ headers: headers}
    ).subscribe()
  }

  isUnLock(item:Post){
    const tier = item.tier?.name ?? item.tier;
    return tier == Roles.GUEST ||
          (tier == Roles.REGISTER && this.#authData().role != Roles.GUEST) ||
            (tier == Roles.SUBSCRIBE && this.#authData().role == Roles.SUBSCRIBE);
  }

}
