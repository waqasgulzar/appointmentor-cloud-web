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
  templateUrl: 'resourcereport.html'
})
export class ResourceReportComponent implements OnInit {
  constructor(
    
    private router: Router
  ) {
    if (sessionStorage.getItem('organizationId') == null) {
      this.router.navigate(['']);
    }
  }
  ngOnInit() {}
}
