import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import * as _model from '../../../shared/models/models';
import * as _api from '../../../shared/services/api';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationService } from '../../../shared/services/notification.service';
import { NotificationProperties } from '../../../shared/interfaces/NotificationProperties';
import { UserInfoService } from '../../../shared/services/userInfo.service';



@Component({
    selector: 'resources-edit-component',
    moduleId: module.id,
    templateUrl: 'resource-edit.html'
})
export class ResourceEditComponent implements OnInit {
    resourceId: number = 0;
    submitted = false;
    resource: _model.Resource = new _model.Resource();
    userForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private resourceService: _api.ResourceService,
        private notificationService: NotificationService,
        private spinner: NgxSpinnerService,
        private userInfo: UserInfoService,
        private router: Router) {

    }

    ngOnInit() {
        this.userForm = this.fb.group({
            resourceId: [this.resourceId],
            organizationId: [this.userInfo.currentUser.organizationId],
            resourceName: ['', [Validators.required, Validators.maxLength(500)]],
            emailAddress: ['', [Validators.required, Validators.email]],
            addressLine1: ['', [Validators.required, Validators.maxLength(500)]],
            addressLine2: ['', [Validators.required, Validators.maxLength(500)]],
            city: ['', [Validators.required]],
            postcode: ['', [Validators.required]],
            color: [''],
        });

        this.route.params.subscribe(params => {
            var id = parseInt(params.id);
            if (id > 0) {
                this.resourceId = id;
                this.loadData();
            }
        });
    }

    loadData() {
        this.resourceService.get(this.resourceId).subscribe((data: any) => {
            let resource = data[0] as _model.Resource;
            this.userForm.setValue({
                resourceId: resource.resourceId,
                organizationId: this.userInfo.currentUser.organizationId,
                resourceName: resource.resourceName,
                emailAddress: resource.emailAddress,
                addressLine1: resource.addressLine1,
                addressLine2: resource.addressLine2,
                city: resource.city,
                postcode: resource.postcode,
                color: resource.color
            });
        });
    }

    onSubmit(formData: FormGroup) {
        this.submitted = true;
        if (!formData.invalid) {

            this.spinner.show();
            if (this.resourceId == 0) {
                this.resourceService.create(formData.value).subscribe(
                    (data: any) => {
                        const successNotification: NotificationProperties = {
                            message: 'Resource has been created successfully.',
                            title: 'Resources'
                        };
                        this.notificationService.success(successNotification);
                        this.spinner.hide();
                        this.router.navigate(['/resources']);
                    },
                    error => {
                        this.spinner.hide();
                        const errorNotification: NotificationProperties = {
                            message: error.error,
                            title: 'Resources'
                        };
                        this.notificationService.error(errorNotification);
                    });
            }
            else {
                this.resourceService.update(this.resourceId, formData.value).subscribe((data: any) => {
                    const successNotification: NotificationProperties = {
                        message: 'Resource has been updated successfully.',
                        title: 'Resources'
                    };
                    this.notificationService.success(successNotification);
                    this.spinner.hide();
                    this.router.navigate(['/resources']);
                },
                    error => {
                        this.spinner.hide();
                        const errorNotification: NotificationProperties = {
                            message: error.error,
                            title: 'Resources'
                        };
                        this.notificationService.error(errorNotification);
                    });
            }
        }
    }

}