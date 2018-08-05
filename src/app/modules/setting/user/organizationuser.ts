export interface OrganizationUser {
    userId: number;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    emailAddress: string;
    organizationId: number;
    password: string;
    timeZoneId: number;
    currencyId: number;
    isDeleted: boolean;
    parentUserID: number;
    permissionID: number;
    isInvitationAccepted: boolean;
}

export class OrganizationInfo {
  organizationId: number;
  firstName: string;
  lastName: string;
  companyName: string;
  phoneNumber: string;
  emailAddress: string;
  password: string;
  timezoneId: number | null;
  currencyId: number | null;
  dateFormat: string;
  calendarIntervalIncrement: number | null;
  isDeleted: boolean;
  profile: Profile;
  payment: PaymentInfo;
  createdOn: Date | string | null;
  stats: Statistics;

  constructor() {
    this.organizationId = 0;
  }
}

export class Profile {
  profileID: number;
  organizationId: number;
  businessName: string;
  aboutYourBusiness: string;
  street: string;
  city: string;
  postCode: string;
  businessPhoneNumber: string;
  businessWebsite: string;
  mobileNumber: string;
  emailAddress: string;
  otherEmailAddress: string;
  sendFromEmailAddress: string;
  sendFromNameForEmail: string;
  sendFromNameForSMS: string;
  logoForMarketingPath: string;
  profileImageForMicrosite1: string;
  setAsDefaultMircrosite1: boolean | null;
  profileImageForMicrosite2: string;
  setAsDefaultMircrosite2: boolean | null;
  profileImageForMicrosite3: string;
  setAsDefaultMircrosite3: boolean | null;
  profileImageForMicrosite4: string;
  setAsDefaultMircrosite4: boolean | null;
  bannerImageForMicrosite: string;
  isDeleted: boolean;
}

export class PaymentInfo {
  id: number;
  orgId: number | null;
  packageId: number | null;
  price: number | null;
  paidOn: Date | string | null;
  startDate: Date | string | null;
  endDate: Date | string | null;
  notes: string;
  returnKey: string;
  successKey: string;
  error: string;
  tokenId: string;
}

export class Statistics {
  resources: number;
  subUsers: number;
  bookingApps: number;
  services: number;
  assets: number;
  customers: number;
}