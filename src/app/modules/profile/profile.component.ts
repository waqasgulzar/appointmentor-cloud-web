﻿import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';

import { Router } from '@angular/router';
import { Constant } from '../../shared/constants/constants';
import { OrganizationInfo, Profile } from '../setting/user/organizationuser';
import { ProfileService } from './profile.service';
import { NotificationService } from '../../shared/services/notification.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationProperties } from '../../shared/interfaces/NotificationProperties';
import { UserInfoService } from '../../shared/services/userInfo.service';


@Component({
  moduleId: module.id,
  templateUrl: 'profile.html'
})
export class ProfileComponent implements OnInit {
  orgInfo = new OrganizationInfo();
  userForm: FormGroup;
  logoForMarketingPath: File;
  profileImageForMicrosite1: File;
  profileImageForMicrosite2: File;
  profileImageForMicrosite3: File;
  profileImageForMicrosite4: File;
  bannerImageForMicrosite: File;
  submitted = false;
  constructor(
    private fb: FormBuilder,
    private profileService: ProfileService,
    private router: Router,
    private notificationService: NotificationService,
    private spinner: NgxSpinnerService,
    private userInfo: UserInfoService
  ) { }
  fileChangeMicrosite(files: any, microsite: number) {
    if (microsite == 0) {
      this.logoForMarketingPath = files[0].nativeElement;
    } else if (microsite == 1) {
      this.profileImageForMicrosite1 = files[0].nativeElement;
    } else if (microsite == 2) {
      this.profileImageForMicrosite2 = files[0].nativeElement;
    } else if (microsite == 3) {
      this.profileImageForMicrosite3 = files[0].nativeElement;
    } else if (microsite == 4) {
      this.profileImageForMicrosite4 = files[0].nativeElement;
    } else if (microsite == 5) {
      this.bannerImageForMicrosite = files[0].nativeElement;
    }
  }

  ngOnInit() {
    this.orgInfo = this.userInfo.orgInfo;
    this.loadProfile();
  }

  loadProfile() {
    this.userForm = this.fb.group({
      organizationId: [this.orgInfo.organizationId],
      businessName: [this.orgInfo.profile.businessName, Validators.compose([Validators.required, Validators.maxLength(50)])],
      aboutYourBusiness: [this.orgInfo.profile.aboutYourBusiness],
      street: [this.orgInfo.profile.street],
      city: [this.orgInfo.profile.city],
      postCode: [this.orgInfo.profile.postCode],
      businessPhoneNumber: [this.orgInfo.profile.businessPhoneNumber],
      businessWebsite: [this.orgInfo.profile.businessWebsite],
      mobileNumber: [this.orgInfo.profile.mobileNumber],
      emailAddress: [this.orgInfo.profile.emailAddress],
      otherEmailAddress: [this.orgInfo.profile.otherEmailAddress],
      sendFromEmailAddress: [this.orgInfo.profile.sendFromEmailAddress],
      sendFromNameForEmail: [this.orgInfo.profile.sendFromNameForEmail],
      sendFromNameForSMS: [this.orgInfo.profile.sendFromNameForSMS],
      logoForMarketingPath: [this.orgInfo.profile.logoForMarketingPath],
      setAsDefaultMircrosite1: [this.orgInfo.profile.setAsDefaultMircrosite1 || false],
      setAsDefaultMircrosite2: [this.orgInfo.profile.setAsDefaultMircrosite2 || false],
      setAsDefaultMircrosite3: [this.orgInfo.profile.setAsDefaultMircrosite3 || false],
      setAsDefaultMircrosite4: [this.orgInfo.profile.setAsDefaultMircrosite4 || false],
      profileImageForMicrosite1: [this.orgInfo.profile.profileImageForMicrosite1],
      profileImageForMicrosite2: [this.orgInfo.profile.profileImageForMicrosite2],
      profileImageForMicrosite3: [this.orgInfo.profile.profileImageForMicrosite3],
      profileImageForMicrosite4: [this.orgInfo.profile.profileImageForMicrosite4],
      bannerImageForMicrosite: [this.orgInfo.profile.bannerImageForMicrosite]
    });
  }

  onSubmit(userForm: FormGroup) {
    this.submitted = true;
    this.spinner.show();
    if (userForm.valid) {
      this.profileService.post(userForm.value).subscribe((data: any) => {
        this.orgInfo.profile = userForm.value;
        this.userInfo.setInfo(this.orgInfo);
        const successNotification: NotificationProperties = {
          message: 'Organisation Profile has been updated successfully.',
          title: 'Organisation Profile'
        };
        this.notificationService.success(successNotification);
        this.spinner.hide();
        this.submitted = false;
        this.loadProfile();
      },
        error => {
          this.spinner.hide();
          const errorNotification: NotificationProperties = {
            message: error.error,
            title: 'Organisation Profile'
          };
          this.submitted = false;
          this.notificationService.error(errorNotification);
        });
    }
  }
}
