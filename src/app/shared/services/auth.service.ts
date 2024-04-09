import { Injectable } from '@angular/core';

export enum Roles {

  GUEST = 'guest',
  SUBSCRIBE = 'subscribe',
  REGISTER = 'register'

}

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor() { }

  login(data:any){

    if(data.email == 'subscribe@gmail.com') localStorage.setItem('role',Roles.SUBSCRIBE);
    else if(data.email == 'register@gmail.com') localStorage.setItem('role',Roles.REGISTER);
    else localStorage.setItem('role',Roles.GUEST);

  }
}
