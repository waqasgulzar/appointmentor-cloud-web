import { Entity } from "./entity";
import * as _model from './models';
import { Observable } from "rxjs";

export class DataSource extends Entity {
  resources: any;
  categories: any;
  services: any;
  openingTimes: any;
  customers: any;
}