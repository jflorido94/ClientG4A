import { ProductsModule } from './../products/products.module';
import { ListProductsComponent } from './../products/list-products/list-products.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';

import { AuthRoutingModule } from './auth-routing.module';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ListComponent } from './list/list.component';
import { ProfileComponent } from './profile/profile.component';
import { EditComponent } from './edit/edit.component';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
    ListComponent,
    ProfileComponent,
    EditComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule,
    ProductsModule
  ],
  exports:[AuthRoutingModule]
})
export class AuthModule { }
