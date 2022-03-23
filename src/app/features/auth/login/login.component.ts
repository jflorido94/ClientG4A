import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '@core/services/api.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Auth, Login, RespLogin } from '../interfaces/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  inicio = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('', [
      Validators.minLength(6),
      Validators.required,
  ]),
    recordar: new FormControl(false, [
      Validators.required,
    ]),
  });

  constructor(private apiS: ApiService, private router:Router, private toastr:ToastrService, private spinner:NgxSpinnerService) {}

  ngOnInit(): void {
  }

  get form()  //para llamar a los componentes desde el html mas facil
  {
    return this.inicio.controls;
  }

  loged():boolean{
    if(localStorage.getItem('token')){ return true}
    else {return false}
  }

  login(form: Login) {

    this.spinner.show()
    this.apiS.post("login",form).subscribe({
      next: (resp) => {
        let user: RespLogin = resp as RespLogin;
        localStorage.setItem("token", user.access_token)

      },
      error: (err) => {
        this.spinner.hide();
        if (err.error.message) {
          this.toastr.error(err.error.message)
        }else{
          this.toastr.error(err.statusText)
        }
      },
      complete: () => {
        this.spinner.hide();
        this.router.navigate(['/auth/profile'])
        this.toastr.success('Inicio de sesion correcto')

        // TODO: mostrar mensaje y actualizar header bien
      },
    });
  }


}
