import { Component, OnInit, Input } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { Service } from './service';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicesService } from './services.service';
import { NotificationService } from '../../shared/services/notification.service';
import { NotificationProperties } from '../../shared/interfaces/NotificationProperties';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserInfoService } from '../../shared/services/userInfo.service';
import { Category } from './category/category';
import { CategoryService } from './category/category.service';

@Component({
  moduleId: module.id,
  templateUrl: 'service-edit.html'
})
export class ServiceEditComponent implements OnInit {
  categories: Array<Category>;
  service: Service = new Service();
  userForm: FormGroup;
  submitted = false;
  isPriceOnApplication: boolean = false;
  isCustomerSupport: boolean = false;
  id: number = 0;

  permissions: any;
  selectedPermissionId: number;
  permissionTitle: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private servicesService: ServicesService,
    private router: Router,
    private notificationService: NotificationService,
    private spinner: NgxSpinnerService,
    private userInfoService: UserInfoService,
    private categoryService: CategoryService,
  ) {

  }

  ngOnInit() {
    this.LoadPermission();

    this.userForm = this.fb.group({
      OrganizationId: this.userInfoService.orgInfo.organizationId,
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

    this.categoryService.getAll(this.userInfoService.orgInfo.organizationId).subscribe((data: any) => {
      this.categories = data['results'];
    });
  }

  LoadPermission() {
    this.servicesService.getByCategory('OnlinePermission').subscribe((data: any) => {
      this.permissions = data['results'];
    });
  }

  onSubmit(formData: any) {
    this.submitted = true;
    if (!formData.invalid) {
      this.spinner.show();
      let service = {
        serviceId: this.id,
        organizationId: this.userInfoService.orgInfo.organizationId,
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
      };

      this.servicesService.postServices(service).subscribe(
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
    this.servicesService.getServiceById(id).subscribe((data: any) => {
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