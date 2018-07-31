import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css'],
 
})
export class AppHeaderComponent implements OnInit {
  orgInfo: any;
  active: string = '';
  constructor() { }

  ngOnInit() {
    this.orgInfo = JSON.parse(sessionStorage.getItem('orgInfo')) || {};
  }

  showMenu() {
    if (this.active === 'user')
      this.active = '';
    else
      this.active = 'user';
  }
}