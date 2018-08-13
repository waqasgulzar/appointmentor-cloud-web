import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as _model from '../../shared/models/models';
import * as _api from '../../shared/services/api';
import { Router } from "@angular/router";
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'resources-component',
  moduleId: module.id,
  templateUrl: 'resources.html'
})
export class ResourcesComponent implements OnInit {
  services: _model.Service[];
  resources: _model.Resource[];
  resource: _model.Resource = new _model.Resource();
  serviceResources: _model.ServiceResource[];
  serviceResource: _model.ServiceResource;
  selectedServiceResources: _model.ServiceResource[];
  selectedServiceIds: number[] = [];
  submitted = false;
  userForm: FormGroup;
  removeResourceId: number = 0;
  updatedResourceId: number = 0;
  isCheckAll: boolean = false;
  savebuttonText: string = "Save";
  isMenuhidden: boolean = false;
  constructor(private spinner: NgxSpinnerService,
    private fb: FormBuilder,
    private resourcesService: _api.ResourceService,
    private router: Router) {
   
    this.LoadResources();
  }
  ngOnInit() {
    this.userForm = this.fb.group({
      ResourceName: ['', Validators.compose([Validators.required, Validators.maxLength(50), Validators.pattern('^[a-zA-Z0-9 ]*$')])]
    });

    this.ClearFields();
  }
  onSubmit(formData: any) {
    this.submitted = true;
    if (!formData.invalid) {
      this.spinner.show();
      this.resource.resourceId = this.updatedResourceId;
      this.resource.organizationId = Number(sessionStorage.getItem("organizationId"));
      this.resource.resourceName = formData.controls["ResourceName"].value;
      this.resource.contactName = '';
      this.resource.emailAddress = '';
      this.resource.isSendConfirmationEmail = false;
      this.resource.houseNo = '';
      this.resource.addressLine1 = '';
      this.resource.addressLine2 = '';
      this.resource.city = '';
      this.resource.postcode = '';
      this.resource.color = '';
      this.resource.isDeleted = false;
     
      if (this.updatedResourceId == 0) {
        this.resourcesService.create(this.resource).subscribe((data: any) => {
          var obj = data["results"][0];
          for (var i = 0; i < this.selectedServiceIds.length; i++) {
            let serviceResource = {
              serviceResourceId: 0,
              serviceName: '',
              resourseName: '',
              serviceId: this.selectedServiceIds[i],
              resourceId: obj,
              isDeleted: false
            } as _model.ServiceResource;
            
          }
        });
      }
      else {
        
          
      }
      
    }
  }
  LoadServices() {
    this.resourcesService.getAll()
      .subscribe((data: any) => {
        this.services = data;
      });
  }
  LoadResources() {
    this.resourcesService.getAll()
      .subscribe((data: any) => {
        this.resources = data;
      });
  }
  LoadResourceById(resourceId: number) {
    this.serviceResources = null;
    this.selectedServiceIds = [];
    this.isCheckAll = false;
    this.LoadServices();
    this.savebuttonText = "Update";
    this.updatedResourceId = resourceId;
    this.removeResourceId = 0;
    this.resourcesService.get(resourceId)
      .subscribe((data: any) => {
        var obj = data[0];
        this.serviceResources = obj["serviceresource"];
        this.selectedServiceIds = [];
        for (var i = 0; i < obj["serviceresource"].length; i++) {
          this.selectedServiceIds.push(obj["serviceresource"][i]["serviceId"]);
        }
        this.userForm = this.fb.group({
          ResourceName: [obj["resourceName"]],
        });
      });
    //Logic for populating Services in mention in isServiceChecked function.
  }
  clearServices() {
    this.serviceResources = null;
    this.selectedServiceIds = [];
    this.isCheckAll = false;
  }
  isServiceChecked(serviceId: number) {
    if (this.serviceResources != null) {
      if (this.serviceResources.find(d => d.serviceId === serviceId && d.isDeleted == false)) {
        return true;
      }
      else {
        return false;
      }
    }
    else {
      return false;
    }
  }
  CloneResourceById(resourceId: number) {
    this.selectedServiceIds = [];
    this.isCheckAll = false;
    this.savebuttonText = "Save";
    this.updatedResourceId = 0;
    this.removeResourceId = 0;
    this.resourcesService.get(resourceId)
      .subscribe((data: any) => {
        var obj = data[0];
        this.serviceResources = obj["serviceresource"];
        for (var i = 0; i < obj["serviceresource"].length; i++) {
          this.selectedServiceIds.push(obj["serviceresource"][i]["serviceId"]);
        }
        var copyResourceName = "Copy of " + obj["resourceName"];
        this.userForm = this.fb.group({
          ResourceName: [copyResourceName]
        });
      });
    //Logic for populating Services in mention in isServiceChecked function.
  }
  ServiceIdForDelete(resourceId: number) {
    this.removeResourceId = resourceId;
  }
  RemoveResource() {
    this.resourcesService.delete(this.removeResourceId).subscribe((data: any) => {
      this.LoadResources();
      this.ClearFields();
    });
  }
  ClearFields() {
    
    this.savebuttonText = "Save";
    this.removeResourceId = 0;
    this.LoadServices();
  }
  CheckAll() {
    this.isCheckAll = true;
    this.selectedServiceIds = [];
    this.resourcesService.getAll()
      .subscribe((data: any) => {
        for (var i = 0; i < data.length; i++) {
          this.selectedServiceIds.push(data[i]["serviceId"]);
        }
        console.log(this.selectedServiceIds);
      });
  }
  UncheckAll() {
    this.selectedServiceIds = [];
    this.isCheckAll = false;
    this.serviceResources = null;
    this.LoadServices();
  }
  onChange(serviceId: number, event: any) {
    //this.isCheckAll = false;
    if (!event.target.checked) {
      if (this.selectedServiceIds.find(d => d === serviceId)) {
        let index = this.selectedServiceIds.findIndex(d => d == serviceId);
        this.selectedServiceIds.splice(index, 1);
      }
    }
    else {
      if (!this.selectedServiceIds.find(d => d === serviceId)) {
        this.selectedServiceIds.push(serviceId);
      }
    }
    console.log(this.selectedServiceIds);
  }
  Redirect() {
    sessionStorage.setItem('isMenuhidden', "false");
    this.router.navigate(['/appointment']);
  }
}