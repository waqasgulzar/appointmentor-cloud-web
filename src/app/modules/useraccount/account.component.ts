import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import * as _api from '../../shared/services/api';
import { Router } from '@angular/router';
import { UserInfoService } from '../../shared/services/userInfo.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationService } from '../../shared/services/notification.service';
import { NotificationProperties } from '../../shared/interfaces/NotificationProperties';

@Component({
  moduleId: module.id,
  templateUrl: 'user.account.html'
})
export class UserAccountComponent implements OnInit {
  userForm: FormGroup;
  submitted = false;
  constructor(
    private fb: FormBuilder,
    private userAccountService: _api.UserService,
    private router: Router,
    private userInfoService: UserInfoService,
    private spinner: NgxSpinnerService,
    private orgService: _api.OrganizationService,
    private notificationService: NotificationService
  ) {}
  ngOnInit() {
    this.userForm = this.fb.group({
      firstName: [
        this.userInfoService.currentUser.firstName,
        Validators.required
      ],
      lastName: [
        this.userInfoService.currentUser.lastName,
        Validators.required
      ],
      emailAddress: [
        this.userInfoService.currentUser.emailAddress,
        Validators.compose([
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(100),
          Validators.email
        ])
      ]
    });
  }

  onSubmit(userForm: any) {
    this.submitted = true;
    if (!userForm.invalid) {
      this.spinner.show();
      this.orgService
        .update(this.userInfoService.currentUser.organizationId, userForm.value)
        .subscribe(
          (data: any) => {
            const successNotification: NotificationProperties = {
              message: 'Profile has been updated successfully.',
              title: 'Profile'
            };
            this.notificationService.success(successNotification);
            this.spinner.hide();
          },
          error => {
            this.spinner.hide();
          }
        );
    }
  }
}
