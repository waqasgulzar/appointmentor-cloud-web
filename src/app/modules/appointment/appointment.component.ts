import { Component, OnInit } from '@angular/core';
import PerfectScrollbar from 'perfect-scrollbar';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
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
import swal from "sweetalert2";

@Component({
  selector: 'appointments-component',
  moduleId: module.id,
  templateUrl: 'appointment.html'
})
export class AppointmentComponent implements OnInit {
  /*userForm: FormGroup;
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

  constructor(
    private fb: FormBuilder,
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
    private dialogRef: MatDialog
  ) {
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

    this.resourcesService.getAll().subscribe((responses: _model.Resource[]) => {
      this.resources = responses;
      this.orgResources = this.resources.map(
        item =>
          <any>{
            id: item.resourceId,
            title: item.firstName + ' ' + item.lastName,
            color: 'red'
          }
      );
      this.openingtimesService.getAll().subscribe(openingTimes => {
        this.openingtimes = openingTimes;
        var day = new Date();
        this.currentDayTimings = this.openingtimes.filter(
          item => item.dayId == day.getDay()
        )[0];
        this.LoadAppointments();
      });
    });
  }

  refresh(): void {
    location.reload();
  }

  LoadAppointments() {
    this.appointmentService.getAll().subscribe(
      (data: any) => {
        this.spinner.hide();
        this.containerEl.fullCalendar({
          editable: false, // enable draggable events
          aspectRatio: 1.8,
          scrollTime: '00:00', // undo default 6am scrollTime
          minTime:
            (this.currentDayTimings && this.currentDayTimings.openingTime) ||
            '09:00',
          maxTime:
            (this.currentDayTimings && this.currentDayTimings.closingTime) ||
            '18:00',
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
          events: data,
          eventClick: event => {
            this.appointmentService
              .get(Number(event.id))
              .subscribe((appt: _model.Appointment) => {
                const dialogRef = this.dialogRef.open(
                  AppointmentBookingComponent,
                  {
                    panelClass: 'appointment-booking-dialog',
                    data: appt
                  }
                );

                dialogRef.afterClosed().subscribe(result => {
                  console.log(JSON.stringify(result));

                  if (result) {
                    this.createAppointment(result.appointment);
                  }
                });
              });
          }
        });
      },
      error => {
        this.spinner.hide();
      }
    );
  }

  bookAppointment() {
    const dialogRef = this.dialogRef.open(AppointmentBookingComponent, {
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
    this.appointmentService.create(appt).subscribe(
      (data: any) => {
        const successNotification: NotificationProperties = {
          message: 'Appointment has been created successfully.',
          title: 'Appointment'
        };

        this.appointmentService.getAll().subscribe((data: any) => {
          console.log(data);
          this.notificationService.success(successNotification);
          this.spinner.hide();
          this.containerEl.fullCalendar('removeEvents');
          this.containerEl.fullCalendar('renderEvents', data, true);
        });
      },
      error => {
        const errorNotification: NotificationProperties = {
          message: error.error,
          title: 'Appointment'
        };
        this.notificationService.error(errorNotification);
        this.spinner.hide();
      }
    );
  }*/
    ngOnInit() {
        const $calendar = $('#fullCalendar');

        const today = new Date();
        const y = today.getFullYear();
        const m = today.getMonth();
        const d = today.getDate();

        $calendar.fullCalendar({
            viewRender: function(view: any, element: any) {
                // We make sure that we activate the perfect scrollbar when the view isn't on Month
                if (view.name != 'month') {
                    var elem = $(element).find('.fc-scroller')[0];
                    let ps = new PerfectScrollbar(elem);
                }
            },
            header: {
                left: 'title',
                center: 'month, agendaWeek, agendaDay',
                right: 'prev, next, today'
            },
            defaultDate: today,
            selectable: true,
            selectHelper: true,
            views: {
                month: { // name of view
                    titleFormat: 'MMMM YYYY'
                    // other view-specific options here
                },
                week: {
                    titleFormat: ' MMMM D YYYY'
                },
                day: {
                    titleFormat: 'D MMM, YYYY'
                }
            },

            select: function(start: any, end: any) {

                // on select we show the Sweet Alert modal with an input
                swal({
                    title: 'Create an Event',
                    html: '<div class="form-group">' +
                    '<input class="form-control" placeholder="Event Title" id="input-field">' +
                    '</div>',
                    showCancelButton: true,
                    confirmButtonClass: 'btn btn-success',
                    cancelButtonClass: 'btn btn-danger',
                    buttonsStyling: false
                }).then(function(result: any) {

                    let eventData;
                    const event_title = $('#input-field').val();

                    if (event_title) {
                        eventData = {
                            title: event_title,
                            start: start,
                            end: end
                        };
                        $calendar.fullCalendar('renderEvent', eventData, true); // stick? = true
                    }

                    $calendar.fullCalendar('unselect');

                });
            },
            editable: true,
            eventLimit: true, // allow "more" link when too many events


            // color classes: [ event-blue | event-azure | event-green | event-orange | event-red ]
            events: [
                {
                    title: 'All Day Event',
                    start: new Date(y, m, 1),
                    className: 'event-default'
                },
                {
                    id: 999,
                    title: 'Repeating Event',
                    start: new Date(y, m, d - 4, 6, 0),
                    allDay: false,
                    className: 'event-rose'
                },
                {
                    id: 999,
                    title: 'Repeating Event',
                    start: new Date(y, m, d + 3, 6, 0),
                    allDay: false,
                    className: 'event-rose'
                },
                {
                    title: 'Meeting',
                    start: new Date(y, m, d - 1, 10, 30),
                    allDay: false,
                    className: 'event-green'
                },
                {
                    title: 'Lunch',
                    start: new Date(y, m, d + 7, 12, 0),
                    end: new Date(y, m, d + 7, 14, 0),
                    allDay: false,
                    className: 'event-red'
                },
                {
                    title: 'Md-pro Launch',
                    start: new Date(y, m, d - 2, 12, 0),
                    allDay: true,
                    className: 'event-azure'
                },
                {
                    title: 'Birthday Party',
                    start: new Date(y, m, d + 1, 19, 0),
                    end: new Date(y, m, d + 1, 22, 30),
                    allDay: false,
                    className: 'event-azure'
                },
                {
                    title: 'Click for Creative Tim',
                    start: new Date(y, m, 21),
                    end: new Date(y, m, 22),
                    url: 'https://www.creative-tim.com/',
                    className: 'event-orange'
                },
                {
                    title: 'Click for Google',
                    start: new Date(y, m, 21),
                    end: new Date(y, m, 22),
                    url: 'https://www.creative-tim.com/',
                    className: 'event-orange'
                }
            ]
        });
    }
}
