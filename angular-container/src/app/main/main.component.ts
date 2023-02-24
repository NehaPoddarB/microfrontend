import { Component, OnInit } from '@angular/core';
import { IsActiveMatchOptions, Router} from '@angular/router';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  value: string = 'dashboard';
  matchOptions: IsActiveMatchOptions = {
    paths: 'exact',
    matrixParams: 'exact',
    queryParams: 'subset',
    fragment: 'ignored'
  };

auth=localStorage.getItem('admin');
  constructor(private router:Router,private loginService:LoginService) { }
  isActiveRoute(routeUrl: string): boolean {
    return this.router.isActive(routeUrl, this.matchOptions);
  }

  setValue(text: string){
    this.value = text;
  }

  logOut(){
    this.value='logOut'
    this.loginService.logout()
  }

}
