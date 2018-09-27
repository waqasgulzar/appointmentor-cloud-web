import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { Constant } from '../../shared/constants/constants';

import { AssetEditComponent } from './asset-edit/asset-edit.component';
import * as _model from '../../shared/models/models';
import * as _api from '../../shared/services/api';

@Component({
  selector: 'assets-component',
  moduleId: module.id,
  templateUrl: 'asset.html'
})
export class AssetComponent implements OnInit {
  assets: _model.Asset[];
  asset: _model.Asset;
  services: _model.Service[];
  selectedServiceIds: number[] = [];
  assetservices: _model.AssetService[];
  assetservice: _model.AssetService;
  submitted = false;
  userForm: FormGroup;
  savebuttonText: string = 'Save';
  removeAssetId: number = 0;
  updatedAssetId: number = 0;
  isCheckAll: boolean = false;
  constructor(
    private fb: FormBuilder,
    private assetService: _api.AssetService,
    //private bsModalService: BsModalService,
    private resourcesService: _api.ResourceService,
    private router: Router
  ) {
    this.LoadAssets();
  }
  ngOnInit() {
    this.userForm = this.fb.group({
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
      ]
    });

    this.ClearFields();
    this.LoadAssets();
  }
  onSubmit(formData: any) {
    this.submitted = true;
    if (!formData.invalid) {
      let asset = {
        assetId: this.updatedAssetId,
        organizationId: Number(sessionStorage.getItem('organizationId')),
        name: formData.controls['name'].value,
        quantity: formData.controls['quantity'].value,
        isDeleted: false
      } as _model.Asset;
      if (this.updatedAssetId == 0) {
        this.assetService.create(asset).subscribe((data: any) => {
          var obj = data[0];
          //for (var i = 0; i < this.selectedServiceIds.length; i++) {
          //  this.assetservice = {
          //    assetserviceId: 0,
          //    assetId: obj,
          //    serviceId: this.selectedServiceIds[i],
          //    isDeleted: false
          //  };
          //  this.assetService.c(this.assetservice).subscribe((data: any) => {
          //    this.LoadAssets();
          //  });
          //  this.LoadAssets();
          //}
        });
      } else {
        //Mark all asset Services to removed.
        //this.assetService.post(this.updatedAssetId).subscribe((data: any) => {
        //  this.assetService.putAssets(this.updatedAssetId, this.asset).subscribe((data: any) => {
        //    for (var i = 0; i < this.selectedServiceIds.length; i++) {
        //      this.assetservice = {
        //        assetserviceId: 0,
        //        assetId: this.updatedAssetId,
        //        serviceId: this.selectedServiceIds[i],
        //        isDeleted: false
        //      };
        //      this.assetService.postAssetServices(this.assetservice).subscribe((data: any) => {
        //        this.LoadAssets();
        //      });
        //    }
        //    this.LoadAssets();
        //  });
        //});
      }
      this.assetservices = null;
      this.ClearFields();
    }
  }
  LoadServices() {
    this.resourcesService.getAll().subscribe((data: any) => {
      this.services = data;
    });
  }
  LoadAssets() {
    this.assetService.getAll().subscribe((data: any) => {
      this.assets = data;
    });
  }
  ClearFields() {
    this.savebuttonText = 'Save';
    this.removeAssetId = 0;
    this.LoadServices();
  }
  isServiceChecked(serviceId: number) {
    if (this.assetservices != null) {
      if (
        this.assetservices.find(
          d => d.serviceId === serviceId && d.isDeleted == false
        )
      ) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
  LoadAssetById(assetId: number) {
    this.assetservices = null;
    this.selectedServiceIds = [];
    this.isCheckAll = false;
    this.savebuttonText = 'Update';
    this.updatedAssetId = assetId;
    this.removeAssetId = 0;
    this.LoadServices();
    this.assetService.get(assetId).subscribe((data: any) => {
      console.log(data);
      var obj = data[0];
      this.assetservices = obj['assetservice'];
      this.selectedServiceIds = [];
      for (var i = 0; i < obj['assetservice'].length; i++) {
        this.selectedServiceIds.push(obj['assetservice'][i]['serviceId']);
      }
      this.userForm = this.fb.group({
        name: [
          obj['name'],
          Validators.compose([Validators.required, Validators.maxLength(50)])
        ],
        quantity: [
          obj['quantity'],
          Validators.compose([Validators.required, Validators.maxLength(7)])
        ]
      });
    });
  }
  CheckAll() {
    this.isCheckAll = true;
    this.selectedServiceIds = [];
    this.resourcesService.getAll().subscribe((data: any) => {
      for (var i = 0; i < data.length; i++) {
        this.selectedServiceIds.push(data[i]['serviceId']);
      }
      console.log(this.selectedServiceIds);
    });
  }
  UncheckAll() {
    this.selectedServiceIds = [];
    this.isCheckAll = false;
    this.assetservices = null;
    this.LoadServices();
  }
  onChange(serviceId: number, event: any) {
    if (!event.target.checked) {
      if (this.selectedServiceIds.find(d => d === serviceId)) {
        let index = this.selectedServiceIds.findIndex(d => d == serviceId);
        this.selectedServiceIds.splice(index, 1);
      }
      console.log('remove it' + serviceId);
    } else {
      if (!this.selectedServiceIds.find(d => d === serviceId)) {
        this.selectedServiceIds.push(serviceId);
        console.log('add it' + serviceId);
      }
    }
    console.log(this.selectedServiceIds);
  }
  AssetIdForDelete(assetId: number) {
    this.removeAssetId = assetId;
    console.log(this.removeAssetId);
  }
  RemoveAsset() {
    this.assetService.delete(this.removeAssetId).subscribe((data: any) => {
      this.LoadAssets();
      this.ClearFields();
    });
  }

  createUpdateAsset(asset?: _model.Asset) {
    const initialState = {
      action: 'create',
      asset: asset
    };

    // this.bsModalService.show(
    //   AssetEditComponent,
    //   Object.assign({}, { initialState }, { class: 'modal-md' })
    // );
  }
}
