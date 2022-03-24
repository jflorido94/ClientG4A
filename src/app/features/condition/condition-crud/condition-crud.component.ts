import { NgxSpinnerService } from 'ngx-spinner';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '@core/services/api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Condition } from './../interfaces/condition';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-condition-crud',
  templateUrl: './condition-crud.component.html',
  styleUrls: ['./condition-crud.component.scss'],
})
export class ConditionCrudComponent implements OnInit {
  item!: Condition;
  list: Condition[] = [];
  editar: boolean = false;

  condition = new FormGroup({
    id:new FormControl(''),
    name: new FormControl('', [Validators.required, Validators.maxLength(30)]),
    colour: new FormControl('', [
      Validators.required,
      Validators.pattern('^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$'),
    ]),
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
    return this.condition.controls;
  }

  getlist() {
    this.spinner.show();
    this.apiS.get('conditions').subscribe({
      next: (data) => {
        this.list = data as Condition[];
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
    this.apiS.get('conditions/'+index).subscribe({
      next: (data) => {
        this.item = data as Condition;
      },
      error: (err) => {
        console.log(err);
        this.spinner.hide();
        this.toastr.error(err.statusText, 'Error!');
      },
      complete: () => {
        this.condition.patchValue({
          id: this.item.id,
          name: this.item.name,
          description: this.item.description,
          colour: this.item.colour,
        });
        this.spinner.hide();
      },
    });
  }

  set(form: Condition) {
    this.spinner.show();
    if (this.editar) {
      this.apiS.post('conditions/'+ form.id, form).subscribe({
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
      this.apiS.post('conditions/', form).subscribe({
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
    this.apiS.delete('conditions/'+index).subscribe({
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

    this.condition.reset;
    this.editar=false
  }
}
