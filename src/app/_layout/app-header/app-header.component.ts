import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css']
})
export class AppHeaderComponent implements OnInit {
  orgInfo: any;
  constructor() { }

  ngOnInit() {
    this.orgInfo = JSON.parse(sessionStorage.getItem('orgInfo')) || {};
  }
}