import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as _model from '../../../shared/models/models';
import * as _api from '../../../shared/services/api';
import { Router } from "@angular/router";
@Component({
  moduleId: module.id,
  templateUrl: 'customersetting.html'
})
export class CustomerSettingComponent implements OnInit {
  customfields: _model.CustomField[];
  customfield: _model.CustomField;
  userForm: FormGroup;
  removeCustomId: number = 0;
  updatedCustomId: number = 0;
  savebuttonText: string = "Save";
  constructor(private fb: FormBuilder, private customerSettingService: _api.CustomerSettingService, private router: Router) {

  }
  ngOnInit() {
    this.ClearFields();
  }
  onSubmit(formData: any) {
    let customfield = {
      customId: this.updatedCustomId,
      organizationId: Number(sessionStorage.getItem("organizationId")),
      fieldName: formData.controls["fieldName"].value,
      isRequired: formData.controls["isRequired"].value,
      isDeleted: false
    } as _model.CustomField;
    if (this.updatedCustomId == 0) {
      this.customerSettingService.create(customfield).subscribe((data: any) => {
        this.LoadCustomSetting();
      });
    }
    else {
      this.customerSettingService.update(this.updatedCustomId, customfield).subscribe((data: any) => {
        this.LoadCustomSetting();
      });
    }
    this.ClearFields();
  }
  LoadCustomSetting() {
    this.customerSettingService.getAll()
      .subscribe((data: any) => {
        this.customfields = data;
      });
  }
  LoadCustomFieldById(customId: number) {
    this.savebuttonText = "Update";
    this.updatedCustomId = customId;
    this.removeCustomId = 0;
    this.customerSettingService.get(customId)
      .subscribe((data: any) => {
        var obj = data[0];
        this.userForm = this.fb.group({
          fieldName: [obj["fieldName"]],
          isRequired: [obj["isRequired"]]
        });
      });
  }
  CustomFieldIdForDelete(customId: number) {
    this.removeCustomId = customId;
  }
  RemoveCustomField() {
    this.customerSettingService.delete(this.removeCustomId).subscribe((data: any) => {
      this.LoadCustomSetting();
      this.ClearFields();
    });
  }
  ClearFields() {
    this.userForm = this.fb.group({
      fieldName: ['', Validators.compose([Validators.required, Validators.maxLength(50)])],
      isRequired: [false]
    });
    this.savebuttonText = "Save";
    this.removeCustomId = 0;
    this.updatedCustomId = 0;
    this.LoadCustomSetting();
  }
  Redirect() {
    this.router.navigate(['/customersettingdetail']);
  }
}