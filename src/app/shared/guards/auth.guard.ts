import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('token');
  const urlTreeReturn = router.createUrlTree(['/'])

  if(!!token){
    return true;
  }
  else{
    return urlTreeReturn
  }
}

export const unauthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('token');
  const urlTreeReturn = router.createUrlTree(['/home'])

  if(!!!token){
    return true;
  }
  else{
    return urlTreeReturn
  }
}
