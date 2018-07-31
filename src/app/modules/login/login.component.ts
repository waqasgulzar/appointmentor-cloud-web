import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { Login } from './login';
import { environment } from '../../environments/environment';
import { Router } from "@angular/router";
import { UserAccountService } from '../useraccount/account.service';
const apiUrl = environment.apiUrl;
@Component({
  moduleId: module.id,
  templateUrl: 'login.html'
})
export class LoginComponent implements OnInit {
  login: Login[];
  submitted = false;
  userForm: FormGroup;
  public isValidLogin = false;
  constructor(private fb: FormBuilder, private loginService: LoginService, private router: Router, private userAccountService: UserAccountService,) { }
  ngOnInit() {
    sessionStorage.removeItem('organizationId');
    sessionStorage.removeItem('isMenuhidden');
    sessionStorage.removeItem('orgInfo');

    this.userForm = this.fb.group({
      emailAddress: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(100), Validators.email])],
      password: ['', Validators.required],
    });
  }
  onSubmit(formData: any) {
    this.submitted = true;
    if (formData.valid) {
      this.loginService.get(apiUrl, formData.value['emailAddress'], formData.value['password']).subscribe(
        (data: any) => {
          if (data && data.results && data.results[0]) {
            sessionStorage.setItem('organizationId', JSON.stringify(data.results[0]));
            sessionStorage.setItem('isMenuhidden', "false");
            this.userAccountService.get(Number(JSON.stringify(data.results[0]))).subscribe((data: any) => {
              var obj = data["results"][0];
              sessionStorage.setItem('orgInfo', JSON.stringify(obj));
              this.router.navigate(['/appointment']);
            });
          } else {
            this.isValidLogin = true;
            setTimeout(function() {
                this.isValidLogin = false;
              }.bind(this),
              8000);
          }
        });
    }
  }
}