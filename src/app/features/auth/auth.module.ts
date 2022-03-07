import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';

import { AuthRoutingModule } from './auth-routing.module';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ListComponent } from './list/list.component';
import { ProfileComponent } from './profile/profile.component';
import { EditComponent } from './edit/edit.component';


@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
    ListComponent,
    ProfileComponent,
    EditComponent,
  ],
  imports: [
    AuthRoutingModule,
    SharedModule,
  ],
  exports:[AuthRoutingModule]
})
export class AuthModule { }
