import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';

import { Router } from '@angular/router';
import * as _api from '../../shared/services/api';

@Component({
  moduleId: module.id,
  template: ''
})
export class LogoutComponent {
  constructor(private fb: FormBuilder, private router: Router, private authenticateService: _api.AuthenticationService) {
    this.logout();
  }
  logout() {
    this.authenticateService.logout();
    this.router.navigate(['']);
  }
}
