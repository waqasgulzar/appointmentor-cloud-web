﻿import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  moduleId: module.id,
  templateUrl: 'paymenthistory.html'
})
export class PaymenthistoryComponent implements OnInit {
  constructor(private router: Router) {
   
  }
  ngOnInit() {}
}
