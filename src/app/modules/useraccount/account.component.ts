import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserAccountService } from './account.service';
import { environment } from '../../environments/environment';
import { Router } from "@angular/router";
const apiUrl = environment.apiUrl;
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
    private userAccountService: UserAccountService,
    private router: Router
  )
  {
    if (sessionStorage.getItem("organizationId") == null) {
      this.router.navigate(['']);
    }
  }
  ngOnInit() {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      emailAddress: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(100), Validators.email])],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    },
      { validator: this.passwordMatchValidator });
    this.LoadUser();
    this.isSuccessfulMessage = false;
    this.isPasswordMatch = true;
  }
  passwordMatchValidator(frm: FormGroup) {
    return frm.controls['password'].value === frm.controls['confirmPassword'].value ? null : { 'mismatch': true };
  }
  LoadUser() {
    this.userAccountService.get(Number(sessionStorage.getItem("organizationId"))).subscribe((data: any) => {
      var obj = data["results"][0];
      this.userForm.controls['firstName'].setValue(obj["firstName"]);
      this.userForm.controls['lastName'].setValue(obj["lastName"]);
      this.userForm.controls['emailAddress'].setValue(obj["emailAddress"]);
    });
  }
  onSubmit(formData: any) {
    this.submitted = true;
    var uniqueId = window.location.href.substr(window.location.href.lastIndexOf('/') + 1);
    if (formData.value['password'].trim() != formData.value['confirmPassword'].trim()) {
      this.isPasswordMatch = false;
      this.isSuccessfulMessage = false;
    }
    else {
      this.userAccountService.put(Number(sessionStorage.getItem("organizationId")), formData.value['firstName'], formData.value['lastName'], formData.value['password']).subscribe((data: any) => {
        this.isSuccessfulMessage = true;
        this.isPasswordMatch = true;
      });
    }
  }
}