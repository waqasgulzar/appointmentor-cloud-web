import { Entity } from './entity';
export class PaymentInfo extends Entity {
    id?: number;
    orgId?: number;
    packageId?: number;
    price?: number;
    paidOn?: Date;
    startDate?: Date;
    endDate?: Date;
    notes?: string;
    returnKey?: string;
    successKey?: string;
    error?: string;
    tokenId?: string;
}
