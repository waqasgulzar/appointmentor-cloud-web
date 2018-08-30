import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import * as _model from '../../../shared/models/models';
import * as _api from '../../../shared/services/api';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationService } from '../../../shared/services/notification.service';
import { NotificationProperties } from '../../../shared/interfaces/NotificationProperties';
import { UserInfoService } from '../../../shared/services/userInfo.service';

@Component({
  selector: 'resources-edit-component',
  moduleId: module.id,
  templateUrl: 'resource-edit.html'
})
export class ResourceEditComponent implements OnInit {
  resourceId: number = 0;
  submitted = false;
  resource: _model.Resource = new _model.Resource();
  userForm: FormGroup;
  services: _model.Service[] = [];
  categories: _model.Category[] = [];
  selectedServices: Array<any> = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private resourceService: _api.ResourceService,
    private notificationService: NotificationService,
    private spinner: NgxSpinnerService,
    private userInfo: UserInfoService,
    private serviceSvc: _api.ServiceService,
    private catSvc: _api.CategoryService,
    private router: Router
  ) {}

  ngOnInit() {
    this.userForm = this.fb.group({
      resourceId: [this.resourceId],
      organizationId: [this.userInfo.currentUser.organizationId],
      resourceName: [
        '',
        [
          Validators.required,
          Validators.maxLength(50),
          Validators.pattern('^[a-zA-Z ]*$')
        ]
      ],
      emailAddress: ['', [Validators.required, Validators.email]],
      addressLine1: ['', [Validators.required, Validators.maxLength(50)]],
      addressLine2: ['', [Validators.required, Validators.maxLength(50)]],
      city: ['', [Validators.required, Validators.maxLength(20)]],
      postcode: ['', [Validators.required, Validators.maxLength(10)]],
      color: [''],
      serviceresource: []
    });

    this.catSvc.getAll().subscribe((data: any) => {
      this.categories = data.filter(
        (d: _model.Category) => d.services && d.services.length > 0
      );

      this.route.params.subscribe(params => {
        var id = parseInt(params.id);
        if (id > 0) {
          this.resourceId = id;
          this.loadData();
        }
      });
    });
  }

  loadData() {
    this.resourceService.get(this.resourceId).subscribe((data: any) => {
      let resource = data as _model.Resource;
      for (let rService of resource.serviceresource) {
        if (rService.serviceId > 0) {
          for (let cat of this.categories) {
            this.selectedServices.push(
              cat.services.find(t => t.serviceId === rService.serviceId)
            );
          }
        }
      }

      this.userForm.setValue({
        resourceId: resource.resourceId,
        organizationId: this.userInfo.currentUser.organizationId,
        resourceName: resource.resourceName,
        emailAddress: resource.emailAddress,
        addressLine1: resource.addressLine1,
        addressLine2: resource.addressLine2,
        city: resource.city,
        postcode: resource.postcode,
        color: resource.color,
        serviceresource: resource.serviceresource
      });
    });
  }

  onSelect({ selected }) {
    var serviceResource = new _model.ServiceResource();
    serviceResource.serviceId = selected.serviceId;
    serviceResource.serviceName = selected.serviceName;

    if (selected && selected.serviceId && selected.serviceId > 0)
      this.selectedServices.push(serviceResource);
  }

  onSubmit(formData: FormGroup) {
    this.submitted = true;
    if (!formData.invalid) {
      formData.get('serviceresource').setValue(this.selectedServices);
      this.spinner.show();
      if (this.resourceId == 0) {
        this.resourceService.create(formData.value).subscribe(
          (data: any) => {
            const successNotification: NotificationProperties = {
              message: 'Resource has been created successfully.',
              title: 'Resources'
            };
            this.notificationService.success(successNotification);
            this.spinner.hide();
            this.router.navigate(['/resources']);
          },
          error => {
            this.spinner.hide();
            const errorNotification: NotificationProperties = {
              message: error.error,
              title: 'Resources'
            };
            this.notificationService.error(errorNotification);
          }
        );
      } else {
        this.resourceService.update(this.resourceId, formData.value).subscribe(
          (data: any) => {
            const successNotification: NotificationProperties = {
              message: 'Resource has been updated successfully.',
              title: 'Resources'
            };
            this.notificationService.success(successNotification);
            this.spinner.hide();
            this.router.navigate(['/resources']);
          },
          error => {
            this.spinner.hide();
            const errorNotification: NotificationProperties = {
              message: error.error,
              title: 'Resources'
            };
            this.notificationService.error(errorNotification);
          }
        );
      }
    }
  }
}
