import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {


  constructor(private router:Router,private apiService:ApiService) { }

  checkCredentials(event:any) {
//     this.apiService.createToken(event)
//     .subscribe((res:any) => {
//         if (res.role == '1') {
//             localStorage.setItem('admin', String(true));
//         }else if (res.role === '2') {
//                 localStorage.setItem('superAdmin', String(true));
//             } else {
//                 localStorage.removeItem('superAdmin');
//                 localStorage.removeItem('admin');

//             }
//             this.router.navigate(['/']);
//         }
// );
    if (event.email === 'super@gmail.com' && event.password === '123') {
      localStorage.setItem('auth',String(true))
      localStorage.setItem('admin', String(true));
       this.router.navigate(['/dashboard'])
    }else if (event.email === 'tanent@gmail.com' && event.password === '123') {
      localStorage.setItem('auth',String(true))
      this.router.navigate(['/dashboard'])
    }else{
      localStorage.setItem('admin', String(false));
      localStorage.setItem('auth', String(false));
    }
  }

  logout(){
    localStorage.setItem('admin', String(false));
    localStorage.setItem('auth', String(false));
  }
}
