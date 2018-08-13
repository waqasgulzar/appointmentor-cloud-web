import { Component, OnInit } from '@angular/core';
import { UserInfoService } from '../../shared/services/userInfo.service';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css'],
 
})
export class AppHeaderComponent implements OnInit {
  active: string = '';
  constructor(public userInfo: UserInfoService) { }

  ngOnInit() {
    
  }

  showMenu() {
    if (this.active === 'user')
      this.active = '';
    else
      this.active = 'user';
  }
}