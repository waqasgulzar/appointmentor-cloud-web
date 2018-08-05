import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';

import { Router } from '@angular/router';

@Component({
  moduleId: module.id,
  template: ''
})
export class LogoutComponent {
  constructor(private fb: FormBuilder, private router: Router) {
    this.logout();
  }
  logout() {
    sessionStorage.removeItem('organizationId');
    sessionStorage.removeItem('isMenuhidden');
    sessionStorage.removeItem('orgInfo');
    this.router.navigate(['']);
  }
}
