import { Entity } from './entity';
export class OrganizationUser extends Entity {
    userId?: number;
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
    emailAddress?: string;
    password?: string;
    timezoneId?: number;
    currencyId?: number;
    organizationId?: number;
    isDeleted?: boolean;
    parentUserID?: number;
    permissionID?: number;
    title?: string;
    isInvitationAccepted?: boolean;
}
