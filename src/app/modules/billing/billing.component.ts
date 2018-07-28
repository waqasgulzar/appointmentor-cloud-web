import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { UserAccountService } from '../useraccount/account.service';
import { PaymentInfo } from '../setting/user/organizationuser';
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
  paymentInfo: PaymentInfo = new PaymentInfo();
  bundleInfo: string = 'Each bundle allows you to add up to 3 booking apps, 1 resource and 1 user to your account.';

  constructor(
    private router: Router,
    private userAccountService: UserAccountService,
  ) {

  }

  ngOnInit() {
    this.orgId = sessionStorage.getItem("organizationId");

    if (!this.orgId) {
      this.router.navigate(['']);
    } else {
      this.userAccountService.get(Number(this.orgId)).subscribe((data: any) => {
        var obj = data["results"][0];
        this.orgInfo = obj;
        sessionStorage.setItem('orgInfo', JSON.stringify(obj));
      });
    }
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
    this.paymentInfo.OrgId = this.orgInfo.organizationId;
    if (payType == 'monthly') {
      this.paymentInfo.Price = this.payMonthly * this.bundleToPurchase;
      this.paymentInfo.Notes = this.bundleInfo + ' You have choosen monthly package of £' + this.payMonthly + ' with ' + this.bundleToPurchase + ' bundle(s), the total amount is £' + this.paymentInfo.Price;
    } else {
      this.paymentInfo.Price = (this.payAnnualy * this.bundleToPurchase) - (24 * this.bundleToPurchase);
      this.paymentInfo.Notes = this.bundleInfo + ' You have choosen annualy package of £' + this.payAnnualy + ' with ' + this.bundleToPurchase + ' bundle(s), the total amount is £' + this.paymentInfo.Price;
    }
    
    sessionStorage.setItem('paymentInfo', JSON.stringify(this.paymentInfo));
    this.router.navigate(['charge']);
  }

}
