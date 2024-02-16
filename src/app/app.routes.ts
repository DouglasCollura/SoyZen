import { Routes } from '@angular/router';
import { AuthComponent } from './pages/auth/auth.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [

  {
    path:'',
    component: HomeComponent
  },
  {
    path:'test',
    loadComponent: () => import('./pages/test/test.component')
  },
  {
    path:'send_test_email',
    loadComponent: () => import('./pages/test/sent_test_email/sent_test_email.component')
  },
  {
    path:'auth',
    children:[
      {
        path:'signup',
        loadComponent: () => import('./pages/auth/signup/signup.component')
      },
      {
        path:'login',
        loadComponent: () => import('./pages/auth/login/login.component')
      },
      {
        path:'account-success',
        loadComponent: () => import('./pages/auth/signup/create_account_success/create_account_success.component')
      }
    ]
  }
];
