import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ResetService } from './reset.service';
import { environment } from '../../environments/environment';
const apiUrl = environment.apiUrl;
@Component({
    moduleId: module.id,
    templateUrl: 'reset.html'
})
export class ResetComponent implements OnInit {
    userForm: FormGroup;
    isLinkExpired: boolean = false;
    isReset: boolean = false;
    public isPasswordMatch = true;
    constructor(private fb: FormBuilder, private resetService: ResetService) {
        this.get();
    }
    ngOnInit() {
        this.userForm = this.fb.group({
            password: ['', Validators.required],
            confirmPassword: ['', Validators.required],
        });
    }
    get()
    {
        var uniqueId = window.location.href.substr(window.location.href.lastIndexOf('/') + 1);
        this.resetService.get(apiUrl, uniqueId).subscribe((data: any) => {
            if (data["results"][0]) {
                //Unique Id exist
                this.isLinkExpired = false;
                this.isReset = false;
            }
            else {
                //Link has been expired.
                this.isLinkExpired = true;
                this.isReset = false;
            }
        });
    }
    onSubmit(formData: any) {
        var uniqueId = window.location.href.substr(window.location.href.lastIndexOf('/') + 1);
        if (formData.value['password'].trim() != formData.value['confirmPassword'].trim())
        {
            this.isPasswordMatch = false;
        }
        else {
            this.resetService.put(apiUrl, uniqueId, formData.value['password']).subscribe((data: any) => {
                this.isReset = true;
                this.isLinkExpired = false;
                this.isPasswordMatch = true;
            });
        }
    }
}