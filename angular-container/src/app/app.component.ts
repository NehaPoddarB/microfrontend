import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from './service/api.service';
import { ActivatedRoute, IsActiveMatchOptions, Router } from '@angular/router';
import { distinctUntilChanged } from 'rxjs';
import { LoginService } from './service/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-container';

ngOnInit() {

 }

}
