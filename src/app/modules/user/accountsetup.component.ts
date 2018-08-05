import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { UserService } from './user.service';
import { User } from './user';
import { Router } from '@angular/router';
@Component({
  moduleId: module.id,
  templateUrl: 'user.accountsetup.html'
})
export class AccountSetupComponent implements OnInit {
  submitted: boolean = false;
  users: User[];
  user: User;
  isMenuhidden: boolean = false;
  userForm: FormGroup;
  emailAddress: FormControl;
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    if (sessionStorage.getItem('isMenuhidden') == 'true') {
      this.isMenuhidden = true;
    }
    if (sessionStorage.getItem('organizationId') == null) {
      this.router.navigate(['']);
    }
  }
  ngOnInit() {
    this.userForm = this.fb.group({
      organizationId: [sessionStorage.getItem('organizationId')],
      firstName: [
        '',
        Validators.compose([Validators.required, Validators.maxLength(50)])
      ],
      lastName: [
        '',
        Validators.compose([Validators.required, Validators.maxLength(50)])
      ],
      companyName: [
        '',
        Validators.compose([Validators.required, Validators.maxLength(50)])
      ],
      phoneNumber: [
        '',
        Validators.compose([
          Validators.required,
          Validators.maxLength(12),
          Validators.pattern('[0-9]{0-10}')
        ])
      ],
      emailAddress: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(100),
          Validators.email
        ])
      ],
      password: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(15)
        ])
      ],
      timeZoneId: [''],
      currencyId: [''],
      isDeleted: ['']
    });
    this.LoadUser();
  }
  LoadUser() {
    this.userService
      .getEmailAddress(Number(sessionStorage.getItem('organizationId')))
      .subscribe((data: any) => {
        var obj = data['results'][0];
        this.userForm.controls['emailAddress'].setValue(obj['emailAddress']);
      });
  }
  onSubmit(userForm: FormGroup) {
    this.submitted = true;
    if (!userForm.invalid) {
      this.userService
        .put(
          Number(sessionStorage.getItem('organizationId')),
          userForm.value
        )
        .subscribe((data: any) => {
          this.router.navigate(['/openingtimes']);
        });
    }
  }
}
