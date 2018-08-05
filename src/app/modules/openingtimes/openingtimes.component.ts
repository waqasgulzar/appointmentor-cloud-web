import { Component, OnInit, Input } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { UserAccountService } from '../../modules/useraccount/account.service';
import { OpeningTimesService } from './openingtimes.service';
import { OpeningTime, Timings } from './openingtime';
import { Router } from '@angular/router';
import { NotificationService } from '../../shared/services/notification.service';
import { NotificationProperties } from '../../shared/interfaces/NotificationProperties';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'openingtimes-component',
  moduleId: module.id,
  templateUrl: 'openingtimes.html'
})
export class OpeningTimesComponent implements OnInit {
  timezonelist: any[];
  currencylist: any[];
  openingTimes: Array<OpeningTime> = [];
  openingTime: OpeningTime;
  timings: Timings = new Timings();
  userForm: FormGroup;
  emailAddress: FormControl;
  selectedTimeZone: string;
  selectedCurrency: string;
  selected = [];

  constructor(
    private fb: FormBuilder,
    private userAccountService: UserAccountService,
    private openingtimesService: OpeningTimesService,
    private notificationService: NotificationService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) {}
  ngOnInit() {
    this.LoadTimeZone();
    this.LoadCurrency();
    this.LoadOpeningtimes();
  }

  dayOfWeek(dayIndex) {
    return [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday'
    ][dayIndex];
  }

  getHour(time) {
    return time.substr(0, 2);
  }

  getMinute(time) {
    return time.substr(3, 2);
  }

  onSelect({ selected }) {
    console.log(selected);
  }

  updateIsOpen($event, rowIndex, isSelected) {
    this.openingTimes[rowIndex]['isOpen'] = !isSelected;
  }

  updateValue(event, cell, rowIndex, type) {
    let opTime = this.openingTimes[rowIndex];
    if (type == 'hour') {
      this.openingTimes[rowIndex][cell] = this.openingTimes[rowIndex][
        cell
      ].replace(
        this.openingTimes[rowIndex][cell].substr(0, 2),
        event.target.value
      );
    } else {
      this.openingTimes[rowIndex][cell] = this.openingTimes[rowIndex][
        cell
      ].replace(
        this.openingTimes[rowIndex][cell].substr(3, 2),
        event.target.value
      );
    }
    this.openingTimes = [...this.openingTimes];
  }

  updateAllTimings(event, rowIndex) {
    for (let i: number = 0; i < this.openingTimes.length; i++) {
      this.openingTimes[i].openingTime = this.openingTimes[
        rowIndex
      ].openingTime;
      this.openingTimes[i].closingTime = this.openingTimes[
        rowIndex
      ].closingTime;
    }
  }

  LoadOpeningtimes() {
    this.openingtimesService
      .get(Number(sessionStorage.getItem('organizationId')))
      .subscribe((data: any) => {
        var obj = data['results'];
        this.openingTimes = data['results'];
        this.selected = this.openingTimes.filter(op => op.isOpen === true);
      });
  }
  LoadTimeZone() {
    this.openingtimesService
      .getByCategory('Timezone')
      .subscribe((data: any) => {
        this.timezonelist = data['results'];
        this.userAccountService
          .get(Number(sessionStorage.getItem('organizationId')))
          .subscribe((data: any) => {
            var obj = data['results'][0];
            this.selectedTimeZone = obj['timezoneId'];
          });
      });
  }
  LoadCurrency() {
    this.openingtimesService
      .getByCategory('Currency')
      .subscribe((data: any) => {
        this.currencylist = data['results'];
        this.userAccountService
          .get(Number(sessionStorage.getItem('organizationId')))
          .subscribe((data: any) => {
            var obj = data['results'][0];
            this.selectedCurrency = obj['currencyId'];
          });
      });
  }

  onSubmit(formData: any) {
    this.spinner.show();
    this.openingtimesService.postOpeningTime(this.openingTimes).subscribe(
      (data: any) => {
        const successNotification: NotificationProperties = {
          message: 'Opening timings has been updated successfully.',
          title: 'Openining Timings'
        };
        this.notificationService.success(successNotification);
        this.spinner.hide();
      },
      error => {
        this.spinner.hide();
        const errorNotification: NotificationProperties = {
          message: error.error,
          title: 'Openining Timings'
        };
        this.notificationService.error(errorNotification);
      }
    );
  }
}
