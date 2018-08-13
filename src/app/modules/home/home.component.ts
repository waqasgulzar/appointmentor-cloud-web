import { Component, OnInit } from '@angular/core';
import * as _api from '../../shared/services/api';

@Component({
  moduleId: module.id,
  templateUrl: 'home.html'
})


export class HomeComponent implements OnInit {
  constructor(
    private authenticateService: _api.AuthenticationService
    ) {
  }


  ngOnInit() {
    this.authenticateService.logout();
  }

}
