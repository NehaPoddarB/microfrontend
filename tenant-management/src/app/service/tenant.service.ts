import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TenantService {
  accessToken=localStorage.getItem('token')
   headers = new HttpHeaders()
  .set('Content-Type', 'application/json')
  .set("Authorization", `Bearer ${this.accessToken}`)


  private createTenant = `${environment.api.baseUrl}${environment.api.routes.createTenant.endpoint}`;
  private getTenantUrl = `${environment.api.baseUrl}${environment.api.routes.getTenant.endpoint}`;
  private updateTenant = `${environment.api.baseUrl}${environment.api.routes.updateTenant.endpoint}`;
  private deleteTenant = `${environment.api.baseUrl}${environment.api.routes.deleteTenant.endpoint}`;



private jsonUrl ='http://localhost:3000/createTenant/'
constructor(private httpClient:HttpClient) { }




getTenant():Observable<any> {
  return this.httpClient.get<any>(this.getTenantUrl,{'headers':this.headers});
}

getTenantById(id: string) {
  return this.httpClient.get(this.getTenantUrl +id,{'headers':this.headers});
}

postTenant(data: any) {
  return this.httpClient.post(this.createTenant, data,{'headers':this.headers});
}

updateTenantById(data: any, id: string) {
  console.log(this.headers);

  return this.httpClient.patch(this.updateTenant + id, data,{'headers':this.headers})
}

deleteTenantById(id: number) {
  return this.httpClient.patch(this.deleteTenant + id,'',{'headers':this.headers});
}
}
