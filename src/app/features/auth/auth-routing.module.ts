import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ListComponent } from './list/list.component';
import { ProfileComponent } from './profile/profile.component';
import { EditComponent } from './edit/edit.component';

const routes: Routes = [
  { path: '', component: RegisterComponent,
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
  ]}
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
