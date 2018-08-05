﻿import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { BusinessReportService } from './businessreport.service';
import { Router } from '@angular/router';

@Component({
  moduleId: module.id,
  templateUrl: 'businessreport.html'
})
export class BusinessReportComponent implements OnInit {
  constructor(
    private businessReportService: BusinessReportService,
    private router: Router
  ) {
    if (sessionStorage.getItem('organizationId') == null) {
      this.router.navigate(['']);
    }
  }
  ngOnInit() {}
}
