import { Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';

export const routes: Routes = [

  {
    path:'',
    component: LandingComponent
  },
  {
    path:'test',
    loadComponent: () => import('./pages/test/test.component')
  },
  {
    path:'test-constructor',
    loadComponent: () => import('./pages/test/test-constructor/test-constructor.component')
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
  },
  {
    path:"premium",
    children:[
      {
        path:"",
        loadComponent: () => import('./pages/premium/enter_premium/enter_premium.component')
      },
      {
        path:"subscribe_card",
        loadComponent: () => import('./pages/premium/subscribe_card/subscribe_card.component')
      },
      {
        path:"subscribe_operator",
        loadComponent: () => import('./pages/premium/subscribe_operator/subscribe_operator.component')
      }
    ]
  },
  {
    path:'home',
    loadComponent: () => import('./shared/components/layout/base_layout/base_layout.component'),
    children:[
      {
        path:'',
        loadComponent: () => import('./pages/home/home.component')
      },
      {
        path:'yoga',
        loadComponent: () => import('./pages/yoga/yoga.component')
      },

      {
        path:'filter-category',
        loadComponent: () => import('./pages/filter-category/filter-category.component')
      },

      {
        path:'post',
        loadComponent: () => import('./pages/post/post.component')
      },

      {
        path:'audioplayer',
        loadComponent: () => import('./pages/audio-player/audio-player.component')
      },

    ]
  }
];
