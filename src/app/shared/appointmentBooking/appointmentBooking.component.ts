import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatDialog, MatStepper, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DataService } from '../services/data.service';
import * as _model from '../../shared/models/models';
import * as _api from '../../shared/services/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CustomerEditComponent } from '../../modules/customer/customer-edit.component';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { environment } from '../../../environments/environment';
import { UserInfoService } from '../services/userInfo.service';

@Component({
  selector: 'appointmentor-booking',
  templateUrl: 'appointmentBooking.view.html'
})

export class AppointmentBookingComponent implements OnInit {
  sanitizer: any;
  secondFormGroup: FormGroup;
  firstFormGroup: FormGroup;
  customers: _model.Customer[];
  services: _model.Service[];
  resources: _model.Resource[];
  userForm: FormGroup;
  appointmentSlots: _model.AppointmentSlot[] = [];
  selectedDate: any;
  startDate: Date;
  testSlots: any;
  openingtimes: _model.Openingtimes[];
  currentDayTimings: _model.Openingtimes;
  trustedProfileImageUrl: SafeUrl;
  selectedSlot: _model.AppointmentSlot = new _model.AppointmentSlot();
  user: _model.User;
  dates: Array<any> = [];
  constructor(private dataService: DataService,
    private resourcesService: _api.ResourceService,
    private appointmentService: _api.AppointmentService,
    private _formBuilder: FormBuilder,
    private customerService: _api.CustomerService,
    private openingtimesService: _api.OpeningTimeService,
    private servicesService: _api.ServiceService,
    private router: Router,
    private spinner: NgxSpinnerService,
    public userInfo: UserInfoService,
    private dialogRef: MatDialogRef<AppointmentBookingComponent>,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public appointment: _model.Appointment
  ) {
    var r: _model.Resource;
    this.appointment.resource = r;
    this.appointment.customers = new Array<_model.Customer>();
  }

