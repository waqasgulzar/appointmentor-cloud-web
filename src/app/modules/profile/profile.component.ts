import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from './profile.service';
import { Profile } from './profile';
import { environment } from '../../environments/environment';
import { Router } from "@angular/router";
const apiUrl = environment.apiUrl;
@Component({
  moduleId: module.id,
  templateUrl: 'profile.html'
})
export class ProfileComponent implements OnInit {
  profiles: Profile[];
  profile: Profile;
  userForm: FormGroup;
  logoForMarketingPath: File;
  profileImageForMicrosite1: File;
  profileImageForMicrosite2: File;
  profileImageForMicrosite3: File;
  profileImageForMicrosite4: File;
  bannerImageForMicrosite: File;
  submitted=false;
  constructor(private fb: FormBuilder, private profileService: ProfileService, private router: Router) {
    if (sessionStorage.getItem("organizationId") == null) {
      this.router.navigate(['']);
    }
  }
  fileChangeMicrosite(files: any, microsite: number) {
    if (microsite == 0) {
      this.logoForMarketingPath = files[0].nativeElement;
    }
    else if (microsite == 1) {
      this.profileImageForMicrosite1 = files[0].nativeElement;
    }
    else if (microsite == 2) {
      this.profileImageForMicrosite2 = files[0].nativeElement;
    }
    else if (microsite == 3) {
      this.profileImageForMicrosite3 = files[0].nativeElement;
    }
    else if (microsite == 4) {
      this.profileImageForMicrosite4 = files[0].nativeElement;
    }
    else if (microsite == 5) {
      this.bannerImageForMicrosite = files[0].nativeElement;
    }
  }
  ngOnInit() {
    this.userForm = this.fb.group({
      businessName: ['', Validators.compose([Validators.required, Validators.maxLength(50)])],
      aboutYourBusiness: [''],
      street: [''],
      city: [''],
      postCode: [''],
      businessPhoneNumber: [''],
      businessWebsite: [''],
      mobileNumber: [''],
      emailAddress: [''],
      otherEmailAddress: [''],
      sendFromEmailAddress: [''],
      sendFromNameForEmail: [''],
      sendFromNameForSMS: [''],
      logoForMarketingPath: [''],
      setAsDefaultMircrosite1: [false],
      setAsDefaultMircrosite2: [false],
      setAsDefaultMircrosite3: [false],
      setAsDefaultMircrosite4: [false],
      profileImageForMicrosite1: [''],
      
      profileImageForMicrosite2: [''],
      
      profileImageForMicrosite3: [''],
     
      profileImageForMicrosite4: [''],
      
      bannerImageForMicrosite: ['']
    });
    this.LoadProfile();
  }
  LoadProfile() {
    this.profileService.get(apiUrl, Number(sessionStorage.getItem("organizationId"))).subscribe((data: any) => {
      var obj = data["results"][0];

      this.userForm = this.fb.group({
        businessName: [obj["businessName"], Validators.compose([Validators.required, Validators.maxLength(50)])],
        aboutYourBusiness: [obj["aboutYourBusiness"]],
        street: [obj["street"]],
        city: [obj["city"]],
        postCode: [obj["postCode"]],
        businessPhoneNumber: [obj["businessPhoneNumber"]],
        businessWebsite: [obj["businessWebsite"]],
        mobileNumber: [obj["mobileNumber"]],
        emailAddress: [obj["emailAddress"]],
        otherEmailAddress: [obj["otherEmailAddress"]],
        sendFromEmailAddress: [obj["sendFromEmailAddress"]],
        sendFromNameForEmail: [obj["sendFromNameForEmail"]],
        sendFromNameForSMS: [obj["sendFromNameForSMS"]],
        logoForMarketingPath: [obj["logoForMarketingPath"]],
        setAsDefaultMircrosite1: [obj["setAsDefaultMircrosite1"]],
        setAsDefaultMircrosite2: [obj["setAsDefaultMircrosite2"]],
        setAsDefaultMircrosite3: [obj["setAsDefaultMircrosite3"]],
        setAsDefaultMircrosite4: [obj["setAsDefaultMircrosite4"]],
      });
    });
  }
  onSubmit(formData: any) {
    this.submitted = true;
    this.profile = {
      profileId: 0,
      organizationId: Number(sessionStorage.getItem("organizationId")),
      businessName: formData.controls["businessName"].value,
      aboutYourBusiness: formData.controls["aboutYourBusiness"].value,
      street: formData.controls["street"].value,
      city: formData.controls["city"].value,
      postCode: formData.controls["postCode"].value,
      businessPhoneNumber: formData.controls["businessPhoneNumber"].value,
      businessWebsite: formData.controls["businessWebsite"].value,
      mobileNumber: formData.controls["mobileNumber"].value,
      emailAddress: formData.controls["emailAddress"].value,
      otherEmailAddress: formData.controls["otherEmailAddress"].value,
      sendFromEmailAddress: formData.controls["sendFromEmailAddress"].value,
      sendFromNameForEmail: formData.controls["sendFromNameForEmail"].value,
      sendFromNameForSMS: formData.controls["sendFromNameForSMS"].value,
      logoForMarketingPath: this.logoForMarketingPath,
      profileImageForMicrosite1: this.profileImageForMicrosite1,
      setAsDefaultMircrosite1: formData.controls["setAsDefaultMircrosite1"].value,
      profileImageForMicrosite2: this.profileImageForMicrosite2,
      setAsDefaultMircrosite2: formData.controls["setAsDefaultMircrosite2"].value,
      profileImageForMicrosite3: this.profileImageForMicrosite3,
      setAsDefaultMircrosite3: formData.controls["setAsDefaultMircrosite3"].value,
      profileImageForMicrosite4: this.profileImageForMicrosite4,
      setAsDefaultMircrosite4: formData.controls["setAsDefaultMircrosite4"].value,
      bannerImageForMicrosite: this.bannerImageForMicrosite,
      isDeleted: false
    };
    this.profileService.post(apiUrl, this.profile).subscribe((data: any) => {
      this.LoadProfile();
    });
  }
}