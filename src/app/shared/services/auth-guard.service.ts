import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import * as _api from './api';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(public auth: _api.AuthenticationService, public router: Router) { }
  canActivate(): boolean {
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}