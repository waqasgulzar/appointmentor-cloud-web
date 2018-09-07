import { Component, OnInit, Input } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import * as _model from '../../../shared/models/models';
import * as _api from '../../../shared/services/api';
import { UserInfoService } from '../../../shared/services/userInfo.service';
import { NotificationService } from '../../../shared/services/notification.service';
import { NotificationProperties } from '../../../shared/interfaces/NotificationProperties';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  moduleId: module.id,
  templateUrl: 'asset-edit.html'
})
export class AssetEditComponent implements OnInit {
  assets: _model.Asset[];
  services: _model.Service[];
  submitted = false;
  userForm: FormGroup;
  updatedAssetId: number = 0;
  selectedServices: Array<_model.AssetService> = [];

  @Input()
  asset: _model.Asset = new _model.Asset();
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private assetService: _api.AssetService,
    private serviceSvc: _api.ServiceService,
    private router: Router,
    private notificationService: NotificationService,
    private spinner: NgxSpinnerService,
    private userInfo: UserInfoService
  ) {}
  ngOnInit() {
    this.userForm = this.fb.group({
      assetId: this.updatedAssetId,
      organizationId: this.userInfo.currentUser.organizationId,
      name: [
        '',
        Validators.compose([
          Validators.required,
          Validators.maxLength(50),
          Validators.pattern('^[a-zA-Z0-9 ]*$')
        ])
      ],
      quantity: [
        '',
        Validators.compose([
          Validators.required,
          Validators.maxLength(4),
          Validators.minLength(1),
          Validators.min(0),
          Validators.max(1000)
        ])
      ],
      assetservice: []
    });

    this.serviceSvc.getAll().subscribe((services: _model.Service[]) => {
      this.services = services;
      this.route.params.subscribe(params => {
        var id = parseInt(params.id);
        if (id > 0) {
          this.updatedAssetId = id;
          this.LoadAssetById(id);
        }
      });
    });
  }

  onSelect({ selected }) {
    let assetServices = new _model.AssetService();
    assetServices.serviceId = selected.serviceId;

    if (selected && selected.serviceId && selected.serviceId > 0)
      this.selectedServices.push(
        this.services.find(t => t.serviceId === selected.serviceId)
      );
  }

  LoadAssetById(assetId: number) {
    this.assetService.get(assetId).subscribe((asset: _model.Asset) => {
      for (let svc of asset.assetservice) {
        if (svc.serviceId > 0)
          this.selectedServices.push(
            this.services.find(t => t.serviceId === svc.serviceId)
          );
      }
      this.userForm = this.fb.group({
        assetId: this.updatedAssetId,
        organizationId: this.userInfo.currentUser.organizationId,
        name: [
          asset.name,
          Validators.compose([Validators.required, Validators.maxLength(50)])
        ],
        quantity: [
          asset.quantity,
          Validators.compose([Validators.required, Validators.maxLength(7)])
        ],
        assetservice: [asset.assetservice]
      });
    });
  }

  onSubmit(formData: any) {
    this.submitted = true;
    if (!formData.invalid) {
      this.spinner.show();
      formData.value.assetservice = this.selectedServices;
      if (this.updatedAssetId == 0) {
        this.assetService.create(formData.value).subscribe(
          (data: any) => {
            const successNotification: NotificationProperties = {
              message: 'Asset has been saved successfully.',
              title: 'Assets'
            };
            this.notificationService.success(successNotification);
            this.spinner.hide();
            this.router.navigate(['/asset']);
          },
          error => {
            const errorNotification: NotificationProperties = {
              message: error.error,
              title: 'Assets'
            };
            this.notificationService.error(errorNotification);
            this.spinner.hide();
          }
        );
      } else {
        this.assetService.update(this.updatedAssetId, formData.value).subscribe(
          (data: any) => {
            const successNotification: NotificationProperties = {
              message: 'Asset has been updated successfully.',
              title: 'Service'
            };
            this.notificationService.success(successNotification);
            this.spinner.hide();
            this.router.navigate(['/asset']);
          },
          error => {
            const errorNotification: NotificationProperties = {
              message: error.error,
              title: 'Assets'
            };
            this.notificationService.error(errorNotification);
            this.spinner.hide();
          }
        );
      }
    }
  }
}
