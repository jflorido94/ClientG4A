import { SharedModule } from '@shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatesRoutingModule } from './states-routing.module';
import { StatesCrudComponent } from './states-crud/states-crud.component';


@NgModule({
  declarations: [
    StatesCrudComponent
  ],
  imports: [
    CommonModule,
    StatesRoutingModule,
    SharedModule
  ]
})
export class StatesModule { }
