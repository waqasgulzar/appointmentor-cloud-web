import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
//import { LoginService } from './login.service';
import { Router } from "@angular/router";
import { NgxSpinnerService } from 'ngx-spinner';
import { Constant } from '../../shared/constants/constants';
import { UserInfoService } from '../../shared/services/userInfo.service';
import * as _model from '../../shared/models/models';
import * as _api from '../../shared/services/api';

@Component({
  moduleId: module.id,
  templateUrl: 'login.html'
})
export class LoginComponent implements OnInit {
  submitted = false;
  userForm: FormGroup;
  public isValidLogin = false;

  constructor(
    private spinner: NgxSpinnerService,
    private fb: FormBuilder,
    //private loginService: LoginService,
    private router: Router,
    private userService: _api.UserService,
    private authenticateService: _api.AuthenticationService,
    private userInfo: UserInfoService) {
  }

  ngOnInit() {
    this.authenticateService.logout();

    this.userForm = this.fb.group({
      emailAddress: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(100), Validators.email])],
      password: ['', Validators.required],
    });
  }

  onSubmit(formData: any) {
    this.submitted = true;
    if (formData.valid) {
      this.spinner.show();
      this.authenticateService.login(formData.value['emailAddress'], formData.value['password']).subscribe(result => {
        if (result) {
          this.userService.getCurrentUser().subscribe((data: any) => {
            localStorage.setItem('currentUser', JSON.stringify(data));
            this.userInfo.setInfo(data);
            this.router.navigate(['/appointment']);
            //if (data) {
            //  var obj = data[0];
            //  this.userInfo.setInfo(obj);
            //  sessionStorage.setItem('orgInfo', JSON.stringify(obj));
            //  this.router.navigate(['/appointment']);

            //  //sessionStorage.setItem('organizationId', JSON.stringify(data.results[0]));
            //  //sessionStorage.setItem('isMenuhidden', "false");
            //  //this.userAccountService.get(Number(JSON.stringify(data.results[0]))).subscribe((data: any) => {
            //  //  var obj = data["results"][0];
            //  //  this.userInfo.setInfo(obj);
            //  //  sessionStorage.setItem('orgInfo', JSON.stringify(obj));
            //  //  this.router.navigate(['/appointment']);
            //  //});
            //} else {
            //  this.isValidLogin = true;
            //  this.spinner.hide();
            //  setTimeout(function () {
            //    this.isValidLogin = false;
            //  }.bind(this),
            //    8000);
            //}
          });
          
        } else {
          this.isValidLogin = true;
          this.spinner.hide();
        }
      }, error => {
        this.isValidLogin = false;
        this.spinner.hide();
      });

      //this.loginService.token(formData.value['emailAddress'], formData.value['password']).subscribe(
      //  (data: any) => {
      //    if (data) {
      //      sessionStorage.setItem('token', data.access_token);
      //      this.userService.getAll().subscribe((data: any) => {
      //        console.log(data);
      //        //if (data) {
      //        //  var obj = data[0];
      //        //  this.userInfo.setInfo(obj);
      //        //  sessionStorage.setItem('orgInfo', JSON.stringify(obj));
      //        //  this.router.navigate(['/appointment']);

      //        //  //sessionStorage.setItem('organizationId', JSON.stringify(data.results[0]));
      //        //  //sessionStorage.setItem('isMenuhidden', "false");
      //        //  //this.userAccountService.get(Number(JSON.stringify(data.results[0]))).subscribe((data: any) => {
      //        //  //  var obj = data["results"][0];
      //        //  //  this.userInfo.setInfo(obj);
      //        //  //  sessionStorage.setItem('orgInfo', JSON.stringify(obj));
      //        //  //  this.router.navigate(['/appointment']);
      //        //  //});
      //        //} else {
      //        //  this.isValidLogin = true;
      //        //  this.spinner.hide();
      //        //  setTimeout(function () {
      //        //    this.isValidLogin = false;
      //        //  }.bind(this),
      //        //    8000);
      //        //}
      //      });
      //    }
      //  });
    }
  }
}