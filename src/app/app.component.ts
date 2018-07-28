import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'ng-app',
  templateUrl: 'app.template.html'
})

export class AppComponent {
  appName: string = "Appointmentor";
  nav = { topBar: false, sidebar: false };

  constructor() {
    if (sessionStorage.getItem("organizationId") != null) {
      this.nav.sidebar = true;
    }

  }
}
