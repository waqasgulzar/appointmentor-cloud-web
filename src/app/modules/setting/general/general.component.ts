import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import * as _model from '../../../shared/models/models';
import * as _api from '../../../shared/services/api';
import { Router } from '@angular/router';

@Component({
  moduleId: module.id,
  templateUrl: 'general.html'
})
export class GeneralComponent implements OnInit {
  timezonelist: any[];
  currencylist: any[];
  selectedTimeZone: string;
  selectedCurrency: string;
  messageText: string = '';
  isHidden: boolean = true;
  userForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    
    private userAccountService: _api.UserService,
    private openingtimesService: _api.OpeningTimeService,
    private router: Router
  ) {
    
   
  }
  ngOnInit() {
    this.userForm = this.fb.group({
      calendarIntervalIncrement: ['15'],
      dateFormat: ['mm/dd/yyyy'],
      timezoneControl: [],
      currencyControl: []
    });
  }
  
}
