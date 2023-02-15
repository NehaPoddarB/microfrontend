import { Component } from '@angular/core';
import { ApiService } from './service/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  value: string = '';
  title = 'angular-container';
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

}
