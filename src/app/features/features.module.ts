import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    AuthModule,
    ProductsModule
  ]
})
export class FeaturesModule { }
