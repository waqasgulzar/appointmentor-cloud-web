import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material';


@Component({
  selector: 'appointmentor-booking',
  templateUrl: 'appointmentBooking.view.html'
})

export class AppointmentBookingComponent implements OnInit {
  
  constructor(public dialog: MatDialog) {
  }

  ngOnInit() {
  }

  closeAppointmentPopup($event) {
    this.dialog.closeAll();
  }

  
}
