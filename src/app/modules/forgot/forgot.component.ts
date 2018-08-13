import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as _model from '../../shared/models/models';
import * as _api from '../../shared/services/api';

@Component({
    moduleId: module.id,
    templateUrl: 'forgot.html'
})
export class ForgotComponent implements OnInit {
    userForm: FormGroup;
    public isEmailSendMessage = false;
  constructor(private fb: FormBuilder, private forgotService: _api.ForgotPasswordService) { }
    ngOnInit() {
        this.userForm = this.fb.group({
            emailAddress: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(100), Validators.email])],
        });
    }
  onSubmit(formData: any) {
    //let user = { formData.value['emailAddress'] };
    //this.forgotService.update().subscribe((data: any) => { });
    //    this.isEmailSendMessage = true;
    //}
  }
}