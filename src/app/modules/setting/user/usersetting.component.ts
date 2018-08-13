import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as _model from '../../../shared/models/models';
import * as _api from '../../../shared/services/api';
import { Router } from "@angular/router";
@Component({
  moduleId: module.id,
  templateUrl: 'usersetting.html'
})

export class UserSettingComponent implements OnInit {
  users: _model.User[];
  organizationUser: _model.OrganizationUser;
  customusers: _model.User[];
  userForm: FormGroup;
  permission: any;
  selectedPermissionId: number;
  savebuttonText: string = "Save";
  removeUserId: number = 0;
  updatedUserId: number = 0;
  constructor(private fb: FormBuilder,
    private userSettingService: _api.UserSettingService,
    private servicesService: _api.ServiceService,
    private userAccountService: _api.UserService,
    private router: Router) {
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
    this.userAccountService.getAll().subscribe((data: any) => {
      this.users = data;
    });
  }
  LoadCustomUsers() {
    this.userSettingService.getAll().subscribe((data: any) => {
      this.customusers = data;
    });
  }
  LoadPermission() {
    this.servicesService.getAll().subscribe((data: any) => {
      var obj = data[0];
      this.selectedPermissionId = obj["id"];
      this.permission = data;
    });
  }
  LoadPermissionById(id: number) {
    this.servicesService.get(id).subscribe((data: any) => {
      var obj = data[0];
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
    this.userSettingService.get(userId)
      .subscribe((data: any) => {
        var obj = data[0];
        this.selectedPermissionId = obj["permissionID"];
        this.userForm = this.fb.group({
          firstName: [obj["firstName"], Validators.compose([Validators.required, Validators.maxLength(50)])],
          lastName: [obj["firstName"], Validators.compose([Validators.required, Validators.maxLength(50)])],
          emailAddress: [obj["emailAddress"], Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(100), Validators.email])],
        });
      });
  }
  onSubmit(formData: any) {
    let organizationUser = {
      userId: this.updatedUserId,
      firstName: formData.controls["firstName"].value,
      lastName: formData.controls["lastName"].value,
      phoneNumber: '',
      emailAddress: formData.controls["emailAddress"].value,
      organizationId: Number(sessionStorage.getItem("organizationId")),
      password: '',
      timezoneId: null,
      currencyId: null,
      isDeleted: false,
      parentUserID: null,
      permissionID: this.selectedPermissionId,
      isInvitationAccepted: false
    } as _model.OrganizationUser;
    if (this.updatedUserId == 0) {
      this.userSettingService.create(organizationUser).subscribe((data: any) => {
        this.LoadCustomUsers();
      });
    }
    else {
      this.userSettingService.update(this.updatedUserId, organizationUser).subscribe((data: any) => {
        this.LoadCustomUsers();
      });
    }
    this.ClearFields();
  }
}