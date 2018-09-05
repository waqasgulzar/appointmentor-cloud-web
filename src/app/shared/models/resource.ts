import { ServiceResource } from './serviceResource';
import { Entity } from './entity';
import * as _model from '../../shared/models/models';
import { ResourceWorkingHour } from './resourceWorkingHour';

export class Resource extends Entity {
  resourceId: number = 0;
  organizationId: number;
  firstName: string = '';
  lastName: string = '';
  gender: string = 'Male'; // Male or Female
  phone: string = '';
  mobile: string = '';
  emailAddress: string = '';
  isSendConfirmationEmail: boolean = false;
  address: _model.Address;
  color: string = '';
  isDeleted: boolean = false;
  profileImageUrl: string = 'avatar.png';
  professionalMembershipNumber: string = '';
  careerStartedOn: string = '';
  languages: string = '';
  qualifications: string = '';
  twitter: string = '';
  linkedIn: string = '';
  facebook: string = '';
  google: string = '';
  gapBetweenAppointments: string = '';
  messageOnBookingApp: string = '';
  messageShowPosition: string = '';
  serviceResource?: Array<ServiceResource> = new Array<ServiceResource>();
  appointmentSlots?: _model.AppointmentSlot[] = new Array<
    _model.AppointmentSlot
  >();
  workingHours?: Array<ResourceWorkingHour> = new Array<ResourceWorkingHour>();
}
