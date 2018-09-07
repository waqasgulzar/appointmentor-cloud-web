import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';

import { Router } from '@angular/router';
import { Constant } from '../../shared/constants/constants';
import { NotificationService } from '../../shared/services/notification.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationProperties } from '../../shared/interfaces/NotificationProperties';
import { UserInfoService } from '../../shared/services/userInfo.service';
import {
  DomSanitizer,
  SafeResourceUrl,
  SafeUrl
} from '@angular/platform-browser';
import * as _model from '../../shared/models/models';
import * as _api from '../../shared/services/api';
import { environment } from '../../../environments/environment';

@Component({
  moduleId: module.id,
  templateUrl: 'profile.html'
})
export class ProfileComponent implements OnInit {
  orgInfo = new _model.User();
  userForm: FormGroup;
  logoForMarketingPath: File;
  profileImageForMicrosite1: File;
  profileImageForMicrosite2: File;
  profileImageForMicrosite3: File;
  profileImageForMicrosite4: File;
  bannerImageForMicrosite: File;
  submitted = false;
  formData = new FormData();
  fileToUpload: File = null;
  trustedProfileImageUrl: SafeUrl;

  constructor(
    private fb: FormBuilder,
    private profileService: _api.ProfileService,
    private router: Router,
    private notificationService: NotificationService,
    private spinner: NgxSpinnerService,
    private userInfo: UserInfoService,
    private fileService: _api.FilesService,
    private sanitizer: DomSanitizer
  ) {}

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
    this.orgInfo = this.userInfo.currentUser;
    this.loadProfile();
  }

  loadProfile() {
    this.trustedProfileImageUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      environment.apiUrl +
        '/UploadFiles/' +
        this.orgInfo.profile.logoForMarketingPath
    );
    this.userForm = this.fb.group({
      organizationId: [this.orgInfo.organizationId],
      businessName: [
        this.orgInfo.profile.businessName,
        Validators.compose([Validators.required, Validators.maxLength(50)])
      ],
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
      setAsDefaultMircrosite1: [
        this.orgInfo.profile.setAsDefaultMircrosite1 || false
      ],
      setAsDefaultMircrosite2: [
        this.orgInfo.profile.setAsDefaultMircrosite2 || false
      ],
      setAsDefaultMircrosite3: [
        this.orgInfo.profile.setAsDefaultMircrosite3 || false
      ],
      setAsDefaultMircrosite4: [
        this.orgInfo.profile.setAsDefaultMircrosite4 || false
      ],
      profileImageForMicrosite1: [
        this.orgInfo.profile.profileImageForMicrosite1
      ],
      profileImageForMicrosite2: [
        this.orgInfo.profile.profileImageForMicrosite2
      ],
      profileImageForMicrosite3: [
        this.orgInfo.profile.profileImageForMicrosite3
      ],
      profileImageForMicrosite4: [
        this.orgInfo.profile.profileImageForMicrosite4
      ],
      bannerImageForMicrosite: [this.orgInfo.profile.bannerImageForMicrosite]
    });
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    this.formData.append('file', files[0], files[0].name);
  }

  onSubmit(userForm: FormGroup) {
    this.submitted = true;
    this.spinner.show();

    if (userForm.valid) {
      // Upload Image
      this.fileService.upload(this.formData).subscribe(data => {
        let fileInfo = data as _model.FileInformation;
        //userForm.setValue({ logoForMarketingPath: fileInfo.onDiskPath });
        userForm.get('logoForMarketingPath').setValue(fileInfo.onDiskName);
        // Update Profile
        this.profileService.create(userForm.value).subscribe(
          (data: any) => {
            this.orgInfo.profile = userForm.value;
            this.orgInfo.profile.logoForMarketingPath = fileInfo.onDiskName;
            this.userInfo.setInfo(this.orgInfo);
            const successNotification: NotificationProperties = {
              message:
                'Organisation Profile has been updated successfully. These changes will take effect next time you login.',
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
          }
        );
      });
    }
  }
}
