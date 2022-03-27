import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '@core/services/api.service';
import { Product } from './../interfaces/product';
import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit {
  loged : any = null;

  @Input() product: any;


  constructor(private domSanitizer: DomSanitizer,
    private apiS: ApiService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService) {}

  ngOnInit(): void {
    this.checkUserlogged();
  }

  makeTrustedImage(item: any) {
    const imageString = JSON.stringify(item).replace(/\\n/g, '');
    const style = 'url(' + imageString + ')';
    return this.domSanitizer.bypassSecurityTrustStyle(style);
  }

  checkUserlogged() {
    if (sessionStorage.getItem('id')) {

      this.loged = sessionStorage.getItem('id');
    }
  }

  average(avg:number){
    return avg*10;
  }

  comprar(id:number){
    this.apiS.post('products/'+id+'/buy', null).subscribe({
      error: (err) => {
        this.spinner.hide();

        this.toastr.error(err.error.message)

        for (const key in err.error.errors) {
          this.toastr.error(err.error.errors[key], key);
        }
      },
      complete: () => {
        this.spinner.hide();
        this.toastr.success('Producto comprado correctamente');
      },
    });
  }
}
