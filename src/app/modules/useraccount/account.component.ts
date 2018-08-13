import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import * as _api from '../../shared/services/api';
import { Router } from '@angular/router';
@Component({
  moduleId: module.id,
  templateUrl: 'user.account.html'
})
export class UserAccountComponent implements OnInit {
  userForm: FormGroup;
  isSuccessfulMessage: boolean = false;
  submitted = false;
  public isPasswordMatch = true;
  constructor(
    private fb: FormBuilder,
    private userAccountService: _api.UserService,
    private router: Router
  ) {
    
  }
  ngOnInit() {
    this.userForm = this.fb.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        emailAddress: [
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(100),
            Validators.email
          ])
        ],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required]
      },
      { validator: this.passwordMatchValidator }
    );
    this.LoadUser();
    this.isSuccessfulMessage = false;
    this.isPasswordMatch = true;
  }
  passwordMatchValidator(frm: FormGroup) {
    return frm.controls['password'].value ===
      frm.controls['confirmPassword'].value
      ? null
      : { mismatch: true };
  }
  LoadUser() {
    
  }
  onSubmit(formData: any) {
    
  }
}
