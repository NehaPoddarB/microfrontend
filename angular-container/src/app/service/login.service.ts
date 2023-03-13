import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './api.service';
@Injectable({
  providedIn: 'root'
})
export class LoginService {


  constructor(private router:Router,private apiService:ApiService) { }

  checkCredentials(event:any) {
   this.apiService.postData(event).subscribe((res:any)=>{
     if(res.accessToken){
      localStorage.setItem('auth','authenticated')
      localStorage.setItem('token',res.accessToken)
      localStorage.setItem('role',res.tenant_role)
      this.router.navigate(['/dashboard'])
     }else{
      localStorage.setItem('auth','unauthorized')
    }
},(error:any)=>{
  localStorage.setItem('auth','unauthorized')
}
)
  }

  logout(){
    this.router.navigate(['/'])
    localStorage.setItem('auth', '');
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  }
}
