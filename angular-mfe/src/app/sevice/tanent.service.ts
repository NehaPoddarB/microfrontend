import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TanentService {
// private createTenant = `${environment.api.baseUrl}${environment.api.routes.createTenant.endpoint}`;

private jsonUrl ='http://localhost:3000/createTanent/'
constructor(private httpClient:HttpClient) { }


// createToken(event:any): Observable<any> {
//   return this.httpClient.get<any>(
//     this.url);
// }

getTanent():Observable<any> {
  return this.httpClient.get<any>(this.jsonUrl);
}

getTanentById(id: string) {
  return this.httpClient.get(this.jsonUrl + id);
}

postTanent(data: any) {
  return this.httpClient.post(this.jsonUrl, data);
}

updateTanentById(data: any, id: string) {
  return this.httpClient.put(this.jsonUrl + id, data)
}

deleteTanentById(id: string) {
  return this.httpClient.delete(this.jsonUrl + id);
}
}
