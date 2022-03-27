import { Product } from './../interfaces/product';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ApiService } from '@core/services/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss'],
})
export class ListProductsComponent implements OnInit {
  list: Product[] = [];

  loged: any = null;

  constructor(
    private apiS: ApiService,
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.checkUserlogged();
    this.get();
  }

  // TODO: mostrar bien la imagen del producto y las estrellas etc y crear enlaces biena ajustar donde clicar para cada cosa
  get() {
    this.spinner.show();
    this.apiS.get('products').subscribe({
      next: (data) => {
        this.list = data as Product[];

      },
      error: (err) => {
        this.spinner.hide();
      },
      complete: () => {
        this.spinner.hide();
      },
    });
  }

  checkUserlogged() {
    if (sessionStorage.getItem('id')) {
      this.loged = sessionStorage.getItem('id');
    }
  }

}
