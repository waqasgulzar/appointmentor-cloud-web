import { OrganizationInfo } from "../../modules/setting/user/organizationuser";

export class UserInfoService {
  orgInfo: OrganizationInfo = new OrganizationInfo();
  
  constructor() {
    this.orgInfo = JSON.parse(sessionStorage.getItem('orgInfo')) || {};
  }

  setInfo(orgInfo: OrganizationInfo) {
    this.orgInfo = orgInfo;
  }
}
