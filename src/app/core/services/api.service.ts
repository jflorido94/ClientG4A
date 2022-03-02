import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env';

const apiurl = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  public get(url: string) {
    return this.http.get(this.createCompleteRoute(url) ) ;
  }
  public post(url: string, data: any) {
    return this.http.post(this.createCompleteRoute(url), data) ;
  }
  public put(url: string, data: any) {
    return this.http.put(this.createCompleteRoute(url), data) ;
  }
  public delete(url: string) {
    return this.http.delete(this.createCompleteRoute(url) ) ;
  }

  private createCompleteRoute (route: string, envAddress: string = apiurl) {
    return `${envAddress}/${route}`;
  }

}
