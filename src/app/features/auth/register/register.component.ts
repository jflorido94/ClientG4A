import { Component, OnInit } from '@angular/core';
import { ApiService } from '@core/services/api.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Signup } from '../interfaces/auth';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
// TODO: añadir avatar
export class RegisterComponent implements OnInit {
  registro = new FormGroup({
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

  constructor(private apiS: ApiService, private spinner: NgxSpinnerService, private router:Router, private toastr:ToastrService) {}

  ngOnInit(): void {}

  get form()  //para llamar a los componentes desde el html mas facil
  {
    return this.registro.controls;
  }

  register(form: Signup) {

    this.spinner.show();
    this.apiS.post("signup",form).subscribe({
      next: (resp) => {
        this.spinner.hide();
        this.toastr.success('Registro de usuario correcto');
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
        this.router.navigate(['/login']);
        // TODO: mostrar mensaje bien
      },
    });
  }
}
