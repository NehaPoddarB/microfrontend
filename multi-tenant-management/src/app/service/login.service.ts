import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './api.service';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
 timer:any

  constructor(private router: Router, private apiService: ApiService) { }

  checkCredentials(event: any) {
    this.apiService.postData(event).subscribe((res: any) => {
      if (res.accessToken) {
        localStorage.setItem('auth', 'authenticated')
        localStorage.setItem('token', res.accessToken)
        localStorage.setItem('role', res.tenant_role)
        localStorage.setItem('refreshToken', res.refreshToken)
        this.router.navigate(['/home'])
        this.timer =setInterval(() => {
          this.refreshToken()
        },140000);
      } else {
        localStorage.setItem('auth', 'unauthorized')
      }
    }, (error: any) => {
      localStorage.setItem('auth', 'unauthorized')
    }
    )
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
