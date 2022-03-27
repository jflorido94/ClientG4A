import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { SharedModule } from '@shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ListProductsComponent } from './list-products/list-products.component';
import { ProductsCrudComponent } from './products-crud/products-crud.component';
import { ProductCardComponent } from './product-card/product-card.component';


@NgModule({
  declarations: [
    ListProductsComponent,
    ProductsCrudComponent,
    ProductCardComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    SharedModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  exports:[
    ProductCardComponent
  ]
})
export class ProductsModule { }
