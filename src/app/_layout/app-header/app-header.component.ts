import { Component, OnInit } from '@angular/core';
import { UserInfoService } from '../../shared/services/userInfo.service';
import {
  DomSanitizer,
  SafeResourceUrl,
  SafeUrl
} from '@angular/platform-browser';
import { environment } from '../../../environments/environment';
@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css']
})
export class AppHeaderComponent implements OnInit {
  active: string = '';
  trustedProfileImageUrl: SafeUrl;

  constructor(
    public userInfo: UserInfoService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.trustedProfileImageUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      environment.apiUrl +
        '/UploadFiles/' +
        this.userInfo.currentUser.profile.logoForMarketingPath
    );
  }


  showMenu() {
    if (this.active === 'user') this.active = '';
    else this.active = 'user';
  }
}
