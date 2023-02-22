import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private url = `${environment.api.baseUrl}${environment.api.routes.adminFetch.endpoint}`;

  constructor(private httpClient:HttpClient,
    private router:Router) { }


  getCreateToken(): Observable<any> {
    return this.httpClient.get<any>(
      this.url);
  }
getloginData(email:string, password:string){
let userEmail='abc@gmail.com'
let userPassword='123@abc'
if(email===userEmail && password===userPassword){
this.router.navigate(['/dashboard'])
console.log('hi')
}
}
}
