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
import * as _api from '../../shared/services/api';
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
    private paymentService: _api.PaymentService,
    private route: ActivatedRoute,
    ) { }

  ngOnInit() {
    
  }

}
