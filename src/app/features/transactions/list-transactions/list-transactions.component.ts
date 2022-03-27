import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '@core/services/api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Transaction } from './../interfaces/transaction';
import { Component, OnInit } from '@angular/core';
import { Review } from '@features/reviews/interfaces/review';

@Component({
  selector: 'app-list-transactions',
  templateUrl: './list-transactions.component.html',
  styleUrls: ['./list-transactions.component.scss']
})
export class ListTransactionsComponent implements OnInit {
  list: Transaction[] = [];

  constructor(
    private apiS: ApiService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.getlist();
  }


  getlist() {
    this.spinner.show();
    this.apiS.get('transactions').subscribe({
      next: (data) => {
        this.list = data as Transaction[];
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

  review(id: number){
    this.toastr.error('Opción no disponible actualmente')
  }

}
