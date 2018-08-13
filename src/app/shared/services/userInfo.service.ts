import * as _model from '../../shared/models/models';

export class UserInfoService {
  currentUser: _model.User = JSON.parse(localStorage.getItem('currentUser')) || {};
  
  constructor() {
    //this.currentUser = JSON.parse(localStorage.getItem('currentUser')) || {};
  }

  setInfo(currentUser: _model.User) {
    this.currentUser = currentUser;
  }
}
