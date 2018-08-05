import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DashboardService } from './dashboard.service';
import { Router } from "@angular/router";
import { AppointmentBookingComponent } from '../../shared/appointmentBooking/appointmentBooking.component';
import { MatDialog } from '@angular/material';
import { ServicesService } from '../services/services.service';
import { Service } from '../services/service';
import { CustomerService } from '../customer/customer.service';
import { Customer } from '../customer/customer';
import { ResourcesService } from '../resources/resources.service';
import { Resource } from '../resources/resource';
import { MatStepper } from '@angular/material';
import { Appointment } from './appointment';
import { OpeningTimesService } from '../openingtimes/openingtimes.service';
import { AppointmentSlot } from './appointmentSlot';
import { AppointmentService } from '../appointment/appointment.service';

@Component({
  selector: 'dashboard-component',
  moduleId: module.id,
  templateUrl: 'dashboard.html'
})
export class DashboardComponent implements OnInit {
  organizationName: string = "Personal";
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  customers: Customer[];
  services: Service[];
  resources: Resource[];
  appointment: Appointment;
  selectedDate: any;
  startDate: Date;
  appointmentSlotsLoading: boolean;
  appointmentSlots: AppointmentSlot[];
  orgInfo: any;
  constructor(private _formBuilder: FormBuilder,
    private customerService: CustomerService,
    private openingtimesService: OpeningTimesService,
    private resourcesService: ResourcesService,
    private servicesService: ServicesService,
    private dashboardService: DashboardService,
    private appointmentService:AppointmentService,
    private router: Router,
    public dialog: MatDialog) {
    if (sessionStorage.getItem("organizationId") == null) {
      this.router.navigate(['']);
    }

    this.appointment = new Appointment(null, null);
    var r: Resource;
    this.appointment.resource = r;
    this.appointment.customers =new Array<Customer>();
  }

  ngOnInit() {
    this.orgInfo = JSON.parse(sessionStorage.getItem('orgInfo')) || {};
    if (this.orgInfo) {
      this.organizationName = this.orgInfo.companyName;
    }

    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.appointmentSlotsLoading = false;
    this.startDate = new Date();
    this.LoadServices();
    this.LoadResources();
    this.LoadCustomers();
  }

  LoadCustomers() {
    this.customerService.get(Number(sessionStorage.getItem("organizationId"))).subscribe((data: any) => {
      this.customers = data["results"];
    });
  }

  LoadOpeningtimes() {
    this.openingtimesService.get(Number(sessionStorage.getItem("organizationId"))).subscribe((data: any) => {
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
    this.servicesService.getServices(Number(sessionStorage.getItem("organizationId")))
      .subscribe((data: any) => {
        this.services = data["results"];
      });
  }

  LoadResources() {
    this.resourcesService.getResources(Number(sessionStorage.getItem("organizationId")))
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
      });
  }
}