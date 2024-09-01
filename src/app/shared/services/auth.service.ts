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

export interface AuthServiceData {
  loading: boolean,
  userAuth: UserAuth | null,
  role: string | null,
  notifications: Notification[]
}

export interface LinkServiceData {
  link: any
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
    loading: false,
    userAuth: null,
    role: null,
    notifications: []
  });

  #linkData = signal<LinkServiceData>({
    link: []
  });

  #resumenData = signal<any>(null);  // Nueva señal para almacenar el resumen

  public authData = computed(() => this.#authData());
  public linkData = computed(() => this.#linkData());
  public resumenData = computed(() => this.#resumenData());  // Computed para acceder al resumen

  constructor() {
    !this.#authData().role && this.#authData.update(value => ({ ...value, role: localStorage.getItem('role') }));
  }

  login(data: any) {
    this.#authData.update(value => ({ ...value, loading: true }));
    return this.http.post<UserAuth>(`${this.urlApi}/auth/login`, data)
      .pipe(
        tap((data: UserAuth) => {
          this.#authData.update(
            value => ({ ...value, userAuth: data, loading: false, role: data.tier.name })
          );
          if (data?.tier?.name != 'guest') {
            localStorage.setItem('token', data.token);
          }

          localStorage.setItem('name', data.name);
          localStorage.setItem('email', data.email);
          localStorage.setItem('role', data?.tier?.name)
          localStorage.setItem('userId', data.id.toString())
        })
      )
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/auth/login'])
  }

  signup(data: any) {
    this.#authData.update(value => ({ ...value, loading: true }));
    data = { ...data, name: '' }
    return this.http.post<UserAuth>(`${this.urlApi}/users`, data).pipe(tap(() => {
      this.#authData.update(value => ({ ...value, loading: false }));
    }))
  }

  getNotification() {
    const userId = localStorage.getItem('userId')
    if (!userId) return;

    return this.http.get<any>(`${this.urlApi}/notifications/user/${userId}`)
      .subscribe((data) => {
        this.#authData.update(value => ({ ...value, notifications: data.filter((data: any) => !data.read && data) }))
      })
  }

  getCancelar() {
    const userId = localStorage.getItem('userId')
    if (!userId) return;

    return this.http.get<any>(`${this.urlApi}/auth/cancelacion`)
      .subscribe((data) => {
        if (data.operator == 'Digitel') {
          localStorage.clear();
          window.open(`${data.link}`, "_blank");
          this.router.navigate(['/'])
          localStorage.setItem('role', 'guest');
        } else {
          if (data.error === false) {
            this._snackBar.open(data.message, '', {
              duration: 6000,
              horizontalPosition: 'left',
              verticalPosition: 'bottom',
              panelClass: 'snack-green'
            });
            localStorage.clear();
            this.router.navigate(['/'])
            localStorage.setItem('role', 'guest');
          } else {
            this._snackBar.open(data.message, '', {
              duration: 6000,
              horizontalPosition: 'left',
              verticalPosition: 'bottom',
              panelClass: 'snack-red'
            });
          }
        }
      })
  }

  finalLoading() {
    this.#authData.update((data) => ({ ...data, loading: false }))
  }

  clearNotification() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    })
    this.#authData.update((data) => ({ ...data, notifications: [] }));
    this.http.get<any>(`${this.urlApi}/notifications/read/all/user`, { headers: headers }
    ).subscribe()
  }

  isUnLock(item: Post) {
    const tier = item.tier?.name ?? item.tier;
    return tier == Roles.GUEST ||
      (tier == Roles.REGISTER && this.#authData().role != Roles.GUEST) ||
      (tier == Roles.SUBSCRIBE && this.#authData().role == Roles.SUBSCRIBE);
  }

  getResumen(uuidtoken: string) {
    return this.http.get<any>(`${this.urlApi}/guest/resume/bytoken/${uuidtoken}`)
      .pipe(
        tap({
          next: (resumen) => {
            this.#resumenData.set(resumen.content);  // Actualizar la señal con el contenido del resumen
          },
          error: (err) => {
            console.error('Error fetching resumen:', err);
            this.finalLoading();
          }
        })
      );
  }
  
}
