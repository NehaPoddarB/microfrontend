import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private login = `${environment.api.baseUrl}${environment.api.routes.login.endpoint}`;
  private refresh = `${environment.api.baseUrl}${environment.api.routes.refresh.endpoint}`;

  constructor(private httpClient:HttpClient) { }


postData(data:any){
  return this.httpClient.post(this.login, data);
}

postRefresh(data:any){
  return this.httpClient.post(this.refresh, data);
}
  }
