import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ListComponent } from './list/list.component';
import { ProfileComponent } from './profile/profile.component';
import { EditComponent } from './edit/edit.component';
import { AuthComponent } from './auth/auth.component';

const routes: Routes = [
  { path: '',
  children: [
    {
      path: 'register',
      component: RegisterComponent
    },
    {
      path: 'login',
      component: LoginComponent
    },
    {
      path: 'users',
      component: ListComponent
    },
    {
      path: 'profile',
      component: ProfileComponent
    },
    {
      path: 'settings',
      component: EditComponent
    },
    {
      path: '**',
      redirectTo: 'login'
    }
  ]}

  // / {
    //   path: '',
    //   pathMatch: 'full',
    //   component: AuthComponent,
    //   children: [
    //     { path: '', pathMatch: 'full' },
    //     {
    //       path: 'register',
    //       component: RegisterComponent,
    //     },
    //     {
    //       path: 'login',
    //       component: LoginComponent,
    //     },
    //     {
    //       path: 'users',
    //       component: ListComponent,
    //     },
    //     {
    //       path: 'profile',
    //       component: ProfileComponent,
    //     },
    //     {
    //       path: 'settings',
    //       component: EditComponent,
    //     },
    //   ],
    // },


  // ,login
  // { path: '/register', component: RegisterComponent },
  // { path: '/login', component: LoginComponent },
  // { path: '/users', component: ListComponent },
  // { path: '/profile', component: ProfileComponent },
  // { path: '/settings', component: EditComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
