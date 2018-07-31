import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from '../../environments/environment';
import { Router } from "@angular/router";

import { MatDialog } from '@angular/material';
import { ServicesService } from '../services/services.service';
import { Service } from '../services/service';
import { CustomerService } from '../customer/customer.service';
import { Customer } from '../customer/customer';
import { ResourcesService } from '../resources/resources.service';
import { Resource } from '../resources/resource';
import { MatStepper } from '@angular/material';
import { Appointment } from '../dashboard/appointment';
import { OpeningTimesService } from '../openingtimes/openingtimes.service';
import { AppointmentSlot } from '../dashboard/appointmentSlot';
import { AppointmentService } from '../appointment/appointment.service';
import { DashboardService } from '../dashboard/dashboard.service';
import { AppointmentBookingComponent } from '../../shared/appointmentBooking/appointmentBooking.component';

import * as $ from 'jquery';
import 'fullcalendar';
import 'fullcalendar-scheduler';

const apiUrl = environment.apiUrl;


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
  resources: Resource[];
  appointments: any;
  orgResources: any;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  customers: Customer[];
  services: Service[];
  appointment: Appointment;
  selectedDate: any;
  startDate: Date;
  appointmentSlotsLoading: boolean;
  appointmentSlots: AppointmentSlot[];
  containerEl: JQuery;
 
  
  //calendarOptions: Object = {
  //  defaultView: 'agendaDay',
  //  editable: true,
  //  header: {
  //    left: 'prev,next today',
  //    center: 'title',
  //    right: 'month,agendaWeek,agendaDay'
  //  },
  //  resources: [
  //    { id: 'a', title: 'Resource 1' },
  //    { id: 'b', title: 'Resource 2', eventColor: 'green' },
  //    { id: 'c', title: 'Resource 3', eventColor: 'orange' },
  //    { id: 'd', title: 'Resource 4', eventColor: 'red' }
  //  ],
  //  events: [
  //    { id: '1', resourceId: 'a', start: '2018-03-31T09:00:00', end: '2018-03-31T10:00:00', title: 'event 1' },
  //    { id: '2', resourceId: 'b', start: '2018-03-31T07:30:00', end: '2018-03-31T08:30:00', title: 'event 2' },
  //    { id: '3', resourceId: 'c', start: '2018-03-31T07:30:00', end: '2018-03-31T08:30:00', title: 'event 3' },
  //    { id: '4', resourceId: 'd', start: '2018-03-31T10:10:00', end: '2018-03-31T10:40:00', title: 'event 4' },
  //    { id: '5', resourceId: 'a', start: '2018-03-31T10:10:00', end: '2018-03-31T10:40:00', title: 'event 5' }
  //  ]
  //};

  constructor(private fb: FormBuilder,
    private resourcesService: ResourcesService,
    private appointmentService: AppointmentService,
    private _formBuilder: FormBuilder,
    private customerService: CustomerService,
    private openingtimesService: OpeningTimesService,

    private servicesService: ServicesService,
    private dashboardService: DashboardService,

    private router: Router,
    public dialog: MatDialog) {
    if (sessionStorage.getItem("organizationId") == null) {
      this.router.navigate(['']);
    }

    this.appointment = new Appointment(null, null);
    var r: Resource;
    this.appointment.resource = r;
    this.appointment.customers = new Array<Customer>();


  }

  ngOnInit() {
    this.containerEl = $('#calendar');

    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.appointmentSlotsLoading = false;
    this.startDate = new Date();
    this.LoadServices();
    this.LoadCustomers();
    this.LoadAppointments();
    this.LoadResources();
  }
  refresh(): void {
    location.reload();
  }
  LoadAppointments() {
    this.resourcesService.getOrgResources(apiUrl, Number(sessionStorage.getItem("organizationId")))
      .subscribe((data: any) => {
        this.orgResources = data["results"];
        this.appointmentService.get(Number(sessionStorage.getItem("organizationId")))
          .subscribe((data: any) => {
            this.appointments = data["results"];
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
      });
  }

  LoadCustomers() {
    this.customerService.get(apiUrl, Number(sessionStorage.getItem("organizationId"))).subscribe((data: any) => {
      this.customers = data["results"];
    });
  }

  LoadOpeningtimes() {
    this.openingtimesService.get(apiUrl, Number(sessionStorage.getItem("organizationId"))).subscribe((data: any) => {
      var obj = data["results"];
      if (obj != null && obj.length > 0) {
        var mondayobj = data["results"][0];
        var tuesdayobj = data["results"][1];
        var wednesdayobj = data["results"][2];
        var thursdayobj = data["results"][3];
        var fridayobj = data["results"][4];
        var saturdayobj = data["results"][5];
        var sundayobj = data["results"][6];
      }
    });
  }

  LoadServices() {
    this.servicesService.getServices(apiUrl, Number(sessionStorage.getItem("organizationId")))
      .subscribe((data: any) => {
        this.services = data["results"];
      });
  }

  LoadResources() {
    this.resourcesService.getResources(apiUrl, Number(sessionStorage.getItem("organizationId")))
      .subscribe((data: any) => {
        this.resources = data["results"];

      });
  }


  setService(item, stepper: MatStepper) {
    this.appointment.service = item;
    stepper.next();
  }

  setAppointmentDate(item) {
    this.appointment.date = item;
    console.log(this.appointment.date);
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
    this.appointmentService.post(this.appointment)
      .subscribe((data: any) => {
        console.log(data);
        this.dialog.closeAll();
        this.resourcesService.getOrgResources(apiUrl, Number(sessionStorage.getItem("organizationId")))
          .subscribe((data: any) => {
            this.orgResources = data["results"];
            this.appointmentService.get(Number(sessionStorage.getItem("organizationId")))
              .subscribe((data: any) => {
                this.appointments = data["results"];
                this.containerEl.fullCalendar({
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
          });
      });
  }
}
