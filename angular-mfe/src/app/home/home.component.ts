import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { TanentService } from '../sevice/tanent.service';
declare const require: any;

import {ApiService} from './../../../../angular-container/src/app/service/api.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  createTenantForm: FormGroup = new FormGroup({
    tenant_name: new FormControl(''),
    tenant_email: new FormControl(''),
    tenant_code: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private tanentService: TanentService) { }

  ngOnInit(): void {

  }


submit() {
  if (this.createTenantForm.valid) {
    this.tanentService.createNewTenant(this.createTenantForm.value).subscribe((res: any)=>{
      console.log(res);
      this.createTenantForm.reset()
    });
  }
}
}
