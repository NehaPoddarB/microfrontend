import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TanentService {
private createTenant = `${environment.api.baseUrl}${environment.api.routes.createTenant.endpoint}`;

  constructor(private httpclient:HttpClient) {
   }

   createNewTenant(payload:any){
    return this.httpclient.post(this.createTenant, payload)
   }
}
