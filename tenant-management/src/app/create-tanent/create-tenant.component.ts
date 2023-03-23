import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { TenantService } from '../service/tenant.service';

@Component({
  selector: 'app-create-tenant',
  templateUrl: './create-tenant.component.html',
  styleUrls: ['./create-tenant.component.scss']
})
export class CreateTenantComponent implements OnInit {

  createTenantForm: FormGroup = new FormGroup({
    tenant_name: new FormControl('', Validators.required),
    tenant_email: new FormControl('', [Validators.required, Validators.email]),
    tenant_code: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });
  @Input() TenantId: string | undefined;
  @Output() submitSuccess = new EventEmitter();
  constructor(private TenantService: TenantService, private modalService: BsModalService,private toastr:ToastrService
  ) { }

  ngOnInit() {
    if (this.TenantId) {
      this.editForm(this.TenantId)
    }
  }

  editForm(id: any) {
    this.TenantService.getTenantById(id).subscribe((res: any) => {
    let formData={
     tenant_name:res.tenant[0].tenant_name,
     tenant_email:res.tenant[0].tenant_email,
     tenant_code:res.tenant[0].tenant_code,
     password:res.tenant[0].password
    }
      this.createTenantForm.setValue(formData)
    })
  }

  submit() {
    if (this.createTenantForm.valid) {
      if (this.TenantId) {
        this.TenantService.updateTenantById(this.createTenantForm.value, this.TenantId).subscribe((res: any) => {
          this.createTenantForm.reset()
          this.cancelModal()
          this.submitSuccess.emit(true)
          this.toastr.success("Tenant Updated successfully!")
         }
         ,(error)=>{
          this.toastr.error("something went wront")
        }
        );
      } else {
        this.TenantService.postTenant(this.createTenantForm.value).subscribe((res: any) => {
          console.log(this.createTenantForm.value)
          this.createTenantForm.reset()
          this.cancelModal()
          this.submitSuccess.emit(true)
          this.toastr.success("Tenant created successfully!")
        }
        ,(error)=>{
          this.toastr.error("something went wront")
        }
        );
      }
    }
  }

  cancelModal() {
    this.modalService.hide()
  }
}
