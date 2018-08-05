export interface OpeningTime {
    openingId: number;
    organizationId: number;
    dayId: number;
    openingTime: string;
    closingTime: string;
    isOpen: boolean;
    isDeleted: boolean;
}

export class Timings {
  hours: string[];
  minutes: string[];

  constructor() {
    this.hours = [];
    this.minutes = [];
    this.minutes[0] = "00";
    this.minutes[1] = "15";
    this.minutes[2] = "30";
    this.minutes[3] = "45";


    for (let i: number = 0; i < 24; i++) {
      this.hours[i] = ("0" + i).slice(-2);
    }
    
  }
}