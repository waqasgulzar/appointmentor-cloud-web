import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomerSettingService } from './customersetting.service';
import { CustomField } from './customsetting';
import { environment } from '../../../environments/environment';
import { Router } from "@angular/router";
const apiUrl = environment.apiUrl;
@Component({
    moduleId: module.id,
    templateUrl: 'customersetting.html'
})
export class CustomerSettingComponent implements OnInit {
    customfields: CustomField[];
    customfield: CustomField;
    userForm: FormGroup;
    removeCustomId: number = 0;
    updatedCustomId: number = 0;
    savebuttonText: string = "Save";
    constructor(private fb: FormBuilder, private customerSettingService: CustomerSettingService, private router: Router) {
        if (sessionStorage.getItem("organizationId") == null) {
            this.router.navigate(['']);
        }
    }
    ngOnInit() {
        this.ClearFields();
    }
    onSubmit(formData: any) {
        this.customfield = {
            customId: this.updatedCustomId,
            organizationId: Number(sessionStorage.getItem("organizationId")),
            fieldName: formData.controls["fieldName"].value,
            isRequired: formData.controls["isRequired"].value,
            isDeleted: false
        };
        if (this.updatedCustomId == 0) {
            this.customerSettingService.post(apiUrl, this.customfield).subscribe((data: any) => {
                this.LoadCustomSetting();
            });
        }
        else {
            this.customerSettingService.put(apiUrl, this.updatedCustomId, this.customfield).subscribe((data: any) => {
                this.LoadCustomSetting();
            });
        }
        this.ClearFields();
    }
    LoadCustomSetting() {
        this.customerSettingService.get(apiUrl, Number(sessionStorage.getItem("organizationId")))
            .subscribe((data: any) => {
                this.customfields = data["results"];
            });
    }
    LoadCustomFieldById(customId: number) {
        this.savebuttonText = "Update";
        this.updatedCustomId = customId;
        this.removeCustomId = 0;
        this.customerSettingService.getCustomFieldById(apiUrl, customId)
            .subscribe((data: any) => {
                var obj = data["results"][0];
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
        this.customerSettingService.delete(apiUrl, this.removeCustomId).subscribe((data: any) => {
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