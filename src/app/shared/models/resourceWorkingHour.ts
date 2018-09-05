import { Entity } from './entity';

export class ResourceWorkingHour extends Entity {
  workingHourID: number;
  resourceID: number;
  dayID: number;
  startTime?: string;
  endTime?: string;
  isOpen?: boolean;
  timezoneID: number;
  isDeleted: boolean;
  isExtraTimeBeforeStartEnabled: boolean = false;
  beforeStartExtraTime?: string = 'None';
  beforeStartPremium?: number = 0;
  isExtraTimeAfterEndEnabled: boolean = false;
  afterEndExtraTime?: string = 'None';
  afterEndPremium?: number = 0;
  premiumOnHolidays?: number = 0;
  // day Day { get; set; }
  // resource Resource { get; set; }
  // timezone Timezone { get; set; }
}
