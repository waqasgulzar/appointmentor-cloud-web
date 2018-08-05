import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { CustomerReportService } from './customerreport.service';
import { Router } from '@angular/router';

@Component({
  moduleId: module.id,
  templateUrl: 'customerreport.html'
})
export class CustomerReportComponent implements OnInit {
  constructor(
    private customerReportService: CustomerReportService,
    private router: Router
  ) {
    if (sessionStorage.getItem('organizationId') == null) {
      this.router.navigate(['']);
    }
  }
  ngOnInit() {}
}
