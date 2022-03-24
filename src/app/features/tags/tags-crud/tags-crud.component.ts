import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '@core/services/api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Tags } from './../interfaces/tags';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tags-crud',
  templateUrl: './tags-crud.component.html',
  styleUrls: ['./tags-crud.component.scss']
})
export class TagsCrudComponent implements OnInit {
  item!: Tags;
  list: Tags[] = [];
  editar: boolean = false;

  tag = new FormGroup({
    id:new FormControl(''),
    name: new FormControl('', [Validators.required, Validators.maxLength(30)]),
    colour: new FormControl('', [
      Validators.required,
      Validators.pattern('^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$'),
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
    return this.tag.controls;
  }

  getlist() {
    this.spinner.show();
    this.apiS.get('tags').subscribe({
      next: (data) => {
        this.list = data as Tags[];
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
    this.apiS.get('tags/'+index).subscribe({
      next: (data) => {
        this.item = data as Tags;
      },
      error: (err) => {
        console.log(err);
        this.spinner.hide();
        this.toastr.error(err.statusText, 'Error!');
      },
      complete: () => {
        this.tag.patchValue({
          id: this.item.id,
          name: this.item.name,
          colour: this.item.colour,
        });
        this.spinner.hide();
      },
    });
  }

  set(form: Tags) {
    this.spinner.show();
    if (this.editar) {
      this.apiS.post('tags/'+ form.id, form).subscribe({
        error: (err) => {
          this.spinner.hide();
          for (const key in err.error.errors) {
            this.toastr.error(err.error.errors[key], key);
          }
        },
        complete: () => {
          this.reset();
          this.spinner.hide();
          this.toastr.success('Etiqueta editada correctamente');
          this.getlist();
        },
      });
    } else {
      this.apiS.post('tags/', form).subscribe({
        error: (err) => {
          this.spinner.hide();
          for (const key in err.error.errors) {
            this.toastr.error(err.error.errors[key], key);
          }
        },
        complete: () => {
          this.reset();
          this.spinner.hide();
          this.toastr.success('Etiqueta creada correctamente');
          this.getlist();
        },
      });
    }
  }

  drop(index?:number) {
    if (!index) {
      return
    }
    this.apiS.delete('tags/'+index).subscribe({
      error: (err) => {
        this.spinner.hide();
        for (const key in err.error.errors) {
          this.toastr.error(err.error.errors[key], key);
        }
      },
      complete: () => {
        this.reset();
        this.spinner.hide();
        this.toastr.success('Etiqueta eliminada correctamente');
        this.getlist();
      },
    });
  }

  reset() {
    console.log('reset');

    this.tag.reset;
    this.editar=false
  }
}
