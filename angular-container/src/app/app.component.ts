import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ApiService } from './service/api.service';

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
    email: new FormControl(''),
    password: new FormControl(''),
  });

constructor(private apiService:ApiService){

}
  setValue(text: string){
    this.value = text;
  }
ngOnInit() {
this.apiService.getCreateToken().subscribe(res=>{
console.log(res);

})

}



submit() {
  if (this.form.valid) {
   console.log(this.form.value);
  }
}


}
