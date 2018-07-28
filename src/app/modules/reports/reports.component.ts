import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ReportsService } from './reports.service';
import { Router } from "@angular/router";
import { environment } from '../../environments/environment';
const apiUrl = environment.apiUrl;
@Component({
    moduleId: module.id,
    templateUrl: 'reports.html'
})
export class ReportsComponent implements OnInit {
    constructor(private reportsService: ReportsService, private router: Router) {
        if (sessionStorage.getItem("organizationId") == null) {
            this.router.navigate(['']);
        }
    }
    ngOnInit() {
    }
}