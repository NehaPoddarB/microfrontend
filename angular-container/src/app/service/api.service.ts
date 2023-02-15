import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private url = `${environment.api.baseUrl}${environment.api.routes.adminFetch.endpoint}`;

  constructor(private httpClient:HttpClient) { }

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  getCreateToken(): Observable<any> {
    return this.httpClient.get<any>(
      this.url);
  }
}
