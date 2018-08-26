import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import * as _model from '../../../shared/models/models';
import * as _api from '../../../shared/services/api';
import { Router } from '@angular/router';
import { UserInfoService } from '../../../shared/services/userInfo.service';
import { Observable } from 'rxjs/Observable';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { NotificationService } from '../../../shared/services/notification.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationProperties } from '../../../shared/interfaces/NotificationProperties';

@Component({
  moduleId: module.id,
  templateUrl: 'general.html'
})
export class GeneralComponent implements OnInit {
  orgInfo = new _model.User();
  timezonelist: _model.Lookup;
  currencylist: _model.Lookup;
  selectedTimeZone: string;
  selectedCurrency: string;
  messageText: string = '';
  isHidden: boolean = true;
  userForm: FormGroup;
  submitted = false;
  constructor(
    private fb: FormBuilder,
    public userInfo: UserInfoService,
    private orgService: _api.OrganizationService,
    private notificationService: NotificationService,
    private spinner: NgxSpinnerService,
    private userAccountService: _api.UserService,
    private openingtimesService: _api.OpeningTimeService,
    private lookupSrv: _api.LookupService,
    private router: Router
  ) {


  }

  ngOnInit() {
    this.orgInfo = this.userInfo.currentUser;

    this.userForm = this.fb.group({
      organizationId: [this.orgInfo.organizationId],
      firstName: [this.orgInfo.firstName],
      lastName: [this.orgInfo.lastName],
      companyName: [this.orgInfo.companyName],
      phoneNumber: [this.orgInfo.phoneNumber],
      emailAddress: [this.orgInfo.emailAddress],
      timeZoneId: [this.orgInfo.timezoneId],
      currencyId: [this.orgInfo.currencyId],
      dateFormat: ['mm/dd/yyyy'],
      calendarIntervalIncrement: ['15'],
      isDeleted: ['']
    });

    Observable.forkJoin(
      this.lookupSrv.load('Currency'),
      this.lookupSrv.load('Timezone')
    ).subscribe(([currencies, timezones]) => {
      this.currencylist = currencies;
      this.timezonelist = timezones;

      //this.userForm = this.fb.group({
      //  calendarIntervalIncrement: ['15'],
      //  dateFormat: ['mm/dd/yyyy'],
      //  timeZone: [this.orgInfo.timezoneId],
      //  currency: [this.orgInfo.currencyId]
      //});
    },
      err => console.error(err)
    );
  }

  loadCurrency() {
    this.lookupSrv.load('Currency').subscribe((data: any) => {
      this.currencylist = data;
    });
  }

  loadTimeZone() {
    this.lookupSrv.load('Timezone').subscribe((data: any) => {
      this.currencylist = data;
    });
  }

  onSubmit(formData: any) {
    this.submitted = true;
    if (!formData.invalid) {
      this.spinner.show();
      this.orgService.update(this.orgInfo.organizationId, formData.value).subscribe(
        (data: any) => {
          const successNotification: NotificationProperties = {
            message: 'Settings has been updated successfully.',
            title: 'Settings'
          };
          this.notificationService.success(successNotification);
          this.spinner.hide();
        },
        error => {
          const errorNotification: NotificationProperties = {
            message: error.error,
            title: 'Settings'
          };
          this.notificationService.error(errorNotification);
          this.spinner.hide();
        });
    }
  }
}
