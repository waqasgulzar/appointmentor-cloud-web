import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';

import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import * as _model from '../../../shared/models/models';
import * as _api from '../../../shared/services/api';

@Component({
  selector: 'category-component',
  moduleId: module.id,
  templateUrl: 'categories.html'
})
export class CategoriesComponent implements OnInit {
  categories: Array<_model.Category>;
  submitted = false;

  constructor(
    private spinner: NgxSpinnerService,
    private fb: FormBuilder,
    private router: Router,
    private categoryService: _api.CategoryService
  ) {
    
  }

  ngOnInit() {
    this.LoadCategories();
  }
  
  LoadCategories() {
    this.categoryService.getAll().subscribe((data: any) => {
        this.categories = data;
      });
  }

}
