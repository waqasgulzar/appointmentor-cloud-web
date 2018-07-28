import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ForgotService } from './forgot.service';
import { environment } from '../../environments/environment';
const apiUrl = environment.apiUrl;
@Component({
    moduleId: module.id,
    templateUrl: 'forgot.html'
})
export class ForgotComponent implements OnInit {
    userForm: FormGroup;
    public isEmailSendMessage = false;
    constructor(private fb: FormBuilder, private forgotService: ForgotService) { }
    ngOnInit() {
        this.userForm = this.fb.group({
            emailAddress: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(100), Validators.email])],
        });
    }
    onSubmit(formData: any) {
        this.forgotService.put(apiUrl, formData.value['emailAddress']).subscribe((data: any) => {});
        this.isEmailSendMessage = true;
    }
}