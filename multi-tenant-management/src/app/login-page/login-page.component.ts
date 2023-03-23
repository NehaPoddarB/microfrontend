import { Component} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { distinctUntilChanged } from 'rxjs';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  isValid:any;
  loginForm: FormGroup = new FormGroup({
    tenant_email: new FormControl('',[Validators.required,Validators.email]),
    password: new FormControl('',[Validators.required]),
  });

constructor(private loginService:LoginService)
{}

login() {
  this.loginService.checkCredentials(this.loginForm?.value)
  this.isValid = localStorage.getItem('auth');
 }
}
