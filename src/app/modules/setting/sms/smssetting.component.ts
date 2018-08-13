import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import * as _model from '../../../shared/models/models';
import * as _api from '../../../shared/services/api';
import { Router } from '@angular/router';
@Component({
  moduleId: module.id,
  templateUrl: 'smssetting.html'
})
export class SMSSettingComponent implements OnInit {
  smsSetting: _model.SMSSetting;
  userForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private smsSettingService: _api.SmsSettingService,
    private router: Router
  ) {
    
  }
  ngOnInit() {
    this.userForm = this.fb.group({
      isBookingMade: [false],
      bookingMadeText: [''],
      isBookingModified: [false],
      bookingModifiedText: [''],
      isBookingCanceled: [false],
      bookingCanceledText: [''],
      isBookingRequested: [false],
      bookingRequestedText: [''],
      isBookingDeclined: [false],
      bookingDeclinedText: [''],
      isBookingReminder: [false],
      bookingReminderText: [''],
      amountOfNotice: [''],
      isRebooking: [false],
      rebookingText: [''],
      isBookingMadeExternal: [false],
      isBookingCanceledByCustomer: [false]
    });
    this.LoadEmailSetting();
  }
  onSubmit(formData: any) {
    let smsSetting = {
      smsSettingID: 0,
      organizationID: Number(sessionStorage.getItem('organizationId')),
      isBookingMade: formData.controls['isBookingMade'].value,
      bookingMadeText: formData.controls['bookingMadeText'].value,
      isBookingModified: formData.controls['isBookingModified'].value,
      bookingModifiedText: formData.controls['bookingModifiedText'].value,
      isBookingCanceled: formData.controls['isBookingCanceled'].value,
      bookingCanceledText: formData.controls['bookingCanceledText'].value,
      isBookingRequested: formData.controls['isBookingRequested'].value,
      bookingRequestedText: formData.controls['bookingRequestedText'].value,
      isBookingDeclined: formData.controls['isBookingDeclined'].value,
      bookingDeclinedText: formData.controls['bookingDeclinedText'].value,
      isBookingReminder: formData.controls['isBookingReminder'].value,
      bookingReminderText: formData.controls['bookingReminderText'].value,
      amountOfNotice: formData.controls['amountOfNotice'].value,
      isRebooking: formData.controls['isRebooking'].value,
      rebookingText: formData.controls['rebookingText'].value,
      isBookingMadeExternal: formData.controls['isBookingMadeExternal'].value,
      isBookingCanceledByCustomer:
        formData.controls['isBookingCanceledByCustomer'].value,
      isDeleted: false
    } as _model.SMSSetting;
    this.smsSettingService.create(this.smsSetting).subscribe((data: any) => {});
  }
  LoadEmailSetting() {
    this.smsSettingService
      .getAll()
      .subscribe((data: any) => {
        var obj = data[0];
        
        this.userForm = this.fb.group({
          isBookingMade: [obj['isBookingMade']],
          bookingMadeText: [obj['bookingMadeText']],
          isBookingModified: [obj['isBookingModified']],
          bookingModifiedText: [obj['bookingModifiedText']],
          isBookingCanceled: [obj['isBookingCanceled']],
          bookingCanceledText: [obj['bookingCanceledText']],
          isBookingRequested: [obj['isBookingRequested']],
          bookingRequestedText: [obj['bookingRequestedText']],
          isBookingDeclined: [obj['isBookingDeclined']],
          bookingDeclinedText: [obj['bookingDeclinedText']],
          isBookingReminder: [obj['isBookingReminder']],
          bookingReminderText: [obj['bookingReminderText']],
          amountOfNotice: [obj['amountOfNotice']],
          isRebooking: [obj['isRebooking']],
          rebookingText: [obj['rebookingText']],
          isBookingMadeExternal: [obj['isBookingMadeExternal']],
          isBookingCanceledByCustomer: [obj['isBookingCanceledByCustomer']]
        });
      });
  }
}
