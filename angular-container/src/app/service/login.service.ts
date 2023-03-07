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
  localStorage.setItem('token',res.accessToken)
  localStorage.setItem('role',res.tenant_role)
  this.router.navigate(['/dashboard'])


})
    // if (event.email === 'super@gmail.com' && event.password === '123') {
    //   localStorage.setItem('auth',String(true))
    //   localStorage.setItem('admin', String(true));
    //   this.router.navigate(['/dashboard'])
    // }else if (event.email === 'Tenant@gmail.com' && event.password === '123') {
    //   localStorage.setItem('auth',String(true))
    // this.router.navigate(['/dashboard'])
    // }else{
    //   localStorage.setItem('admin', String(false));
    //   localStorage.setItem('auth', String(false));
    // }
  }

  logout(){
    this.router.navigate(['/'])
    localStorage.setItem('admin', String(false));
    localStorage.setItem('auth', String(false));
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  }
}
