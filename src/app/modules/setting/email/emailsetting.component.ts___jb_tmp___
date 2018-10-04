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
  templateUrl: 'emailsetting.html'
})
export class EmailSettingComponent implements OnInit {
  emailSetting: _model.EmailSetting;
  userForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private emailSettingService: _api.EmailSettingService,
    private router: Router
  ) {

  }
  ngOnInit() {
    this.userForm = this.fb.group({
      isInternalBooking: [true],
      internalBookingText: [''],
      isExternalBooking: [true],
      isBookingModified: [false],
      bookingModifiedText: [''],
      isBookingCanceled: [false],
      bookingCanceledText: [''],
      bookingRequestedText: [''],
      bookingDeclinedText: [''],
      isBookingReminder: [false],
      bookingReminderText: [''],
      amountOfNotice: [''],
      isBookingReminderAfterOneDay: [false],
      bookingReminderAfterOneDayText: [''],
      isRebookingReminder: [false],
      rebookingReminderText: [''],
      comebackEmailAfter: [''],
      emailHeader: [''],
      emailFooter: [''],
      prefilledDirectMessage: ['']
    });
    this.LoadEmailSetting();
  }
  onSubmit(formData: any) {
    let emailSetting = {
      emailSettingID: 0,
      organizationId: Number(sessionStorage.getItem('organizationId')),
      isInternalBooking: formData.controls['isInternalBooking'].value,
      internalBookingText: formData.controls['internalBookingText'].value,
      isExternalBooking: formData.controls['isExternalBooking'].value,
      isBookingModified: formData.controls['isBookingModified'].value,
      bookingModifiedText: formData.controls['bookingModifiedText'].value,
      isBookingCanceled: formData.controls['isBookingCanceled'].value,
      bookingCanceledText: formData.controls['bookingCanceledText'].value,
      isBookingRequested: true,
      bookingRequestedText: formData.controls['bookingRequestedText'].value,
      isBookingDeclined: true,
      bookingDeclinedText: formData.controls['bookingDeclinedText'].value,
      isBookingReminder: formData.controls['isBookingReminder'].value,
      bookingReminderText: formData.controls['bookingReminderText'].value,
      amountOfNotice: formData.controls['amountOfNotice'].value,
      isBookingReminderAfterOneDay:
        formData.controls['isBookingReminderAfterOneDay'].value,
      bookingReminderAfterOneDayText:
        formData.controls['bookingReminderAfterOneDayText'].value,
      isRebookingReminder: formData.controls['isRebookingReminder'].value,
      rebookingReminderText: formData.controls['rebookingReminderText'].value,
      comebackEmailAfter: formData.controls['comebackEmailAfter'].value,
      emailHeader: formData.controls['emailHeader'].value,
      emailFooter: formData.controls['emailFooter'].value,
      prefilledDirectMessage: formData.controls['prefilledDirectMessage'].value,
      isDeleted: false
    } as _model.EmailSetting;
    this.emailSettingService.create(emailSetting)
      .subscribe((data: any) => { });
  }

  LoadEmailSetting() {
    this.emailSettingService
      .getAll()
      .subscribe((data: any) => {
        var obj = data[0];
        this.userForm = this.fb.group({
          isInternalBooking: [obj['isInternalBooking']],
          internalBookingText: [obj['internalBookingText']],
          isExternalBooking: [obj['isExternalBooking']],
          isBookingModified: [obj['isBookingModified']],
          bookingModifiedText: [obj['bookingModifiedText']],
          isBookingCanceled: [obj['isBookingCanceled']],
          bookingCanceledText: [obj['bookingCanceledText']],
          bookingRequestedText: [obj['bookingRequestedText']],
          bookingDeclinedText: [obj['bookingDeclinedText']],
          isBookingReminder: [obj['isBookingReminder']],
          bookingReminderText: [obj['bookingReminderText']],
          amountOfNotice: [obj['amountOfNotice']],
          isBookingReminderAfterOneDay: [obj['isBookingReminderAfterOneDay']],
          bookingReminderAfterOneDayText: [
            obj['bookingReminderAfterOneDayText']
          ],
          isRebookingReminder: [obj['isRebookingReminder']],
          rebookingReminderText: [obj['rebookingReminderText']],
          comebackEmailAfter: [obj['comebackEmailAfter']],
          emailHeader: [obj['emailHeader']],
          emailFooter: [obj['emailFooter']],
          prefilledDirectMessage: [obj['prefilledDirectMessage']]
        });
      });
  }
  Redirect() {
    this.router.navigate(['/emailsettingdetail']);
  }
}
