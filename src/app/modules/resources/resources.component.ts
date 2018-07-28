import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ResourcesService } from './resources.service';
import { User } from '../../modules/user/user';
import { ServiceResource } from './serviceresource';
import { Service } from '../../modules/services/service';
import { Resource } from './resource';
import { environment } from '../../environments/environment';
import { Router } from "@angular/router";
const apiUrl = environment.apiUrl;
@Component({
  selector: 'resources-component',
  moduleId: module.id,
  templateUrl: 'resources.html'
})
export class ResourcesComponent implements OnInit {
  services: Service[];
  resources: Resource[];
  resource: Resource;
  serviceResources: ServiceResource[];
  serviceResource: ServiceResource;
  selectedServiceResources: ServiceResource[];
  selectedServiceIds: number[] = [];
  submitted = false;
  userForm: FormGroup;
  removeResourceId: number = 0;
  updatedResourceId: number = 0;
  isCheckAll: boolean = false;
  savebuttonText: string = "Save";
  isMenuhidden: boolean = false;
  constructor(private fb: FormBuilder, private resourcesService: ResourcesService, private router: Router) {
    if (sessionStorage.getItem("isMenuhidden") == "true") {
      this.isMenuhidden = true;
    }
    if (sessionStorage.getItem("organizationId") == null) {
      this.router.navigate(['']);
    }
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
      this.resource = {
        resourceId: this.updatedResourceId,
        organizationId: Number(sessionStorage.getItem("organizationId")),
        resourceName: formData.controls["ResourceName"].value,
        contactName: '',
        emailAddress: '',
        isSendConfirmationEmail: false,
        houseNo: '',
        addressLine1: '',
        addressLine2: '',
        city: '',
        postcode: '',
        color: '',
        isDeleted: false
      };
      if (this.updatedResourceId == 0) {
        this.resourcesService.postResources(apiUrl, this.resource).subscribe((data: any) => {
          var obj = data["results"][0];
          for (var i = 0; i < this.selectedServiceIds.length; i++) {
            this.serviceResource = {
              serviceResourceId: 0,
              resourceId: obj,
              serviceId: this.selectedServiceIds[i],
              resourceName: '',
              serviceName: '',
              isDeleted: false
            };
            this.resourcesService.postServiceResources(apiUrl, this.serviceResource).subscribe((data: any) => {
              this.LoadResources();
            });
            this.LoadResources();
          }
        });
      }
      else {
        //Mark all resources Services to removed.
        this.resourcesService.post(apiUrl, this.updatedResourceId).subscribe((data: any) => {
          this.resourcesService.putResources(apiUrl, this.updatedResourceId, this.resource).subscribe((data: any) => {
            for (var i = 0; i < this.selectedServiceIds.length; i++) {
              this.serviceResource = {
                serviceResourceId: 0,
                resourceId: this.updatedResourceId,
                serviceId: this.selectedServiceIds[i],
                resourceName: '',
                serviceName: '',
                isDeleted: false
              };
              this.resourcesService.postServiceResources(apiUrl, this.serviceResource).subscribe((data: any) => {
                this.LoadResources();
              });
            }
            this.LoadResources();
          });
        });
      }
      this.serviceResources = null;
      this.ClearFields();
    }
  }
  LoadServices() {
    this.resourcesService.getServices(apiUrl, Number(sessionStorage.getItem("organizationId")))
      .subscribe((data: any) => {
        this.services = data["results"];
      });
  }
  LoadResources() {
    this.resourcesService.getResources(apiUrl, Number(sessionStorage.getItem("organizationId")))
      .subscribe((data: any) => {
        this.resources = data["results"];
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
    this.resourcesService.getResourceById(apiUrl, resourceId)
      .subscribe((data: any) => {
        var obj = data["results"][0];
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
    this.resourcesService.getResourceById(apiUrl, resourceId)
      .subscribe((data: any) => {
        var obj = data["results"][0];
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
    this.resourcesService.deleteResources(apiUrl, this.removeResourceId).subscribe((data: any) => {
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
    this.resourcesService.getServices(apiUrl, Number(sessionStorage.getItem("organizationId")))
      .subscribe((data: any) => {
        for (var i = 0; i < data["results"].length; i++) {
          this.selectedServiceIds.push(data["results"][i]["serviceId"]);
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