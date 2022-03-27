
import { Condition } from './../../condition/interfaces/condition';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ApiService } from '@core/services/api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Product } from './../interfaces/product';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products-crud',
  templateUrl: './products-crud.component.html',
  styleUrls: ['./products-crud.component.scss']
})
export class ProductsCrudComponent implements OnInit {
  item!: Product;
  list: Product[] = [];
  editar: boolean = false;
  condlist!: Condition [];
  // tagslist!: Tags [];
  // tags: Tags[] = [];

  // tagsSettings:IDropdownSettings = {
  //   singleSelection: false,
  //   idField: 'id',
  //   textField: 'name',
  //   itemsShowLimit: 3,
  //   allowSearchFilter: false,
  //   enableCheckAll: false,
  //   limitSelection: 3
  // };

  product = new FormGroup({
    id:new FormControl(''),
    title: new FormControl('', [Validators.required, Validators.maxLength(180)]),
    description: new FormControl('', [
      Validators.required,
      Validators.maxLength(4000),
    ]),
    image: new FormControl('', []),
    price: new FormControl('', [Validators.required, Validators.min(0), Validators.max(10000)]),
    condition: new FormControl('', [Validators.required]),
    // tags: new FormControl('', [Validators.required, Validators.maxLength(3)]),
  });

  archivo = {
    tipo: '',
    nombre: '',
    base64textString: '',
  };

  constructor(
    private apiS: ApiService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.getlist();
    this.getcondlist();
    // this.gettagslist();
  }

  //para llamar a los componentes desde el html mas facil
  get form() {
    return this.product.controls;
  }

  getlist() {
    this.spinner.show();
    this.apiS.get('manage').subscribe({
      next: (data) => {
        this.list = data as Product[];

      },
      error: (err) => {
        this.spinner.hide();
        this.toastr.error(err.error.message, 'Error!');
      },
      complete: () => {
        this.spinner.hide();
      },
    });
  }

  getcondlist() {
    this.spinner.show();
    this.apiS.get('conditions').subscribe({
      next: (data) => {
        this.condlist = data as Condition[];

      },
      error: (err) => {
        this.spinner.hide();
        this.toastr.error(err.error.message, 'Error!');
      },
      complete: () => {
        this.spinner.hide();
      },
    });
  }

  // gettagslist() {
  //   this.spinner.show();
  //   this.apiS.get('tags').subscribe({
  //     next: (data) => {
  //       this.tagslist = data as Tags[];

  //     },
  //     error: (err) => {
  //       this.spinner.hide();
  //       this.toastr.error(err.error.message, 'Error!');
  //     },
  //     complete: () => {
  //       this.spinner.hide();
  //     },
  //   });
  // }

  get(index?:number) {
    if (!index) {
      return
    }

    this.spinner.show();
    this.editar=true;
    this.apiS.get('products/'+index).subscribe({
      next: (data) => {
        this.item = data as Product;

        // this.tags=this.item.tags

      },
      error: (err) => {
        this.spinner.hide();
        this.toastr.error(err.error.message, 'Error!');
      },
      complete: () => {
        this.product.patchValue({
          id: this.item.id,
          title: this.item.title,
          description: this.item.description,
          price: this.item.price,
          condition: this.item.condition.id
        });

        this.spinner.hide();
      },
    });
  }

  set(form: Product) {

    form.image = "data:image/png;base64,"+this.archivo!.base64textString;

    this.spinner.show();
    if (this.editar) {
      this.apiS.post('products/'+ form.id, form).subscribe({
        error: (err) => {
          this.spinner.hide();
          for (const key in err.error.errors) {
            this.toastr.error(err.error.errors[key], key);
          }
        },
        complete: () => {
          this.reset();
          this.spinner.hide();
          this.toastr.success('Producto editado correctamente');
          this.getlist();
        },
      });
    } else {
      this.apiS.post('products/', form).subscribe({
        error: (err) => {
          this.spinner.hide();
          for (const key in err.error.errors) {
            this.toastr.error(err.error.errors[key], key);
          }
        },
        complete: () => {
          this.reset();
          this.spinner.hide();
          this.toastr.success('Producto creado correctamente');
          this.getlist();
        },
      });
    }
  }

  drop(index?:number) {
    if (!index) {
      return
    }
    this.apiS.delete('products/'+index).subscribe({
      error: (err) => {
        this.spinner.hide();
        for (const key in err.error.errors) {
          this.toastr.error(err.error.errors[key], key);
        }
      },
      complete: () => {
        this.reset();
        this.spinner.hide();
        this.toastr.success('Producto eliminado correctamente');
        this.getlist();
      },
    });
  }

  reset() {
    this.product.reset;
    this.editar=false
  }

  seleccionarArchivo(event: any) {
    var files = event.target.files;
    var file = files[0];
    this.archivo.nombre = file.name;
    this.archivo.tipo = file.type;

    if (files && file) {
      var reader = new FileReader();
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }
  }

  _handleReaderLoaded(readerEvent: any) {
    var binaryString = readerEvent.target.result;
    this.archivo.base64textString = btoa(binaryString);
  }
}
