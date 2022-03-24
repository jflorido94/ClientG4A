import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from './../../../core/services/api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { States } from './../interfaces/states';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-states-crud',
  templateUrl: './states-crud.component.html',
  styleUrls: ['./states-crud.component.scss']
})
export class StatesCrudComponent implements OnInit {
  item!: States;
  list: States[] = [];
  editar: boolean = false;

  state = new FormGroup({
    id:new FormControl(''),
    name: new FormControl('', [Validators.required, Validators.maxLength(30)]),
    description: new FormControl('', [
      Validators.required,
      Validators.maxLength(4000),
    ]),
  });

  constructor(
    private apiS: ApiService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.getlist();
  }

  //para llamar a los componentes desde el html mas facil
  get form() {
    return this.state.controls;
  }

  getlist() {
    this.spinner.show();
    this.apiS.get('states').subscribe({
      next: (data) => {
        this.list = data as States[];
      },
      error: (err) => {
        console.log(err);
        this.spinner.hide();
        this.toastr.error(err.statusText, 'Error!');
      },
      complete: () => {
        this.spinner.hide();
      },
    });
  }

  get(index?:number) {
    if (!index) {
      return
    }

    this.spinner.show();
    this.editar=true;
    this.apiS.get('states/'+index).subscribe({
      next: (data) => {
        this.item = data as States;
      },
      error: (err) => {
        console.log(err);
        this.spinner.hide();
        this.toastr.error(err.statusText, 'Error!');
      },
      complete: () => {
        this.state.patchValue({
          id: this.item.id,
          name: this.item.name,
          description: this.item.description,
        });
        this.spinner.hide();
      },
    });
  }

  set(form: States) {
    this.spinner.show();
    if (this.editar) {
      this.apiS.post('states/'+ form.id, form).subscribe({
        error: (err) => {
          this.spinner.hide();
          for (const key in err.error.errors) {
            this.toastr.error(err.error.errors[key], key);
          }
        },
        complete: () => {
          this.reset();
          this.spinner.hide();
          this.toastr.success('Estado editado correctamente');
          this.getlist();
        },
      });
    } else {
      this.apiS.post('states/', form).subscribe({
        error: (err) => {
          this.spinner.hide();
          for (const key in err.error.errors) {
            this.toastr.error(err.error.errors[key], key);
          }
        },
        complete: () => {
          this.reset();
          this.spinner.hide();
          this.toastr.success('Estado creado correctamente');
          this.getlist();
        },
      });
    }
  }

  drop(index?:number) {
    if (!index) {
      return
    }
    this.apiS.delete('states/'+index).subscribe({
      error: (err) => {
        this.spinner.hide();
        for (const key in err.error.errors) {
          this.toastr.error(err.error.errors[key], key);
        }
      },
      complete: () => {
        this.reset();
        this.spinner.hide();
        this.toastr.success('Estado eliminado correctamente');
        this.getlist();
      },
    });
  }

  reset() {
    console.log('reset');

    this.state.reset;
    this.editar=false
  }
}
