export * from './authentication.service';
export * from './rest.service';
export * from './appointment.service';
export * from './asset.service';
export * from './assetService.service';
export * from './bookingQuestion.service';
export * from './category.service';
export * from './customer.service';
export * from './customerSetting.service';
export * from './emailSetting.service';
export * from './files.service';
export * from './mediaLibrary.service';
export * from './forgotPassword.service';
export * from './lookup.service';
export * from './onlineBookingSetting.service';
export * from './openingTime.service';
export * from './organization.service';
export * from './payment.service';
export * from './profile.service';
export * from './reset.service';
export * from './resource.service';
export * from './service.service';
export * from './serviceResource.service';
export * from './smsSetting.service';
export * from './task.service';
export * from './user.service';
export * from './userSetting.service';
export * from './validation.service';
export * from './welcomePack.service';

import { AssetServiceService } from './assetService.service';
import { AppointmentService } from './appointment.service';
import { AuthenticationService } from './authentication.service';
import { RestService } from './rest.service';
import { AssetService } from './asset.service';
import { BookingQuestionService } from './bookingQuestion.service';
import { CategoryService } from './category.service';
import { CustomerService } from './customer.service';
import { CustomerSettingService } from './customerSetting.service';
import { EmailSettingService } from './emailSetting.service';
import { FilesService } from './files.service';
import { ForgotPasswordService } from './forgotPassword.service';
import { LookupService } from './lookup.service';
import { OnlineAppointmentBookingSettingsService } from './onlineBookingSetting.service';
import { OpeningTimeService } from './openingTime.service';
import { OrganizationService } from './organization.service';
import { PaymentService } from './payment.service';
import { ProfileService } from './profile.service';
import { ResetPasswordService } from './reset.service';
import { ResourceService } from './resource.service';
import { ServiceService } from './service.service';
import { ServiceResourceService } from './serviceResource.service';
import { SmsSettingService } from './smsSetting.service';
import { TaskService } from './task.service';
import { UserService } from './user.service';
import { UserSettingService } from './userSetting.service';
import { ValidationService } from './validation.service';
import { WelcomePackService } from './welcomePack.service';

export const APIS = [
  AuthenticationService,
  AppointmentService,
  AssetService,
  AssetServiceService,
  BookingQuestionService,
  CategoryService,
  CustomerService,
  CustomerSettingService,
  EmailSettingService,
  FilesService,
  ForgotPasswordService,
  LookupService,
  OnlineAppointmentBookingSettingsService,
  OpeningTimeService,
  OrganizationService,
  PaymentService,
  ProfileService,
  ResetPasswordService,
  ResourceService,
  ServiceService,
  ServiceResourceService,
  SmsSettingService,
  TaskService,
  UserService,
  UserSettingService,
  ValidationService,
  WelcomePackService
];
