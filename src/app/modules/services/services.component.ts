import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ServicesService } from './services.service';
import { User } from '../../modules/user/user';
import { Service } from './service';
import { environment } from '../../environments/environment';
import { Router } from "@angular/router";
const apiUrl = environment.apiUrl;
@Component({
  selector: 'services-component',
  moduleId: module.id,
  templateUrl: 'services.html'
})
export class ServicesComponent implements OnInit {
  services: Array<Service>;
  service: Service;
  permissionTitle: string;
  userForm: FormGroup;
  permission: any;
  submitted = false;
  selectedPermissionId: number;
  removeServiceId: number = 0;
  updatedServiceId: number = 0;
  savebuttonText: string = "Save";
  price: string = "0";
  isPriceOnApplication: boolean = false;
  isCustomerSupport: boolean = false;
  isMenuhidden: boolean = false;
  constructor(private fb: FormBuilder, private servicesService: ServicesService, private router: Router) {
    if (sessionStorage.getItem("isMenuhidden") == "true") {
      this.isMenuhidden = true;
    }
    if (sessionStorage.getItem("organizationId") == null) {
      this.router.navigate(['']);
    }

    
  }

  ngOnInit() {
    this.userForm = this.fb.group({
      ServiceName: ['', Validators.compose([Validators.required, Validators.maxLength(50), Validators.pattern('^[a-zA-Z0-9 ]*$')])],
      Duration: ['', Validators.compose([Validators.required, Validators.maxLength(2)])],
      DurationType: ['Minutes'],
      Price: [null, Validators.compose([Validators.required])],
      ckPriceOnApplication: [false],
      ckCustomerSupport: [false],
      Occupancy: ['1']
    });

    this.ClearFields();
    this.LoadServices();
  }
  LoadPermission() {
    this.servicesService.getByCategory(apiUrl, "OnlinePermission").subscribe((data: any) => {
      var obj = data["results"][0];
      this.selectedPermissionId = obj["id"];
      this.permissionTitle = obj["title"];
      this.permission = data["results"];
    });
  }
  LoadPermissionById(id: number) {
    this.servicesService.getByCategoryId(apiUrl, id, "OnlinePermission").subscribe((data: any) => {
      var obj = data["results"][0];
      this.selectedPermissionId = obj["id"];
      this.permissionTitle = obj["title"];
    });
  }
  onClick(title: string, Id: number) {
    this.permissionTitle = title;
    this.selectedPermissionId = Id;
  }
  onSubmit(formData: any) {
    this.submitted = true;
    if (!formData.invalid) {
      this.service = {
        serviceId: this.updatedServiceId,
        organizationId: Number(sessionStorage.getItem("organizationId")),
        serviceName: formData.controls["ServiceName"].value,
        duration: formData.controls["Duration"].value,
        durationType: formData.controls["DurationType"].value,
        isPriceOfApplication: formData.controls["ckPriceOnApplication"].value,
        price: (formData.controls["ckPriceOnApplication"].value) ? 0 : formData.controls["Price"].value,
        permissionId: this.selectedPermissionId,
        isCustomerSupport: formData.controls["ckCustomerSupport"].value,
        occupancy: formData.controls["Occupancy"].value,
        categoryId: null,
        serviceDescription: '',
        offerPrice: null,
        bufferTimeBefore: null,
        bufferTimeAfter: null,
        isOnlineGroupBooking: false,
        isCustomBookableTime: false,
        isDeleted: false
      };
      if (this.updatedServiceId == 0) {
        this.servicesService.postServices(apiUrl, this.service).subscribe((data: any) => {
          this.LoadServices();
        });
      }
      else {
        this.servicesService.putServices(apiUrl, this.updatedServiceId, this.service).subscribe((data: any) => {
          this.LoadServices();
        });
      }
      this.ClearFields();
    }
  }
  LoadServices() {
    this.servicesService.getServices(apiUrl, Number(sessionStorage.getItem("organizationId")))
      .subscribe((data: any) => {
        console.log(data);
        this.services = data["results"];
      });
  }
  LoadServiceById(serviceId: number) {
    this.savebuttonText = "Update";
    this.updatedServiceId = serviceId;
    this.removeServiceId = 0;
    this.servicesService.getServiceById(apiUrl, serviceId)
      .subscribe((data: any) => {
        console.log(data);
        var obj = data["results"][0];

        if (obj["isPriceOfApplication"] == false) {
          this.price = "0";
          this.isPriceOnApplication = false;
        }
        else {
          this.price = "POA";
          this.isPriceOnApplication = true;
        }

        this.userForm = this.fb.group({
          ServiceName: [obj["serviceName"]],
          Duration: [obj["duration"]],
          DurationType: [obj["durationType"]],
          Price: [obj["price"]],
          ckPriceOnApplication: [obj["isPriceOfApplication"]],
          ckCustomerSupport: [obj["isCustomerSupport"]],
          Occupancy: [obj["occupancy"]]
        });
        this.isCustomerSupport = obj["isCustomerSupport"];
        this.LoadPermissionById(obj["permissionId"]);
      });
  }
  CloneServiceById(serviceId: number) {
    this.savebuttonText = "Save";
    this.updatedServiceId = 0;
    this.removeServiceId = 0;
    this.servicesService.getServiceById(apiUrl, serviceId)
      .subscribe((data: any) => {
        console.log(data);
        var obj = data["results"][0];
        var copyServiceName = "Copy of " + obj["serviceName"];
        this.userForm = this.fb.group({
          ServiceName: [copyServiceName],
          Duration: [obj["duration"]],
          DurationType: [obj["durationType"]],
          Price: [obj["price"]],
          ckPriceOnApplication: [obj["isPriceOfApplication"]],
          ckCustomerSupport: [obj["isCustomerSupport"]],
          Occupancy: [obj["occupancy"]]
        });
        this.isCustomerSupport = obj["isCustomerSupport"];
        this.LoadPermissionById(obj["permissionId"]);
      });
  }
  ServiceIdForDelete(serviceId: number) {
    this.removeServiceId = serviceId;
    console.log(this.removeServiceId);
  }
  RemoveService() {
    this.servicesService.deleteServices(apiUrl, this.removeServiceId).subscribe((data: any) => {
      this.LoadServices();
      this.ClearFields();
    });
  }
  ChangePrice(event: any) {
    if (!event.target.checked) {
      this.price = "0";
      this.isPriceOnApplication = false;
    }
    else {
      this.price = "POA";
      this.isPriceOnApplication = true;
    }
  }
  ChangeCustomerSupport(event: any) {
    if (!event.target.checked) {
      this.isCustomerSupport = false;
    }
    else {
      this.isCustomerSupport = true;
    }
  }
  ClearFields() {
    
    this.savebuttonText = "Save";
    this.isCustomerSupport = false;
    this.isPriceOnApplication = false;
    this.price = "0";
    this.updatedServiceId = 0;
    this.removeServiceId = 0;
    this.LoadPermission();
  }
  Redirect() {
    this.router.navigate(['/resources']);
  }
}