import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { environment } from '../../../environments/environment';
const apiUrl = environment.apiUrl;
@Component({
    moduleId: module.id,
    templateUrl: 'notification.html'
})
export class NotificationComponent implements OnInit {
    constructor(private router: Router) {
        if (sessionStorage.getItem("organizationId") == null) {
            this.router.navigate(['']);
        }
    }
    ngOnInit() {
    }
}