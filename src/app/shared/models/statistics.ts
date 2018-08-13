import { Entity } from './entity';
export class Statistics extends Entity {
    resources?: number;
    subUsers?: number;
    bookingApps?: number;
    services?: number;
    assets?: number;
    customers?: number;
    trialDaysLeft?: number;
}
