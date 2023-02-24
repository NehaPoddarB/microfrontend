import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { TanentService } from '../sevice/tanent.service';

@Component({
  selector: 'app-create-tanent',
  templateUrl: './create-tanent.component.html',
  styleUrls: ['./create-tanent.component.scss']
})
export class CreateTanentComponent implements OnInit {

  createTenantForm: FormGroup = new FormGroup({
    tenant_name: new FormControl('', Validators.required),
    tenant_email: new FormControl('', [Validators.required, Validators.email]),
    tenant_code: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });
  @Input() tanentId: string | undefined;
  @Output() submitSuccess = new EventEmitter();
  constructor(private tanentService: TanentService, private modalService: BsModalService
  ) { }

  ngOnInit() {
    if (this.tanentId) {
      this.editForm(this.tanentId)
    }
  }

  editForm(id: any) {
    this.tanentService.getTanentById(id).subscribe((res: any) => {
      delete res.id;
      this.createTenantForm.setValue(res)
    })
  }

  submit() {
    if (this.createTenantForm.valid) {
      if (this.tanentId) {
        this.tanentService.updateTanentById(this.createTenantForm.value, this.tanentId).subscribe((res: any) => {
          this.createTenantForm.reset()
          this.cancelModal()
          this.submitSuccess.emit(true)
        });
      } else {
        this.tanentService.postTanent(this.createTenantForm.value).subscribe((res: any) => {
          this.createTenantForm.reset()
          this.cancelModal()
          this.submitSuccess.emit(true)
        });
      }
    }
  }

  cancelModal() {
    this.modalService.hide()
  }

}