import * as _model from '../../shared/models/models';
import { HttpHeaders } from "@angular/common/http";

export const Constant = {
  appointmentor: {
    organization: new _model.User(),
    AuthHeaders: new HttpHeaders().set('Authorization', 'bearer ' + sessionStorage.getItem('token'))
  },

  ToastrOptions: {
    easeTime: 300,
    timeOut: 3000,
    positionClass: 'toast-top-right',
    tapToDismiss: false,
    closeButton: false
  },
  MenuActions: {
    Create: 'Create',
    Edit: 'Edit',
    Copy: 'Copy',
    Delete: 'Delete'
  },
};

