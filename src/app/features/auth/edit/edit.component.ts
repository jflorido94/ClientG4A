import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '@core/services/api.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Auth } from '../interfaces/auth';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {

  item!: Auth;

  user = new FormGroup({
    name: new FormControl('', [
      Validators.required
    ]),
    surnames: new FormControl('', [
      Validators.required
    ]),
    nick: new FormControl('', [
      Validators.minLength(8),
      Validators.required
    ]),
    dni: new FormControl('', [
      Validators.required
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('', [
      Validators.minLength(6),
      Validators.required,
    ]),
    password_confirmation: new FormControl('', [
      Validators.required,
    ]),
    accept: new FormControl(false, [
      Validators.required,
    ]),
  });

  constructor(
    private apiS: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
        this.get()
        console.log(this.item)
  }

  get form()  //para llamar a los componentes desde el html mas facil
  {
    return this.user.controls;
  }

   // TODO: Imagen y copiar de register
   get() {
    this.spinner.show();
    this.apiS.get('me').subscribe({
      next: (data) => {
        this.item = data as Auth;

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

  set(form:Auth) {
    this.spinner.show();
    this.apiS.post('users/'+sessionStorage.getItem('id'),form).subscribe({
      next: (resp) => {
        this.spinner.hide();
        this.toastr.success('Usuario editado correctamente');
      },
      error: (err) => {
        this.spinner.hide();
        for (const key in err.error.errors) {
          this.toastr.error(err.error.errors[key], key);
        }
      },
      complete: () => {
        this.spinner.hide();
        window.location.reload();
        this.router.navigate(['/profile']);
        // TODO: mostrar mensaje bien
      },
    });
  }
}
