import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { TenantService } from '../service/tenant.service';
import '../../../../library/indexOne';

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
  TenantId: string | undefined;
  deleteId: any = '';
  statusMsg:any=''
  showLoading: boolean = false;
  constructor(private TenantService: TenantService, private modalService: BsModalService ,private toastr:ToastrService) { }

  ngOnInit() {
    this.getAllTenentData();
  }

  getAllTenentData() {
    this.showLoading = true;
    this.TenantService.getTenant().subscribe(res => {
      if (res) {
        setTimeout(()=>{
          this.tableRow = res.tenants;
          this.showLoading = false;
        },1000)
        // this.tableRow = res.tenants;
        // this.showLoading = false;
      }
    })
  }

  openModal(template: TemplateRef<any>, id?: string) {
    this.TenantId = id;
    this.modalRef = this.modalService.show(template, {
      animated: true,
      class: 'create-modal'
    });
  }

  submited(event: any) {
    if(event){
    this.getAllTenentData();
    }
  }

  openDeleteModal(template: TemplateRef<any>, id: any, status:any) {
    this.deleteId = id;
    if(status==='enable'){
      this.statusMsg='Are you sure you want to Disable?'
    }else{
     this.statusMsg='Are you sure you want to Enable?'
    }
    this.modalRef = this.modalService.show(template, {
      animated: true,
      class: 'delete-modal'
    });
  }

  deleteTenant() {
    this.TenantService.deleteTenantById(this.deleteId).subscribe(res => {
      if (res) {
        this.getAllTenentData();
        this.modalRef?.hide();
        this.toastr.success("Tenant Deleted successfully!")
      }
    },(error)=>{
      this.toastr.error("something went wrong")
    });
  }

  closeModal(){
    this.getAllTenentData();
    this.deleteId = '';
    this.modalRef?.hide();
  }

}
