import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserSettingService } from './usersetting.service';
import { User } from './../../../modules/user/user';
import { OrganizationUser } from './organizationuser';
import { UserAccountService } from './../../../modules/useraccount/account.service';
import { ServicesService } from './../../../modules/services/services.service';
import { Router } from "@angular/router";
@Component({
    moduleId: module.id,
    templateUrl: 'usersetting.html'
})

export class UserSettingComponent implements OnInit {
    users: User[];
    organizationUser: OrganizationUser;
    customusers: User[];
    userForm: FormGroup;
    permission: any;
    selectedPermissionId: number;
    savebuttonText: string = "Save";
    removeUserId: number = 0;
    updatedUserId: number = 0;
    constructor(private fb: FormBuilder, private userSettingService: UserSettingService, private servicesService: ServicesService, private userAccountService: UserAccountService, private router: Router) {
        if (sessionStorage.getItem("organizationId") == null) {
            this.router.navigate(['']);
        }
    }
    ngOnInit() {
        this.userForm = this.fb.group({
            firstName: ['', Validators.compose([Validators.required, Validators.maxLength(50)])],
            lastName: ['', Validators.compose([Validators.required, Validators.maxLength(50)])],
            emailAddress: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(100), Validators.email])],
        });
        this.LoadOrganizationUser();
        this.LoadCustomUsers();
        this.LoadPermission();
    }
    LoadOrganizationUser() {
        this.userAccountService.get(Number(sessionStorage.getItem("organizationId"))).subscribe((data: any) => {
            this.users = data["results"];
        });
    }
    LoadCustomUsers() {
        this.userSettingService.get(Number(sessionStorage.getItem("organizationId"))).subscribe((data: any) => {
            this.customusers = data["results"];
        });
    }
    LoadPermission() {
        this.servicesService.getByCategory("UserPermission").subscribe((data: any) => {
            var obj = data["results"][0];
            this.selectedPermissionId = obj["id"];
            this.permission = data["results"];
        });
    }
    LoadPermissionById(id: number) {
        this.servicesService.getByCategoryId(id, "UserPermission").subscribe((data: any) => {
            var obj = data["results"][0];
            this.selectedPermissionId = obj["id"];
        });
    }
    ClearFields() {
        this.userForm = this.fb.group({
            firstName: ['', Validators.compose([Validators.required, Validators.maxLength(50)])],
            lastName: ['', Validators.compose([Validators.required, Validators.maxLength(50)])],
            emailAddress: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(100), Validators.email])],
        });
        this.savebuttonText = "Save";
        this.updatedUserId = 0;
        this.removeUserId = 0;
    }
    Redirect() {
        this.router.navigate(['/usersettingdetail']);
    }
    onClick(title: string, Id: number) {
        this.selectedPermissionId = Id;
    }
    LoadUserById(userId: number) {
        this.savebuttonText = "Update";
        this.updatedUserId = userId;
        this.removeUserId = userId;
        this.userSettingService.getUserById(userId)
            .subscribe((data: any) => {
                var obj = data["results"][0];
                this.selectedPermissionId = obj["permissionID"];
                this.userForm = this.fb.group({
                    firstName: [obj["firstName"], Validators.compose([Validators.required, Validators.maxLength(50)])],
                    lastName: [obj["firstName"], Validators.compose([Validators.required, Validators.maxLength(50)])],
                    emailAddress: [obj["emailAddress"], Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(100), Validators.email])],
                });
            });
    }
    onSubmit(formData: any) {
        this.organizationUser = {
            userId: this.updatedUserId,
            firstName: formData.controls["firstName"].value,
            lastName: formData.controls["lastName"].value,
            phoneNumber: '',
            emailAddress: formData.controls["emailAddress"].value,
            organizationId: Number(sessionStorage.getItem("organizationId")),
            password: '',
            timeZoneId: null,
            currencyId: null,
            isDeleted: false,
            parentUserID: null,
            permissionID: this.selectedPermissionId,
            isInvitationAccepted: false
        };
        if (this.updatedUserId == 0) {
            this.userSettingService.post(this.organizationUser).subscribe((data: any) => {
                this.LoadCustomUsers();
            });
        }
        else {
            this.userSettingService.put(this.updatedUserId, this.organizationUser).subscribe((data: any) => {
                this.LoadCustomUsers();
            });
        }
        this.ClearFields();
    }
}