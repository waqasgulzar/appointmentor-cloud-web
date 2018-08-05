import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';

import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Category } from './category';
import { CategoryService } from './category.service';
import { UserInfoService } from '../../../shared/services/userInfo.service';
@Component({
  selector: 'category-component',
  moduleId: module.id,
  templateUrl: 'categories.html'
})
export class CategoriesComponent implements OnInit {
  categories: Array<Category>;
  submitted = false;

  constructor(
    private spinner: NgxSpinnerService,
    private fb: FormBuilder,
    private router: Router,
    private categoryService: CategoryService,
    private userInfoService: UserInfoService
  ) {
    
  }

  ngOnInit() {
    this.LoadCategories();
  }
  
  LoadCategories() {
    this.categoryService.getAll(this.userInfoService.orgInfo.organizationId).subscribe((data: any) => {
        this.categories = data['results'];
      });
  }

}
