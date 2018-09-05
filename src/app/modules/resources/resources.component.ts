import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import * as _model from '../../shared/models/models';
import * as _api from '../../shared/services/api';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'resources-component',
  moduleId: module.id,
  templateUrl: 'resources.html'
})
export class ResourcesComponent implements OnInit {
  services: _model.Service[];
  resources: _model.Resource[];
  resource: _model.Resource = new _model.Resource();
  serviceResources: _model.ServiceResource[];
  serviceResource: _model.ServiceResource;
  selectedServiceResources: _model.ServiceResource[];
  selectedServiceIds: number[] = [];
  submitted = false;
  userForm: FormGroup;
  removeResourceId: number = 0;
  updatedResourceId: number = 0;
  isCheckAll: boolean = false;
  savebuttonText: string = 'Save';
  isMenuhidden: boolean = false;
  constructor(
    private spinner: NgxSpinnerService,
    private fb: FormBuilder,
    private resourcesService: _api.ResourceService,
    private router: Router
  ) {
    this.LoadResources();
  }
  ngOnInit() {}

  LoadResources() {
    this.resourcesService.getAll().subscribe((data: any) => {
      this.resources = data;
    });
  }
}
