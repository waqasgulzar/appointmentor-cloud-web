import {
  Component,
  AfterViewInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  ChangeDetectorRef,  OnInit
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs/Observable';


import { PaymentService } from './payment.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'receipt-component',
  templateUrl: 'receipt.view.html'
})
export class ReceiptComponent implements OnInit {
  user: any;
  practice: any;
  id: number = 0;
  
  constructor(
    private cd: ChangeDetectorRef,
    private paymentService: PaymentService,
    private route: ActivatedRoute,
    ) { }

  ngOnInit() {
    
  }

}
