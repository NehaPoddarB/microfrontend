import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from './service/api.service';
import { ActivatedRoute, IsActiveMatchOptions, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  value: string = '';
  title = 'angular-container';
  error: string ='';

  form: FormGroup = new FormGroup({
    email: new FormControl('',[Validators.required,Validators.email]),
    password: new FormControl('',[Validators.required]),
  });
  matchOptions: IsActiveMatchOptions = {
    paths: 'exact',
    matrixParams: 'exact',
    queryParams: 'subset',
    fragment: 'ignored'
  };
constructor(private apiService:ApiService,
  private router :Router){

}
  setValue(text: string){
    this.value = text;
  }
ngOnInit() {

}

isActiveRoute(routeUrl: string): boolean {
  return this.router.isActive(routeUrl, this.matchOptions);
}
submit() {
  if (this.form.valid) {
   console.log(this.form.value);
   this.apiService.getloginData(this.form.get('email')?.value, this.form.get('password')?.value)
  }

}
}
