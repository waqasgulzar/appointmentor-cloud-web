import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import * as _model from '../../shared/models/models';
import * as _api from '../../shared/services/api';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserInfoService } from '../../shared/services/userInfo.service';
@Component({
  moduleId: module.id,
  templateUrl: 'user.registration.html'
})
export class UserComponent implements OnInit {
  users: _model.User[];
  userForm: FormGroup;
  emailAddress: FormControl;
  organizationId: number;
  submitted = false;
  emailAlreadyExist = false;
  constructor(
    private fb: FormBuilder,
    private validationService: _api.ValidationService,
    private userService: _api.UserService,
    private orgService: _api.OrganizationService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private userInfo: UserInfoService,
    private authenticateService: _api.AuthenticationService
  ) { }
  ngOnInit() {
    this.authenticateService.logout();
    this.userForm = this.fb.group({
      organizationId: [''],
      firstName: [''],
      lastName: [''],
      companyName: [''],
      phoneNumber: [''],
      emailAddress: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(100), Validators.email])],
      password: [''],
      timeZoneId: [''],
      currencyId: [''],
      isDeleted: ['']
    });
  }
  onSubmit(formData: any) {
    this.submitted = true;

    this.emailAlreadyExist = false;
    if (formData.valid) {
      this.spinner.show();
      this.validationService.verifyEmail(formData.value['emailAddress'])
        .subscribe(
          (data: any) => {
            this.emailAlreadyExist = false;
            this.orgService.create(formData.value).subscribe((data: any) => {
              let newOrg = data as _model.User;
              localStorage.setItem('currentUser', JSON.stringify(newOrg));
              this.userInfo.setInfo(data);
              this.spinner.hide();
              this.router.navigate(['/accountsetup']);
            });
          },
          error => { this.emailAlreadyExist = true; this.spinner.hide(); }
        );

      //.subscribe((data: any) => {
      //  if (data[0]) {
      //    this.emailAlreadyExist = true;
      //  } else {
      //    this.emailAlreadyExist = false;
      //    this.userService.create(formData.value).subscribe((data: any) => {
      //      this.router.navigate(['/accountsetup']);
      //    });
      //  }
      //});
    }
  }
}
