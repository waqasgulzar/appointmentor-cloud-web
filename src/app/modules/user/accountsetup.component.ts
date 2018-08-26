import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, ValidationErrors } from '@angular/forms';
import * as _model from '../../shared/models/models';
import * as _api from '../../shared/services/api';
import { Router, ActivatedRoute } from '@angular/router';
import { UserInfoService } from '../../shared/services/userInfo.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  moduleId: module.id,
  templateUrl: 'user.accountsetup.html'
})
export class AccountSetupComponent implements OnInit {
  submitted: boolean = false;
  users: _model.User[];
  user: _model.User;
  isMenuhidden: boolean = false;
  userForm: FormGroup;
  emailAddress: FormControl;
  orgId: number = 0;
  email: string;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private userService: _api.UserService,
    private orgService: _api.OrganizationService,
    private router: Router,
    private userInfo: UserInfoService,
    private spinner: NgxSpinnerService,
    private authenticateService: _api.AuthenticationService
  ) {

  }
  ngOnInit() {
    let userInfo = JSON.parse(localStorage.getItem('currentUser'));
    this.orgId = userInfo.organizationID;
    this.email = userInfo.emailAddress;
    this.userForm = this.fb.group({
      organizationId: [this.orgId],
      firstName: ['', Validators.compose([Validators.required, Validators.maxLength(50)])],
      lastName: ['', Validators.compose([Validators.required, Validators.maxLength(50)])],
      companyName: ['', Validators.compose([Validators.required, Validators.maxLength(50)])],
      phoneNumber: ['', Validators.compose([Validators.pattern("^[0-9]*$"), Validators.required, Validators.maxLength(14)])],
      emailAddress: [this.email],
      password: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(15)])],
      timeZoneId: [''],
      currencyId: [''],
      isDeleted: ['']
    });
  }

  onSubmit(userForm: FormGroup) {
    this.submitted = true;
    if (!userForm.invalid) {
      //this.spinner.show();
      this.orgService.update(this.orgId, userForm.value).subscribe((data: any) => {
        this.authenticateService.login(userForm.value['emailAddress'], userForm.value['password']).subscribe(result => {
          if (result) {
            this.userService.getCurrentUser().subscribe((data: any) => {
              localStorage.setItem('currentUser', JSON.stringify(data));
              this.userInfo.setInfo(data);
              this.router.navigate(['/appointment']);
              this.spinner.hide();
            });
          }
        }, error => {
          this.spinner.hide();
        });
      });
    }
    else { this.getFormValidationErrors(); }
  }

  getFormValidationErrors() {
    Object.keys(this.userForm.controls).forEach(key => {
      const controlErrors: ValidationErrors = this.userForm.get(key).errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach(keyError => {
          console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
        });
      }
    });
  }
}
