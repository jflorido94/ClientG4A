import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '@core/services/api.service';
import { Auth } from '@features/auth/interfaces/auth';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  usuario: any;

  constructor(
    private apiS: ApiService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.get();
  }

  get() {
    this.apiS.get('me').subscribe({
      next: (resp) => {
        this.usuario = resp as Auth;
        sessionStorage.setItem('id', this.usuario.id);
      },
      error: (err) => {
        if (localStorage.getItem('token') && err.status == 401) {
          sessionStorage.removeItem('id');
          localStorage.removeItem('token');
          window.location.reload();
        }
      },
    });
  }

  logout() {
    this.apiS.get('logout').subscribe({
      next: (resp) => {
        sessionStorage.removeItem('id');
        localStorage.removeItem('token');
        window.location.reload();
      },
      error: (err) => {
        if (localStorage.getItem('token') && err.status == 401) {
          sessionStorage.removeItem('id');
          localStorage.removeItem('token');
          window.location.reload();
        }
      },
    });
  }

}
