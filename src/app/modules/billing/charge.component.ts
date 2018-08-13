import { Component, AfterViewInit, OnDestroy, ViewChild, ElementRef, ChangeDetectorRef, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as _model from '../../shared/models/models';
import * as _api from '../../shared/services/api';

@Component({
  selector: 'charge-component',
  templateUrl: 'charge.view.html'
})
export class ChargeComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('cardInfo') cardInfo: ElementRef;
  id: number = 0;
  package: any;
  user: any;
  card: any;
  cardHandler = this.onChange.bind(this);
  error: string;
  practice: any;
  processing: boolean = false;
  errorInfo: string = null;
  price: number;
  paymentInfo: _model.PaymentInfo = new _model.PaymentInfo();

  constructor(
    private cd: ChangeDetectorRef,
    private route: ActivatedRoute,
    private paymentService: _api.PaymentService,
    private router: Router) { }

  ngOnInit() {
    this.paymentInfo = JSON.parse(sessionStorage.getItem('paymentInfo'));
    
  }

  ngAfterViewInit() {
    this.card = elements.create('card');
    this.card.mount(this.cardInfo.nativeElement);
    this.card.addEventListener('change', this.cardHandler);
  }

  ngOnDestroy() {
    this.card.removeEventListener('change', this.cardHandler);
    this.card.destroy();
  }

  onChange({ error }) {
    if (error) {
      this.error = error.message;
    } else {
      this.error = null;
    }
    this.cd.detectChanges();
  }

  async onSubmit(form: NgForm) {
    this.processing = true;
    const { token, error } = await stripe.createToken(this.card);
    if (error) {
      console.log('Something is wrong:', error);
      this.errorInfo = error.message;
      this.processing = false;
    } else {
      
      this.paymentInfo.tokenId = token.id;
      this.paymentService.create(this.paymentInfo).subscribe(data => {
        this.processing = false;
        this.router.navigate(["premium/receipt/", data[0].id]);
      });
    }
  }
}
