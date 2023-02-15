import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  value: string = '';
  title = 'angular-container';

  setValue(text: string){
    this.value = text;
  }

}
