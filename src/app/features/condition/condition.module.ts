import { SharedModule } from '@shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConditionRoutingModule } from './condition-routing.module';
import { ConditionCrudComponent } from './condition-crud/condition-crud.component';


@NgModule({
  declarations: [
    ConditionCrudComponent
  ],
  imports: [
    CommonModule,
    ConditionRoutingModule,
    SharedModule
  ]
})
export class ConditionModule { }
