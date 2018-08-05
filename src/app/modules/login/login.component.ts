import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { Login } from './login';
import { Router } from "@angular/router";
import { UserAccountService } from '../useraccount/account.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Constant } from '../../shared/constants/constants';
import { OrganizationInfo } from '../setting/user/organizationuser';
import { UserInfoService } from '../../shared/services/userInfo.service';

@Component({
  moduleId: module.id,
  templateUrl: 'login.html'
})
export class LoginComponent implements OnInit {
  login: Login[];
  submitted = false;
  userForm: FormGroup;
  public isValidLogin = false;

  constructor(
    private spinner: NgxSpinnerService,
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private userAccountService: UserAccountService,
    private userInfo: UserInfoService) {

  }

  ngOnInit() {
    sessionStorage.removeItem('organizationId');
    sessionStorage.removeItem('isMenuhidden');
    sessionStorage.removeItem('orgInfo');

    this.userForm = this.fb.group({
      emailAddress: [
        '',
        Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(100), Validators.email])
      ],
      password: ['', Validators.required],
    });
  }

  onSubmit(formData: any) {
    this.submitted = true;
    if (formData.valid) {
      this.spinner.show();
      this.loginService.get(formData.value['emailAddress'], formData.value['password']).subscribe(
        (data: any) => {
          if (data && data.results && data.results[0]) {
            
            sessionStorage.setItem('organizationId', JSON.stringify(data.results[0]));
            sessionStorage.setItem('isMenuhidden', "false");
            this.userAccountService.get(Number(JSON.stringify(data.results[0]))).subscribe((data: any) => {
              var obj = data["results"][0];
              this.userInfo.setInfo(obj);
              sessionStorage.setItem('orgInfo', JSON.stringify(obj));
              this.router.navigate(['/appointment']);
            });
          } else {
            this.isValidLogin = true;
            this.spinner.hide();
            setTimeout(function() {
                this.isValidLogin = false;
              }.bind(this),
              8000);
          }
        });
    }
  }
}