import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import * as _model from '../../shared/models/models';
import * as _api from '../../shared/services/api';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'services-component',
  moduleId: module.id,
  templateUrl: 'services.html'
})
export class ServicesComponent implements OnInit {
  services: Array<_model.Service>;
  service: _model.Service;
  
  userForm: FormGroup;
  
  submitted = false;
  permission: any;
  selectedPermissionId: number;
  permissionTitle: string;
  removeServiceId: number = 0;
  updatedServiceId: number = 0;
  savebuttonText: string = 'Save';
  price: string = '0';
 
  isMenuhidden: boolean = false;
  constructor(
    private spinner: NgxSpinnerService,
    private fb: FormBuilder,
    private servicesService: _api.ServiceService,
    private router: Router
  ) {
    
  }

  ngOnInit() {
    this.userForm = this.fb.group({
      ServiceName: [
        '',
        Validators.compose([
          Validators.required,
          Validators.maxLength(50),
          Validators.pattern('^[a-zA-Z0-9 ]*$')
        ])
      ],
      Duration: [
        '',
        Validators.compose([Validators.required, Validators.maxLength(2)])
      ],
      DurationType: ['Minutes'],
      Price: [null, Validators.compose([Validators.required])],
      ckPriceOnApplication: [false],
      ckCustomerSupport: [false],
      Occupancy: ['1']
    });

    
    this.LoadServices();
  }
  LoadPermission() {
    //this.servicesService
    //  .getByCategory('OnlinePermission')
    //  .subscribe((data: any) => {
    //    var obj = data['results'][0];
    //    this.selectedPermissionId = obj['id'];
    //    this.permissionTitle = obj['title'];
    //    this.permission = data['results'];
    //  });
  }
  LoadPermissionById(id: number) {
    //this.servicesService
    //  .getByCategoryId(id, 'OnlinePermission')
    //  .subscribe((data: any) => {
    //    var obj = data['results'][0];
    //    this.selectedPermissionId = obj['id'];
    //    this.permissionTitle = obj['title'];
    //  });
  }
  onClick(title: string, Id: number) {
    this.permissionTitle = title;
    this.selectedPermissionId = Id;
  }

  //onSubmit(formData: any) {
  //  this.submitted = true;
  //  if (!formData.invalid) {
  //    this.spinner.show();
  //    this.service = {
  //      serviceId: this.updatedServiceId,
  //      organizationId: Number(sessionStorage.getItem('organizationId')),
  //      serviceName: formData.controls['ServiceName'].value,
  //      duration: formData.controls['Duration'].value,
  //      durationType: formData.controls['DurationType'].value,
  //      isPriceOfApplication: formData.controls['ckPriceOnApplication'].value,
  //      price: formData.controls['ckPriceOnApplication'].value
  //        ? 0
  //        : formData.controls['Price'].value,
  //      permissionId: this.selectedPermissionId,
  //      isCustomerSupport: formData.controls['ckCustomerSupport'].value,
  //      occupancy: formData.controls['Occupancy'].value,
  //      categoryId: null,
  //      serviceDescription: '',
  //      offerPrice: null,
  //      bufferTimeBefore: null,
  //      bufferTimeAfter: null,
  //      isOnlineGroupBooking: false,
  //      isCustomBookableTime: false,
  //      isDeleted: false
  //    };
  //    if (this.updatedServiceId == 0) {
  //      this.servicesService
  //        .postServices(this.service)
  //        .subscribe((data: any) => {
  //          this.LoadServices();
  //          this.ClearFields();
  //          this.spinner.hide();
  //        });
  //    } else {
  //      this.servicesService
  //        .putServices(this.updatedServiceId, this.service)
  //        .subscribe((data: any) => {
  //          this.LoadServices();
  //          this.ClearFields();
  //          this.spinner.hide();
  //        });
  //    }
  //  }
  //}
  LoadServices() {
    this.servicesService.getAll().subscribe((data: any) => {
        this.services = data;
      });
  }
  
  ServiceIdForDelete(serviceId: number) {
    this.removeServiceId = serviceId;
    console.log(this.removeServiceId);
  }
  RemoveService() {
    this.servicesService
      .delete(this.removeServiceId)
      .subscribe((data: any) => {
        this.LoadServices();
        
      });
  }
  
  Redirect() {
    this.router.navigate(['/resources']);
  }
}
