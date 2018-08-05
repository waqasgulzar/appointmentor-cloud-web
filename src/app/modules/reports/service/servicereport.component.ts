import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { ServiceReportService } from './servicereport.service';
import { Router } from '@angular/router';
@Component({
  moduleId: module.id,
  templateUrl: 'servicereport.html'
})
export class ServiceReportComponent implements OnInit {
  constructor(
    private serviceReportService: ServiceReportService,
    private router: Router
  ) {
    if (sessionStorage.getItem('organizationId') == null) {
      this.router.navigate(['']);
    }
  }
  ngOnInit() {}
}
