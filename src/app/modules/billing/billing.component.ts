import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import * as _model from '../../shared/models/models';
import * as _api from '../../shared/services/api';
@Component({
  moduleId: module.id,
  templateUrl: 'billing.html'
})
export class BillingComponent implements OnInit {
  orgId: any;
  orgInfo: any;
  bundleToPurchase: number = 1;
  payMonthly: number = 15;
  payAnnualy: number = 156;
  paymentInfo: _model.PaymentInfo = new _model.PaymentInfo();
  bundleInfo: string = 'Each bundle allows you to add up to 3 booking apps, 1 resource and 1 user to your account.';

  constructor(
    private router: Router,
    private userAccountService: _api.UserService,
  ) {

  }

  ngOnInit() {
    
  }

  increment() {
    if (this.bundleToPurchase < 10) {
      this.bundleToPurchase += 1;
    }
  }

  decrement() {
    if (this.bundleToPurchase > 1) {
      this.bundleToPurchase -= 1;
    }
  }

  subscribe(payType) {
    this.paymentInfo.orgId = this.orgInfo.organizationId;
    if (payType == 'monthly') {
      this.paymentInfo.price = this.payMonthly * this.bundleToPurchase;
      this.paymentInfo.notes = this.bundleInfo + ' You have choosen monthly package of £' + this.payMonthly + ' with ' + this.bundleToPurchase + ' bundle(s), the total amount is £' + this.paymentInfo.price;
    } else {
      this.paymentInfo.price = (this.payAnnualy * this.bundleToPurchase) - (24 * this.bundleToPurchase);
      this.paymentInfo.notes = this.bundleInfo + ' You have choosen annualy package of £' + this.payAnnualy + ' with ' + this.bundleToPurchase + ' bundle(s), the total amount is £' + this.paymentInfo.price;
    }
    
    sessionStorage.setItem('paymentInfo', JSON.stringify(this.paymentInfo));
    this.router.navigate(['charge']);
  }

}
