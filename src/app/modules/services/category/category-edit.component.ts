import { Component, OnInit, Input } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../../../shared/services/notification.service';
import { NotificationProperties } from '../../../shared/interfaces/NotificationProperties';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserInfoService } from '../../../shared/services/userInfo.service';
import * as _model from '../../../shared/models/models';
import * as _api from '../../../shared/services/api';


@Component({
  moduleId: module.id,
  templateUrl: 'category-edit.html'
})
export class CategoryEditComponent implements OnInit {
  category: _model.Category = new _model.Category();
  userForm: FormGroup;
  submitted = false;
  catId:number = 0;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private categoryService: _api.CategoryService,
    private router: Router,
    private notificationService: NotificationService,
    private spinner: NgxSpinnerService,
    private userInfoService: UserInfoService
  ) {

  }

  ngOnInit() {
    this.userForm = this.fb.group({
      categoryId: [this.catId],
      organizationId: this.userInfoService.currentUser.organizationId,
      categoryName: ['', Validators.compose([Validators.required, Validators.maxLength(50), Validators.pattern('^[a-zA-Z0-9 ]*$')])],
    });

    this.route.params.subscribe(params => {
      var id = parseInt(params.id);
      if (id > 0) {
        this.catId = id;
        this.LoadCategory(id);
      }
    });

  }

  onSubmit(formData: any) {
    this.submitted = true;
    if (!formData.invalid) {
      this.spinner.show();

      if (this.catId <= 0) {
        this.categoryService.create(formData.value).subscribe(
          (data: any) => {
            const successNotification: NotificationProperties = {
              message: 'Category has been save successfully.',
              title: 'Category'
            };
            this.notificationService.success(successNotification);
            this.spinner.hide();
            this.router.navigate(['/categories']);
          },
          error => {
            const errorNotification: NotificationProperties = {
              message: error.error,
              title: 'Category'
            };
            this.notificationService.error(errorNotification);
            this.spinner.hide();
          });
      }
      else {
        this.categoryService.update(this.catId, formData.value).subscribe(
          (data: any) => {
            const successNotification: NotificationProperties = {
              message: 'Category has been updated successfully.',
              title: 'Category'
            };
            this.notificationService.success(successNotification);
            this.spinner.hide();
            this.router.navigate(['/categories']);
          },
          error => {
            const errorNotification: NotificationProperties = {
              message: error.error,
              title: 'Category'
            };
            this.notificationService.error(errorNotification);
            this.spinner.hide();
          });}
    }
  }

  LoadCategory(id) {
    this.categoryService.get(id).subscribe((data: any) => {
      let cat = data[0];
      this.userForm.setValue({
        categoryId: cat.categoryId,
        organizationId: cat.organizationId,
        categoryName: cat.categoryName
      });
    });
  }
}