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
    name: new FormControl('', [Validators.required]),
    surnames: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    avatar: new FormControl('', []),
    password: new FormControl('', [Validators.required]),
    new_password: new FormControl('', [Validators.minLength(6)]),
    new_password_confirmation: new FormControl('', []),
  });
  archivo = {
    tipo: '',
    nombre: '',
    base64textString: '',
  };

  constructor(
    private apiS: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.get();
  }

  get form() {
    //para llamar a los componentes desde el html mas facil
    return this.user.controls;
  }

  get() {
    this.spinner.show();
    this.apiS.get('me').subscribe({
      next: (data) => {
        this.item = data as Auth;
      },
      error: (err) => {
        this.spinner.hide();
        this.toastr.error(err.error.message, 'Error!');
      },
      complete: () => {
        this.user.patchValue({
          name: this.item.name,
          surnames: this.item.surnames,
          dni: this.item.dni,
          nick: this.item.nick,
          email: this.item.email,
        });
        this.spinner.hide();
      },
    });
  }

  set(form: Auth) {
    this.spinner.show();

    form.avatar = "data:image/png;base64,"+this.archivo!.base64textString;

    this.apiS.post('users/' + sessionStorage.getItem('id'), form).subscribe({
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
        // window.location.reload();
        this.router.navigate(['/profile']);
      },
    });
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
