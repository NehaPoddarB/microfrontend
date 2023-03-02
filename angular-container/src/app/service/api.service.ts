import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private login = `${environment.api.baseUrl}${environment.api.routes.login.endpoint}`;

  constructor(private httpClient:HttpClient) { }


postData(data:any){
  return this.httpClient.post(this.login, data);
}
  }
