import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '@core/services/api.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Auth } from '../interfaces/auth';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public item!: Auth;

  constructor(
    private apiS: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService) {}

  ngOnInit(): void {
    this.spinner.show();
    this.apiS.get('me').subscribe({
      next: (data) => {
        this.item = data as Auth;
        console.log(this.item)


      },
      error: (err) => {
        console.log(err);
        this.spinner.hide();
        this.toastr.error(err.statusText,'Error!');
      },
      complete: () =>{
        this.spinner.hide();
      },
    });
  }

  // TODO: añadir reviews y links
  get() {
    this.spinner.show();
    this.apiS.get('me').subscribe({
      next: (data) => {
        this.item = data as Auth;
        console.log(this.item)


      },
      error: (err) => {
        console.log(err);
        this.spinner.hide();
        this.toastr.error(err.statusText,'Error!');
      },
      complete: () =>{
        this.spinner.hide();
      },
    });
  }


}
