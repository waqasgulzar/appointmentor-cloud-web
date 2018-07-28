import { Component, OnInit } from '@angular/core';

@Component({
  moduleId: module.id,
  templateUrl: 'home.html'
})


export class HomeComponent implements OnInit {

  ngOnInit() {
    sessionStorage.removeItem('organizationId');
    sessionStorage.removeItem('isMenuhidden');
    sessionStorage.removeItem('orgInfo');
  }

}
