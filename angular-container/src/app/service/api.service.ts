import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private url = `${environment.api.baseUrl}${environment.api.routes.adminFetch.endpoint}`;

  constructor(private httpClient:HttpClient) { }


  getCreateToken(): Observable<any> {
    return this.httpClient.get<any>(
      this.url);
  }
}
