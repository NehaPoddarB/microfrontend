import { Component, OnInit } from '@angular/core';
declare const require: any;

import {ApiService} from './../../../../angular-container/src/app/service/api.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  angularVersion = require('./../../../package.json').dependencies['@angular/core'];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getCreateToken().subscribe((res: any)=>{
      console.log(res);
  });
  }

}
