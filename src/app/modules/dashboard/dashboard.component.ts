import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { AppointmentBookingComponent } from '../../shared/appointmentBooking/appointmentBooking.component';
import { MatDialog } from '@angular/material';
import { MatStepper } from '@angular/material';

@Component({
  selector: 'dashboard-component',
  moduleId: module.id,
  templateUrl: 'dashboard.html'
})
export class DashboardComponent implements OnInit {
  
  constructor() {
    
  }

  ngOnInit() {
    
  }
}