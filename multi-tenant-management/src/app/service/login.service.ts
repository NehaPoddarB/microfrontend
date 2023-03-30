import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './api.service';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
 timer:any
  expireTime: number=0;

  constructor(private router: Router, private apiService: ApiService) { }

  parseJwt (token:any) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
  
    return JSON.parse(jsonPayload);
  }

  checkCredentials(event: any) {
    this.apiService.postData(event).subscribe((res: any) => {
      if (res.accessToken) {
        localStorage.setItem('auth', 'authenticated')
        localStorage.setItem('token', res.accessToken)
        localStorage.setItem('role', res.tenant_role)
        localStorage.setItem('refreshToken', res.refreshToken)
        this.router.navigate(['/home'])
        const expireIn:any = new Date(this.parseJwt(res.accessToken).exp *1000)
        const currentTime:any = new Date()
        this.expireTime = expireIn - currentTime;
        console.log(expireIn,this.expireTime)
        this.setIntervalForRefresh()
      } else {
        localStorage.setItem('auth', 'unauthorized')
      }
    }, (error: any) => {
      localStorage.setItem('auth', 'unauthorized')
    }
    )
  }
  setIntervalForRefresh(){
    this.timer =setInterval(() => {
      this.refreshToken()
    },this.expireTime-10000);

  }
  refreshToken() {
    let token = localStorage.getItem('refreshToken')
    let refresh={token:token}
    this.apiService.postRefresh(refresh).subscribe((res: any) => {
      localStorage.setItem('token',res.accessToken)
      localStorage.setItem('refreshToken',res.refreshToken)
    })
  }

  logout() {
    clearInterval(this.timer);
    this.router.navigate(['/'])
    localStorage.setItem('auth', '');
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('refreshToken');
  }
}
