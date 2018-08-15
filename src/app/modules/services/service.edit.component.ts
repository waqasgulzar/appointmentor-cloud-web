import { Component, OnInit, Input } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../../shared/services/notification.service';
import { NotificationProperties } from '../../shared/interfaces/NotificationProperties';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserInfoService } from '../../shared/services/userInfo.service';
import * as _model from '../../shared/models/models';
import * as _api from '../../shared/services/api';
import { DataService } from '../../shared/services/data.service';

@Component({
  moduleId: module.id,
  templateUrl: 'service-edit.html'
})
export class ServiceEditComponent implements OnInit {
  categories: Array<_model.Category>;
  service: _model.Service = new _model.Service();
  userForm: FormGroup;
  submitted = false;
  isPriceOnApplication: boolean = false;
  isCustomerSupport: boolean = false;
  id: number = 0;

  permissions: any;
  selectedPermissionId: number;
  permissionTitle: string;

  constructor(
    private dataService: DataService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private servicesService: _api.ServiceService,
    private router: Router,
    private notificationService: NotificationService,
    private spinner: NgxSpinnerService,
    private userInfoService: UserInfoService,
    private lookupService: _api.LookupService,
    private categoryService: _api.CategoryService,
  ) {

  }

  ngOnInit() {
    this.spinner.show();
    this.categoryService.getAll().subscribe(response => {
      this.categories = response;
      this.spinner.hide();
    });

    this.userForm = this.fb.group({
      OrganizationId: this.userInfoService.currentUser.organizationId,
      ServiceName: ['', Validators.compose([Validators.required, Validators.maxLength(50), Validators.pattern('^[a-zA-Z0-9 ]*$')])],
      Duration: ['', Validators.compose([Validators.required, Validators.maxLength(2)])],
      DurationType: ['Minutes'],
      Price: [0, Validators.compose([Validators.required])],
      ckPriceOnApplication: [false],
      ckCustomerSupport: [false],
      Occupancy: ['1'],
      PermissionId: [null],
      categoryId: [null],
      serviceDescription: [null],
      offerPrice: [null],
      bufferTimeBefore: [null],
      bufferTimeAfter: [null],
      isOnlineGroupBooking: [false],
      isCustomBookableTime: [false],
      isDeleted: [false],
    });

    this.route.params.subscribe(params => {
      var id = parseInt(params.id);
      if (id > 0) this.LoadService(id);
    });

    this.loadPermission();
  }

  loadPermission() {
    this.lookupService.load('OnlinePermission').subscribe((data: any) => {
      this.permissions = data;
    });
  }

  onSubmit(formData: any) {
    this.submitted = true;
    if (!formData.invalid) {
      this.spinner.show();
      let service = {
        serviceId: this.id,
        organizationId: this.userInfoService.currentUser.organizationId,
        serviceName: formData.controls['ServiceName'].value,
        duration: formData.controls['Duration'].value,
        durationType: formData.controls['DurationType'].value,
        isPriceOfApplication: formData.controls['ckPriceOnApplication'].value,
        price: formData.controls['ckPriceOnApplication'].value ? 0 : formData.controls['Price'].value,
        categoryId: formData.controls['categoryId'].value,
        permissionId: formData.controls['PermissionId'].value,
        isCustomerSupport: formData.controls['ckCustomerSupport'].value,
        occupancy: formData.controls['Occupancy'].value,
        serviceDescription: '',
        offerPrice: null,
        bufferTimeBefore: null,
        bufferTimeAfter: null,
        isOnlineGroupBooking: false,
        isCustomBookableTime: false,
        isDeleted: false
      } as _model.Service;

      this.servicesService.create(service).subscribe(
        (data: any) => {
          const successNotification: NotificationProperties = {
            message: 'Service has been save successfully.',
            title: 'Service'
          };
          this.notificationService.success(successNotification);
          this.spinner.hide();
          this.router.navigate(['/categories']);
        },
        error => {
          const errorNotification: NotificationProperties = {
            message: error.error,
            title: 'Service'
          };
          this.notificationService.error(errorNotification);
          this.spinner.hide();
        });
    }
  }

  LoadService(id) {
    this.servicesService.get(id).subscribe((data: any) => {
      let srv = data['results'][0];
      this.userForm.setValue({
        OrganizationId: srv.organizationId,
        ServiceName: srv.serviceName,
        Duration: srv.duration,
        DurationType: srv.durationType,
        Price: srv.price,
        ckPriceOnApplication: srv.isPriceOfApplication,
        ckCustomerSupport: srv.isCustomerSupport,
        Occupancy: srv.occupancy
      });
    });
  }
}