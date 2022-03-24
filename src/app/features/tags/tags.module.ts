import { SharedModule } from '@shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TagsRoutingModule } from './tags-routing.module';
import { TagsCrudComponent } from './tags-crud/tags-crud.component';


@NgModule({
  declarations: [
    TagsCrudComponent
  ],
  imports: [
    CommonModule,
    TagsRoutingModule,
    SharedModule
  ]
})
export class TagsModule { }
