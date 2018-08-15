import { Customer } from './customer';
import { Resource } from './resource';
import { Service } from './service';
import { Entity } from './entity';

export class Appointment extends Entity {
    createdBy?: number;
    modifiedBy?: number;
    id?: number;
    date?: Date;
    time?: string;
    service?: Service;
    resource?: Resource;
    customers?: Array<Customer>;
    notes?: string;
    status?: number;
    createdOn?: Date;
    modifiedOn?: Date;
}

export class AppointmentSlot {
  id: string;
  time: string;
}
