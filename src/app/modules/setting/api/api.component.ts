import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validator } from '@angular/forms';
import * as _model from '../../../shared/models/models';
import * as _api from '../../../shared/services/api';
import { Router } from '@angular/router';

@Component({
  moduleId: module.id,
  templateUrl: 'api.html'
})
export class ApiComponent implements OnInit {
  apiCredentials: _model.ApiCredential = new _model.ApiCredential();
  constructor(
    private router: Router,
    private profileService: _api.ProfileService
  ) {

  }
  ngOnInit() {
    this.profileService.getCredentials().subscribe(response => {
      this.apiCredentials = response;
    });
  }
}
