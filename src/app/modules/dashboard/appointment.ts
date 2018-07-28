import { Service } from "../services/service";
import { Resource } from "../resources/resource";
import { Customer } from '../customer/customer';


export class Appointment {
  date: Date;
  service: Service;
  resource: Resource;
  customers:Customer[];
  time: string;
  createdBy: number;

  constructor(s:Service, r:Resource) {
    this.service = s;
    this.resource = r;
    
  }
}
