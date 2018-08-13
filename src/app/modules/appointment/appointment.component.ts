import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { MatDialog, MatStepper } from '@angular/material';
import * as _model from '../../shared/models/models';
import * as _api from '../../shared/services/api';
import { AppointmentBookingComponent } from '../../shared/appointmentBooking/appointmentBooking.component';
import * as $ from 'jquery';
import 'fullcalendar';
import 'fullcalendar-scheduler';
import { NgxSpinnerService } from 'ngx-spinner';
import { DataService } from '../../shared/services/data.service';


@Component({
  selector: 'appointments-component',
  moduleId: module.id,
  templateUrl: 'appointment.html'
})
export class AppointmentComponent implements OnInit {
  userForm: FormGroup;
  isDailyActive: boolean = true;
  allTimes: any;
  todayDate: string;
  resources: _model.Resource[];
  appointments: any;
  orgResources: any;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  customers: _model.Customer[];
  services: _model.Service[];
  appointment: _model.Appointment;
  appointmentSlots: any;
  selectedDate: any;
  startDate: Date;
  appointmentSlotsLoading: boolean;
  containerEl: JQuery;

  constructor(private fb: FormBuilder,
    private dataService: DataService,
    private resourcesService: _api.ResourceService,
    private appointmentService: _api.AppointmentService,
    private _formBuilder: FormBuilder,
    private customerService: _api.CustomerService,
    private openingtimesService: _api.OpeningTimeService,
    private servicesService: _api.ServiceService,
    private router: Router,
    private spinner: NgxSpinnerService,
    public dialog: MatDialog) {

    this.appointment = new _model.Appointment();
    var r: _model.Resource;
    this.appointment.resource = r;
    this.appointment.customers = new Array<_model.Customer>();
  }

  ngOnInit() {

    this.containerEl = $('#calendar');

    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });


    this.startDate = new Date();
    this.spinner.show();
    this.dataService.requestDataFromMultipleSources().subscribe(responseList => {
      this.customers = responseList[0];
      this.services = responseList[1];
      this.orgResources = responseList[2];
      this.LoadAppointments();
      this.spinner.hide();
    });
  }

  refresh(): void {
    location.reload();
  }

  LoadAppointments() {
    this.appointmentService.getAll()
      .subscribe((data: any) => {
        this.appointments = data;
        this.containerEl.fullCalendar({
          //now: '2018-03-23',
          editable: true, // enable draggable events
          aspectRatio: 1.8,
          scrollTime: '00:00', // undo default 6am scrollTime
          header: {
            left: 'today prev,next',
            center: 'title',
            right: 'timelineDay,timelineThreeDays,agendaWeek,month,listWeek'
          },
          defaultView: 'agendaDay',
          resources: this.orgResources,
          events: this.appointments
        });
      });
  }

  setService(item, stepper: MatStepper) {
    this.appointment.service = item;
    stepper.next();
  }

  setAppointmentDate(item) {
    this.appointment.date = item;
    this.appointmentSlots = [
      { id: 1, date: new Date, time: '9:00 am' }, { id: 1, date: new Date, time: '9:30 am' },
      { id: 1, date: new Date, time: '9:45 am' }, { id: 1, date: new Date, time: '10:00 am' }
    ];
    this.appointmentSlotsLoading = true;
  }

  setAppointmentTime(item) {
    this.appointment.time = item.time;
    this.appointmentSlotsLoading = false;
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

  bookAppointment() {
    const dialogRef = this.dialog.open(AppointmentBookingComponent,
      {
        panelClass: 'appointment-booking-dialog',
      });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog result: ${result}');
    });
  }

  createAppointment() {
    this.appointment.createdBy = Number(sessionStorage.getItem("organizationId"));
    this.appointmentService.create(this.appointment)
      .subscribe((data: any) => {
        console.log(data);
        this.dialog.closeAll();
      });
  }
}
