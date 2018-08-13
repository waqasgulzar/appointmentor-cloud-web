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
  templateUrl: 'onlinebooking.html'
})
export class OnlineBookingSettingComponent implements OnInit {
  onlineBookingSetting: _model.OnlineBookingSetting
  timezonelist: any[];
  userForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private onlineBookingSettingService: _api.OnlineAppointmentBookingSettingsService,
    private openingtimesService: _api.OpeningTimeService,
    private router: Router
  ) {
    
  }

  ngOnInit() {
    this.userForm = this.fb.group({
      isCustomAllowBooking: [true],
      noticeForOnlineBooking: [''],
      blockAvailabilityAfter: [''],
      isShowPrice: [true],
      isCustomerSelectResourceGroup: [true],
      isCustomerSelectResources: [true],
      showResourceSelection: [''],
      isShowResourceImage: [true],
      isCustomerAllowAny: [true],
      defaultTimeZoneID: [''],
      timeIncrementsAvailability: [''],
      noAvailabilityMessage: [''],
      isCustomerBookwithoutAccount: [true],
      isMobileRequired: [true],
      isNotesForOnlineBooking: [true],
      notesForOnlineBooking: [''],
      confirmationMessageForBooking: [''],
      noticeForCancellation: [''],
      isCustomerCancelFromConfirmation: [true]
    });
    this.LoadTimeZone();
    this.LoadEmailSetting();
  }
  LoadTimeZone() {
    this.openingtimesService.getAll()
      .subscribe((data: any) => {
        this.timezonelist = data;
      });
  }
  onSubmit(formData: any) {
    let onlineBookingSetting = {
      onlineBookingSettingID: 0,
      organizationID: Number(sessionStorage.getItem('organizationId')),
      isCustomAllowBooking: formData.controls['isCustomAllowBooking'].value,
      noticeForOnlineBooking: formData.controls['noticeForOnlineBooking'].value,
      blockAvailabilityAfter: formData.controls['blockAvailabilityAfter'].value,
      isShowPrice: formData.controls['isShowPrice'].value,
      isCustomerSelectResourceGroup:
        formData.controls['isCustomerSelectResourceGroup'].value,
      isCustomerSelectResources:
        formData.controls['isCustomerSelectResources'].value,
      showResourceSelection: formData.controls['showResourceSelection'].value,
      isShowResourceImage: formData.controls['isShowResourceImage'].value,
      isCustomerAllowAny: formData.controls['isCustomerAllowAny'].value,
      defaultTimeZoneID: formData.controls['defaultTimeZoneID'].value,
      timeIncrementsAvailability:
        formData.controls['timeIncrementsAvailability'].value,
      noAvailabilityMessage: formData.controls['noAvailabilityMessage'].value,
      isCustomerBookwithoutAccount:
        formData.controls['isCustomerBookwithoutAccount'].value,
      isMobileRequired: formData.controls['isMobileRequired'].value,
      isNotesForOnlineBooking:
        formData.controls['isNotesForOnlineBooking'].value,
      notesForOnlineBooking: formData.controls['notesForOnlineBooking'].value,
      confirmationMessageForBooking:
        formData.controls['confirmationMessageForBooking'].value,
      noticeForCancellation: formData.controls['noticeForCancellation'].value,
      isCustomerCancelFromConfirmation:
        formData.controls['isCustomerCancelFromConfirmation'].value,
      isDeleted: false
    } as _model.OnlineBookingSetting;

    this.onlineBookingSettingService.create(onlineBookingSetting)
      .subscribe((data: any) => {});
  }
  LoadEmailSetting() {
    this.onlineBookingSettingService
      .getAll()
      .subscribe((data: any) => {
        var obj = data[0];
        
        this.userForm = this.fb.group({
          isCustomAllowBooking: [obj['isCustomAllowBooking']],
          noticeForOnlineBooking: [obj['noticeForOnlineBooking']],
          blockAvailabilityAfter: [obj['blockAvailabilityAfter']],
          isShowPrice: [obj['isShowPrice']],
          isCustomerSelectResourceGroup: [obj['isCustomerSelectResourceGroup']],
          isCustomerSelectResources: [obj['isCustomerSelectResources']],
          showResourceSelection: [obj['showResourceSelection']],
          isShowResourceImage: [obj['isShowResourceImage']],
          isCustomerAllowAny: [obj['isCustomerAllowAny']],
          defaultTimeZoneID: [obj['defaultTimeZoneID']],
          timeIncrementsAvailability: [obj['timeIncrementsAvailability']],
          noAvailabilityMessage: [obj['noAvailabilityMessage']],
          isCustomerBookwithoutAccount: [obj['isCustomerBookwithoutAccount']],
          isMobileRequired: [obj['isMobileRequired']],
          isNotesForOnlineBooking: [obj['isNotesForOnlineBooking']],
          notesForOnlineBooking: [obj['notesForOnlineBooking']],
          confirmationMessageForBooking: [obj['confirmationMessageForBooking']],
          noticeForCancellation: [obj['noticeForCancellation']],
          isCustomerCancelFromConfirmation: [
            obj['isCustomerCancelFromConfirmation']
          ]
        });
      });
  }
}
