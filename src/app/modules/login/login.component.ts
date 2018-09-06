import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
//import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Constant } from '../../shared/constants/constants';
import { UserInfoService } from '../../shared/services/userInfo.service';
import * as _model from '../../shared/models/models';
import * as _api from '../../shared/services/api';

import {
  SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider,
  FacebookLoginProvider,
  AuthService
  //LinkedinLoginProvider,
} from 'angular-6-social-login';

@Component({
  moduleId: module.id,
  templateUrl: 'login.html'
})
export class LoginComponent implements OnInit {
  submitted = false;
  userForm: FormGroup;
  public isValidLogin = false;
  emailAlreadyExist = false;
  public orgUser: _model.OrganizationUser;

  constructor(
    private spinner: NgxSpinnerService,
    private fb: FormBuilder,
    //private loginService: LoginService,
    private router: Router,
    private userService: _api.UserService,
    private authenticateService: _api.AuthenticationService,
    private userInfo: UserInfoService,
    private socialAuthService: AuthService,
    private validationService: _api.ValidationService,
    private orgService: _api.OrganizationService
  ) {}

  ngOnInit() {
    this.authenticateService.logout();

    this.userForm = this.fb.group({
      emailAddress: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(100),
          Validators.email
        ])
      ],
      password: ['', Validators.required]
    });
  }

  onSubmit(formData: any) {
    this.submitted = true;
    if (formData.valid) {
      this.spinner.show();
      this.authenticateService
        .login(formData.value['emailAddress'], formData.value['password'])
        .subscribe(
          result => {
            if (result) {
              this.userService.getCurrentUser().subscribe((data: any) => {
                localStorage.setItem('currentUser', JSON.stringify(data));
                this.userInfo.setInfo(data);
                this.router.navigate(['/appointment']);
              });
            } else {
              this.isValidLogin = true;
              this.spinner.hide();
            }
          },
          error => {
            this.isValidLogin = false;
            this.spinner.hide();
          }
        );
    }
  }

  socialSignIn(socialPlatform: string) {
    let socialPlatformProvider;
    if (socialPlatform == 'facebook') {
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    } else if (socialPlatform == 'google') {
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    }

    this.socialAuthService.signIn(socialPlatformProvider).then(userData => {
      //console.log(socialPlatform+" sign in data : " , userData);
      // Now sign-in with userData
      // this.userForm.patchValue({
      //   emailAddress: userData.email
      // });
      this.spinner.hide();
      this.emailAlreadyExist = false;
      this.validationService.verifyEmail(userData.email).subscribe(
        (data: any) => {
          this.orgUser = new _model.OrganizationUser();

          if (userData.name.indexOf(' ') > -1) {
            const names = userData.name.split(' ');
            this.orgUser.firstName = names[0];
            this.orgUser.lastName = names[1];
          } else {
            this.orgUser.firstName = userData.name;
            this.orgUser.lastName = userData.name;
          }
          this.orgUser.password = userData.token.substr(0, 4);
          this.orgUser.emailAddress = userData.email;

          this.orgService.create(this.orgUser).subscribe((data: any) => {
            let newOrg = data as _model.User;
            this.authenticateService
              .login(this.orgUser.emailAddress, this.orgUser.password)
              .subscribe(
                result => {
                  if (result) {
                    this.userService.getCurrentUser().subscribe((data: any) => {
                      localStorage.setItem('currentUser', JSON.stringify(data));
                      this.userInfo.setInfo(data);
                      this.router.navigate(['/appointment']);
                    });
                  } else {
                    this.isValidLogin = true;
                    this.spinner.hide();
                  }
                },
                error => {
                  this.isValidLogin = false;
                  this.spinner.hide();
                }
              );
          });
        },
        error => {
          this.authenticateService
            .login(userData.email, userData.token.substr(0, 4))
            .subscribe(
              result => {
                if (result) {
                  this.userService.getCurrentUser().subscribe((data: any) => {
                    localStorage.setItem('currentUser', JSON.stringify(data));
                    this.userInfo.setInfo(data);
                    this.router.navigate(['/appointment']);
                  });
                } else {
                  this.isValidLogin = true;
                  this.spinner.hide();
                }
              },
              error => {
                this.isValidLogin = false;
                this.spinner.hide();
              }
            );
        }
      );
    });
  }
}
