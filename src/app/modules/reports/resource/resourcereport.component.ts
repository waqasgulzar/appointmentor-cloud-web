import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ResourceReportService } from './resourcereport.service';
import { Router } from "@angular/router";
import { environment } from '../../../environments/environment';
const apiUrl = environment.apiUrl;
@Component({
    moduleId: module.id,
    templateUrl: 'resourcereport.html'
})
export class ResourceReportComponent implements OnInit {
    constructor(private resourceReportService: ResourceReportService, private router: Router) {
        if (sessionStorage.getItem("organizationId") == null) {
            this.router.navigate(['']);
        }
    }
    ngOnInit() {
    }
}