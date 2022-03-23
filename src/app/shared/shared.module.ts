import { NgxSpinnerModule } from 'ngx-spinner';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardFormComponent } from './components/card-form/card-form.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { PageComponent } from './components/page/page.component';
import { ModalComponent } from './components/modal/modal.component';



@NgModule({
  declarations: [
    CardFormComponent,
    SpinnerComponent,
    PageComponent,
    ModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgxSpinnerModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    CardFormComponent,
    SpinnerComponent,
    PageComponent,
    ModalComponent
  ]
})
export class SharedModule { }