  ngOnInit() {
    this.startDate = new Date();
    this.appointment.date = this.startDate;
    this.getDates(4);

    this.user = this.userInfo.currentUser;
    this.spinner.show();
    this.dataService.requestDataFromMultipleSources().subscribe(responseList => {
      this.customers = responseList[0];
      this.services = responseList[1];
      this.resources = responseList[2];
      this.openingtimes = responseList[3];

      this.spinner.hide();
    });

    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });


  }

  setService(item, stepper: MatStepper) {
    this.appointment.service = item;
    for (let res of this.resources) {
      let day = new Date();
      this.currentDayTimings = this.openingtimes.filter(item => item.dayId == day.getDay())[0];
      res.appointmentSlots = this.generateTimeslots(res.resourceId, this.appointment.service.duration, this.currentDayTimings.openingTime, this.currentDayTimings.closingTime);
    }
    stepper.next();
  }

  setAppointmentDate(item) {
    this.appointment.date = item;
    this.appointmentSlots = [];
    this.currentDayTimings = this.openingtimes.filter(item => item.dayId == this.appointment.date.getDay())[0];
    //this.generateTimeslots(this.appointment.service.duration, this.currentDayTimings.openingTime, this.currentDayTimings.closingTime);
  }

  setAppointmentTime(resource: _model.Resource, selectedSlot: _model.AppointmentSlot, stepper: MatStepper) {
    this.appointment.resource = resource;
    this.selectedSlot = selectedSlot;
    this.appointment.time = selectedSlot.time;
    stepper.next();
  }

  setCustomer(item) {
    this.appointment.customers.push(item);
  }

  gotoApptParticipant(stepper: MatStepper) {
    stepper.next();
  }

  resetStepper(stepper: MatStepper) {
    stepper.selectedIndex = 0;
  }

  onSubmit() {
    this.dialogRef.close({ appointment: this.appointment });
  }

  onClose($event) {
    this.dialogRef.close();
  }
  generateTimeslots(resId, timeInterval, startTime, endTime) {
    if (timeInterval === 0 || timeInterval % 15 !== 0) {
      console.log("Error: Can only accept 15, 30, 60");
      return;
    }
    const intStartTime = this.convert24ToInt(startTime);
    const intEndTime = this.convert24ToInt(endTime);
    const intStep = timeInterval * 100 / 60;
    return this.genRange(resId, intStep, intStartTime, intEndTime); //.map({ 'time': this.convertIntTo24.toString() })
  }

  convert24ToInt(time) {
    const [hours, minutes] = time.split(':');
    return (hours * 100) + (minutes * 100.0 / 60)
  }

  convertIntTo24(time) {
    const hours = parseInt((time / 100).toString(), 10);
    const minutes = (time % 100) * 60 / 100;
    return hours + ':' + minutes; //`${this.leftPad(hours)}:${this.leftPad(minutes)}`;
  }

  leftPad(n) {
    return (n < 10) ? ('0' + n) : n;
  }

  genRange(resId, step, start, stop) {
    //this.appointmentSlots.push({ 'time': this.convertIntTo24(start) });
    let output: _model.AppointmentSlot[] = [];
    let tmp = start;
    let i = 1;
    while (tmp < stop) {
      i++;
      tmp += step;
      let timeSlot = this.convertIntTo24(tmp);
      output.push({ 'id': resId + '_' + i, 'time': timeSlot });
      //this.appointmentSlots.push({ 'time': timeSlot});
    }
    return output;
  }


  newCustomer() {
    const dialogRef = this.dialog.open(CustomerEditComponent,
      {
        panelClass: 'appointment-booking-dialog',
        data: new _model.Customer()
      });

    dialogRef.afterClosed().subscribe(result => {
      console.log(JSON.stringify(result));
    });
  }

  fullAddress(item: _model.Resource) {
    let address = '';
    if (item.addressLine1 != null && item.addressLine1.length > 0)
      address = item.addressLine1;
    if (item.addressLine2 != null && item.addressLine2.length > 0)
      address += ',' + item.addressLine2;
    if (item.city != null && item.city.length > 0)
      address += ',' + item.city;
    if (item.postcode != null && item.postcode.length > 0)
      address += ',' + item.postcode;
    return address;
  }

  getProfileImage(profilePath) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(environment.apiUrl + "/UploadFiles/" + profilePath);
  }

  getDates(daysToAdd) {
    var startDate = new Date();
    //this.dates = [];
    //if (daysToAdd > 4) {
    //  startDate = this.dates[this.dates.length-1];
    //  startDate.setDate(startDate.getDate() + daysToAdd);
    //} else if (daysToAdd < 0) {
    //  startDate = this.dates[0];
    //  startDate.setDate(startDate.getDate() - daysToAdd);
    //}
    var aryDates = [];
    for (var i = 0; i <= daysToAdd; i++) {
      var currentDate = new Date();
      currentDate.setDate(startDate.getDate() + i);
      aryDates.push({
        'date': currentDate,
        'display': this.dayAsString(currentDate.getDay()) + " " + currentDate.getDate() + " " + this.monthAsString(currentDate.getMonth())
      });
    }
    this.dates = aryDates;
  }

  monthAsString(monthIndex) {
    var d = new Date();
    var month = new Array();
    month[0] = "Jan";
    month[1] = "Feb";
    month[2] = "Mar";
    month[3] = "Apr";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "Aug";
    month[8] = "Sep";
    month[9] = "Oct";
    month[10] = "Nov";
    month[11] = "Dec";

    return month[monthIndex];
  }

  dayAsString(dayIndex) {
    var weekdays = new Array(7);
    weekdays[0] = "Sun";
    weekdays[1] = "Mon";
    weekdays[2] = "Tue";
    weekdays[3] = "Wed";
    weekdays[4] = "Thu";
    weekdays[5] = "Fri";
    weekdays[6] = "Sat";

    return weekdays[dayIndex];
  }
}
