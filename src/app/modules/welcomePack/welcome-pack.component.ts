import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OrganizationInfo, Profile } from '../setting/user/organizationuser';
import { NotificationService } from '../../shared/services/notification.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationProperties } from '../../shared/interfaces/NotificationProperties';
import { UserInfoService } from '../../shared/services/userInfo.service';
import { UploadFileService } from '../../shared/upload/fileupload.service';
import { MatChipInputEvent } from '@angular/material';


@Component({
  moduleId: module.id,
  templateUrl: 'welcome-pack.html'
})

export class WelcomePackComponent implements OnInit {
  orgInfo = new OrganizationInfo();
  userForm: FormGroup;
  submitted = false;
  types: Array<any>;
  cclist = [
    { email: this.userInfo.orgInfo.emailAddress },
  ];
  editorConfig = {
    editable: true,
    spellcheck: false,
    height: '30rem',
    minHeight: '15rem',
    placeholder: 'Type your message here...',
    translate: 'no'
  };
  htmlContent = '<p>Hi</p>';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private notificationService: NotificationService,
    private spinner: NgxSpinnerService,
    private userInfo: UserInfoService,
    private uploadFileService: UploadFileService,
  ) {

  }

  ngOnInit() {
    this.orgInfo = this.userInfo.orgInfo;
    this.types = [{ id: 1, title: 'Appointment Booking' }, {id:2, title:'Appointment Cancellation'}];
    this.userForm = this.fb.group({
      organizationId: this.orgInfo.organizationId,
      typeId: [0, [Validators.required]],
      cc: [''],
      subject: ['', Validators.compose([Validators.required, Validators.maxLength(50), Validators.pattern('^[a-zA-Z0-9 ]*$')])],
      message: ['', Validators.compose([Validators.required, Validators.maxLength(500)])],
    });
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.cclist.push({ email: value.trim() });
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(cc): void {
    const index = this.cclist.indexOf(cc);

    if (index >= 0) {
      this.cclist.splice(index, 1);
    }
  }

  onSubmit(userForm: FormGroup) {

  }
}
