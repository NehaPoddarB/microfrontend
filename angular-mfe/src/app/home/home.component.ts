import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { TanentService } from '../sevice/tanent.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  value: boolean = false;
  tableRow: any[] = []
  createTenantForm: FormGroup = new FormGroup({
    tenant_name: new FormControl(''),
    tenant_email: new FormControl(''),
    tenant_code: new FormControl(''),
    password: new FormControl(''),
  });
  modalRef: BsModalRef | undefined;
  tanentId: string | undefined;
  deleteId: any = '';

  constructor(private tanentService: TanentService, private modalService: BsModalService ,private toastr:ToastrService) { }

  ngOnInit() {
    this.getAllTenentData()
  }

  getAllTenentData() {
    this.tanentService.getTanent().subscribe(res => {
      if (res) {
        this.tableRow = res;
      }
    })
  }

  openModal(template: TemplateRef<any>, id?: string) {
    this.tanentId = id;
    this.modalRef = this.modalService.show(template, {
      animated: true,
      class: 'create-modal'
    });
  }

  submited(event: boolean) {
    if(event){
    this.getAllTenentData();
    }
  }

  openDeleteModal(template: TemplateRef<any>, id: any) {
    this.deleteId = id;
    this.modalRef = this.modalService.show(template, {
      animated: true,
      class: 'delete-modal'
    });
  }

  deleteTanent() {
    this.tanentService.deleteTanentById(this.deleteId).subscribe(res => {
      if (res) {
        this.getAllTenentData();
        this.modalRef?.hide();
        this.toastr.success("Tanent Deleted successfully!")
      }
    },(error)=>{
      this.toastr.success("something went wront")
    });
  }

  closeModal(){
    this.deleteId = '';
    this.modalRef?.hide();
  }

}
