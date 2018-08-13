
import { PaymentInfo } from './paymentInfo';
import { Profile } from './profile';
import { Statistics } from './statistics';
import { Entity } from './entity';

export class User extends Entity {
    organizationId?: number;
    firstName?: string;
    lastName?: string;
    companyName?: string;
    phoneNumber?: string;
    emailAddress?: string;
    password?: string;
    timezoneId?: number;
    currencyId?: number;
    dateFormat?: string;
    calendarIntervalIncrement?: number;
    isDeleted?: boolean;
    profile?: Profile;
    payment?: PaymentInfo;
    createdOn?: Date;
    stats?: Statistics;
}
