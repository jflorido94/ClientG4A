import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { TagsModule } from './../tags/tags.module';
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
    TagsModule,
    NgMultiSelectDropDownModule.forRoot()
  ]
})
export class ProductsModule { }
