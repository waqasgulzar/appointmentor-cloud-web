import * as _model from '../../shared/models/models';
import * as _api from '../../shared/services/api';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Entity } from '../models/entity';

@Injectable()
export class DataService {
  private _resources: Array<_model.Resource> = [];
  private _categories: Array<_model.Category> = [];
  private _services: Array<_model.Service> = [];
  private _openingTimes: Array<_model.Openingtimes> = [];
  private _customers: Array<_model.Customer> = [];
  private observable: Observable<Entity[]>;
  constructor(
    private customerService: _api.CustomerService,
    private servicesService: _api.ServiceService,
    private resourcesService: _api.ResourceService,
    private openingtimesService: _api.OpeningTimeService,
    private categoryService: _api.CategoryService
  ) {}

  requestDataFromMultipleSources(): Observable<any[]> {
    let resources = this.resourcesService.getAll();
    let categories = this.categoryService.getAll();
    let services = this.servicesService.getAll();
    let openingTimes = this.openingtimesService.getAll();
    let customers = this.customerService.getAll();
    return Observable.forkJoin([customers, services, resources, openingTimes]);
  }

  getResources() {
    if (this._resources.length > 0) {
      return Observable.of(this._resources);
    } else {
      this.resourcesService
        .getAll()
        .map((responses: _model.Resource[]) => {
          this.observable = null;
          this._resources = responses;
          return this._resources;
        })
        .share();
    }
  }

  getCategories() {
    if (this._categories.length > 0) {
      return Observable.of(this._categories);
    } else {
      this.categoryService
        .getAll()
        .map(response => {
          this.observable = null;
          this._categories = response;
          return this._categories;
        })
        .share();
    }
  }

  getServices() {
    if (this._services.length > 0) {
      return Observable.of(this._services);
    } else {
      this.servicesService
        .getAll()
        .map(response => {
          this.observable = null;
          this._services = response;
          return this._services;
        })
        .share();
    }
  }

  getOpeningTImes() {
    if (this._openingTimes.length > 0) {
      return Observable.of(this._openingTimes);
    } else {
      this.openingtimesService
        .getAll()
        .map(response => {
          this.observable = null;
          this._openingTimes = response;
          return this._openingTimes;
        })
        .share();
    }
  }

  getCustomers() {
    if (this._customers.length > 0) {
      return Observable.of(this._customers);
    } else {
      this.customerService
        .getAll()
        .map(response => {
          this.observable = null;
          this._customers = response;
          return this._customers;
        })
        .share();
    }
  }
}
