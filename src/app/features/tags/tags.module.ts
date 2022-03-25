import { SharedModule } from '@shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TagsRoutingModule } from './tags-routing.module';
import { TagsCrudComponent } from './tags-crud/tags-crud.component';
import { TagBadgeComponent } from './tag-badge/tag-badge.component';


@NgModule({
  declarations: [
    TagsCrudComponent,
    TagBadgeComponent
  ],
  imports: [
    CommonModule,
    TagsRoutingModule,
    SharedModule
  ],
  exports: [
    TagBadgeComponent
  ]
})
export class TagsModule { }
