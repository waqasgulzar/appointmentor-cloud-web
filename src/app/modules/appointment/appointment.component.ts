import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { MatDialog, MatStepper, MatDialogRef } from '@angular/material';
import * as _model from '../../shared/models/models';
import * as _api from '../../shared/services/api';
import { AppointmentBookingComponent } from '../../shared/appointmentBooking/appointmentBooking.component';
import * as $ from 'jquery';
import 'fullcalendar';
import 'fullcalendar-scheduler';
import { NgxSpinnerService } from 'ngx-spinner';
import { DataService } from '../../shared/services/data.service';
import { NotificationService } from '../../shared/services/notification.service';
import { NotificationProperties } from '../../shared/interfaces/NotificationProperties';

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
  appointmentSlots: _model.AppointmentSlot[];
  selectedDate: any;
  startDate: Date;
  appointmentSlotsLoading: boolean;
  containerEl: JQuery;
  openingtimes: _model.Openingtimes[];
  currentDayTimings: _model.Openingtimes;

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
    private notificationService: NotificationService,
    private dialogRef: MatDialog) {

    this.appointment = new _model.Appointment();
    var r: _model.Resource;
    this.appointment.resource = r;
    this.appointment.customers = new Array<_model.Customer>();
  }

  ngOnInit() {
    this.containerEl = $('#calendar');
    this.startDate = new Date();
    this.spinner.show();
    //this.dataService.requestDataFromMultipleSources().subscribe(responseList => {
    //  this.customers = responseList[0];
    //  this.services = responseList[1];
    //  this.resources = responseList[2];
    //  this.LoadAppointments();
    //});

    this.resourcesService.getAll().subscribe(responses => {
      this.resources = responses;
      this.orgResources = this.resources.map(item => <any>{ 'id': item.resourceId, 'title': item.resourceName, 'color': 'red' });
      this.openingtimesService.getAll().subscribe(openingTimes => {
        this.openingtimes = openingTimes;
        var day = new Date();
        this.currentDayTimings = this.openingtimes.filter(item => item.dayId == day.getDay())[0];
        this.LoadAppointments();
      });
      
    });
  }

  refresh(): void {
    location.reload();
  }

  LoadAppointments() {
    this.appointmentService.getAll()
      .subscribe((data: any) => {
        this.spinner.hide();
        this.containerEl.fullCalendar({
          editable: false, // enable draggable events
          aspectRatio: 1.8,
          scrollTime: '00:00', // undo default 6am scrollTime
          minTime: this.currentDayTimings && this.currentDayTimings.openingTime || '09:00',
          maxTime: this.currentDayTimings && this.currentDayTimings.closingTime || '18:00',
          //header: false,
          allDaySlot: false,
          header: {
            left: '',
            center: 'prev, title, next',
            right: ''
            //right: 'timelineDay,timelineThreeDays,agendaWeek,month,listWeek'
          },
          defaultView: 'agendaDay',
          resources: this.orgResources,
          events: data
        });
      }, error => {
        this.spinner.hide();
      });
  }

  bookAppointment() {
    const dialogRef = this.dialogRef.open(AppointmentBookingComponent,
      {
        panelClass: 'appointment-booking-dialog',
        data: new _model.Appointment()
      });

    dialogRef.afterClosed().subscribe(result => {
      console.log(JSON.stringify(result));
      
      if (result) {
        this.createAppointment(result.appointment);
      }
    });
  }

  createAppointment(appt) {
    this.spinner.show();
    this.appointmentService.create(appt).subscribe((data: any) => {
      const successNotification: NotificationProperties = {
        message: 'Appointment has been created successfully.',
        title: 'Appointment'
      };
      
      this.appointmentService.getAll()
        .subscribe((data: any) => {
          console.log(data);
          this.notificationService.success(successNotification);
          this.spinner.hide();
          this.containerEl.fullCalendar('removeEvents');
          this.containerEl.fullCalendar('renderEvents', data, true);
        });
    }, error => {
      const errorNotification: NotificationProperties = {
        message: error.error,
        title: 'Appointment'
      };
      this.notificationService.error(errorNotification);
      this.spinner.hide();
    });
  }
}
