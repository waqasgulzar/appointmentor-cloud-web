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
  OrganizationId: number;
  FirstName: string;
  LastName: string;
  CompanyName: string;
  PhoneNumber: string;
  EmailAddress: string;
  Password: string;
  TimezoneId: number | null;
  CurrencyId: number | null;
  DateFormat: string;
  CalendarIntervalIncrement: number | null;
  IsDeleted: boolean;
  Profile: Profile;
  Payment: PaymentInfo;
  CreatedOn: Date | string | null;
  Stats: Statistics;
}

export class Profile {
  ProfileID: number;
  OrganizationId: number;
  BusinessName: string;
  AboutYourBusiness: string;
  Street: string;
  City: string;
  PostCode: string;
  BusinessPhoneNumber: string;
  BusinessWebsite: string;
  MobileNumber: string;
  EmailAddress: string;
  OtherEmailAddress: string;
  SendFromEmailAddress: string;
  SendFromNameForEmail: string;
  SendFromNameForSMS: string;
  LogoForMarketingPath: string;
  ProfileImageForMicrosite1: string;
  SetAsDefaultMircrosite1: boolean | null;
  ProfileImageForMicrosite2: string;
  SetAsDefaultMircrosite2: boolean | null;
  ProfileImageForMicrosite3: string;
  SetAsDefaultMircrosite3: boolean | null;
  ProfileImageForMicrosite4: string;
  SetAsDefaultMircrosite4: boolean | null;
  BannerImageForMicrosite: string;
  IsDeleted: boolean;
}

export class PaymentInfo {
  Id: number;
  OrgId: number | null;
  PackageId: number | null;
  Price: number | null;
  PaidOn: Date | string | null;
  StartDate: Date | string | null;
  EndDate: Date | string | null;
  Notes: string;
  ReturnKey: string;
  SuccessKey: string;
  Error: string;
  TokenId: string;
}

export class Statistics {
  Resources: number;
  SubUsers: number;
  BookingApps: number;
  Services: number;
  Assets: number;
  Customers: number;
}