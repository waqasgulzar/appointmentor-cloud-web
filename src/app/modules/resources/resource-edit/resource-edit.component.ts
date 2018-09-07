import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  ValidationErrors
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import * as _model from '../../../shared/models/models';
import * as _api from '../../../shared/services/api';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationService } from '../../../shared/services/notification.service';
import { NotificationProperties } from '../../../shared/interfaces/NotificationProperties';
import { UserInfoService } from '../../../shared/services/userInfo.service';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';
import { environment } from '../../../../environments/environment';
import { LanguageComponent } from '../../../shared/components/language/language.component';
import { QualificationsComponent } from '../../../shared/components/qualifications/qualifications.component';
import { MatDialog } from '@angular/material';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material';
@Component({
  selector: 'resources-edit-component',
  moduleId: module.id,
  templateUrl: 'resource-edit.html'
})
export class ResourceEditComponent implements OnInit {
  showAdvanced: boolean = false;
  resourceId: number = 0;
  submitted = false;
  resource: _model.Resource = new _model.Resource();
  languages: string[] = ['English'];
  qualifications: string[] = [];
  userForm = this.fb.group({
    resourceId: [this.resourceId],
    organizationId: [this.userInfo.currentUser.organizationId],
    firstName: [
      '',
      [
        Validators.required,
        Validators.maxLength(50),
        Validators.pattern('^[a-zA-Z ]*$')
      ]
    ],
    lastName: [
      '',
      [
        Validators.required,
        Validators.maxLength(50),
        Validators.pattern('^[a-zA-Z ]*$')
      ]
    ],
    gender: ['Male', [Validators.required]],
    phone: [''],
    mobile: [''],
    emailAddress: ['', [Validators.required, Validators.email]],
    address: new FormControl(''),
    isSendConfirmationEmail: ['', [Validators.required]],
    color: ['', [Validators.required]],
    isDeleted: ['false'],
    profileImageUrl: [''],
    professionalMembershipNumber: [''],
    careerStartedOn: [''],
    languages: ['', [Validators.required]],
    qualifications: [''],
    twitter: [''],
    linkedIn: [''],
    facebook: [''],
    google: [''],
    gapBetweenAppointments: ['None', [Validators.required]],
    messageOnBookingApp: [''],
    messageShowPosition: [''],
    serviceResource: [],
    workingHours: []
  });
  services: _model.Service[] = [];
  categories: _model.Category[] = [];
  selectedServices: Array<any> = [];
  selected = [];
  timings: _model.Timings = new _model.Timings();
  extraTimes: string[] = [
    'None',
    '30 Minutes',
    '45 Minutes',
    '1 Hour',
    '2 Hours'
  ];
  fileToUpload: File = null;
  trustedProfileImageUrl: SafeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
    environment.apiUrl + '/UploadFiles/avatar.png'
  );
  formData = new FormData();
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private resourceService: _api.ResourceService,
    private notificationService: NotificationService,
    private spinner: NgxSpinnerService,
    private userInfo: UserInfoService,
    private serviceSvc: _api.ServiceService,
    private catSvc: _api.CategoryService,
    private router: Router,
    private sanitizer: DomSanitizer,
    private dialogRef: MatDialog
  ) {}

  ngOnInit() {
    this.catSvc.getAll().subscribe((data: any) => {
      this.categories = data.filter(
        (d: _model.Category) => d.services && d.services.length > 0
      );

      this.serviceSvc.getAll().subscribe((services: _model.Service[]) => {
        this.services = services;
      });

      this.route.params.subscribe(params => {
        var id = parseInt(params.id);
        if (id > 0) {
          this.resourceId = id;
          this.loadData();
        } else {
          this.bindResource();
        }
      });
    });
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    this.formData.append('file', files[0], files[0].name);
  }

  loadData() {
    this.resourceService.get(this.resourceId).subscribe((data: any) => {
      let resource = data as _model.Resource;
      for (let rService of resource.serviceResource) {
        if (rService.serviceId > 0) {
          for (let cat of this.categories) {
            this.selectedServices.push(
              cat.services.find(t => t.serviceId === rService.serviceId)
            );
          }
        }
      }
      this.resource = resource;
      this.bindResource();
    });
  }

  bindResource() {
    if (!this.resource.workingHours.length) {
      this.resource.workingHours = _api.LookupService.workingHours(
        this.resourceId
      );
    }
    this.selected = this.resource.workingHours.filter(op => op.isOpen === true);
    this.trustedProfileImageUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      environment.apiUrl + '/UploadFiles/' + this.resource.profileImageUrl
    );

    if (this.resource.languages && this.resource.languages.length > 0)
      this.languages = this.resource.languages.split(',');

    if (this.resource.qualifications && this.resource.qualifications.length > 0)
      this.qualifications = this.resource.qualifications.split(',');

    this.userForm.setValue({
      resourceId: this.resource.resourceId,
      organizationId: this.userInfo.currentUser.organizationId,
      firstName: this.resource.firstName,
      lastName: this.resource.lastName,
      gender: this.resource.gender,
      phone: this.resource.phone,
      mobile: this.resource.mobile,
      emailAddress: this.resource.emailAddress,
      isSendConfirmationEmail: this.resource.isSendConfirmationEmail,
      address: this.resource.address,
      color: this.resource.color,
      isDeleted: this.resource.isDeleted,
      profileImageUrl: this.resource.profileImageUrl,
      professionalMembershipNumber: this.resource.professionalMembershipNumber,
      careerStartedOn: this.resource.careerStartedOn,
      languages: this.resource.languages,
      qualifications: this.resource.qualifications,
      twitter: this.resource.twitter,
      linkedIn: this.resource.linkedIn,
      facebook: this.resource.facebook,
      google: this.resource.google,
      gapBetweenAppointments: this.resource.gapBetweenAppointments,
      messageOnBookingApp: this.resource.messageOnBookingApp,
      messageShowPosition: this.resource.messageShowPosition,
      serviceResource: this.resource.serviceResource,
      workingHours: this.resource.workingHours
    });
  }

  onSelect({ selected }) {
    var serviceResource = new _model.ServiceResource();
    serviceResource.serviceId = selected.serviceId;
    serviceResource.serviceName = selected.serviceName;

    if (selected && selected.serviceId && selected.serviceId > 0)
      this.selectedServices.push(serviceResource);
  }

  onSubmit(formData: FormGroup) {
    this.submitted = true;

    Object.keys(this.userForm.controls).forEach(key => {
      const controlErrors: ValidationErrors = this.userForm.get(key).errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach(keyError => {
          console.log(
            'Key control: ' + key + ', keyError: ' + keyError + ', err value: ',
            controlErrors[keyError]
          );
        });
      }
    });

    if (!formData.invalid) {
      formData.get('serviceResource').setValue(this.selectedServices);
      formData.get('languages').setValue(this.languages.join());
      formData.get('qualifications').setValue(this.qualifications.join());
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
          }
        );
      } else {
        this.resourceService.update(this.resourceId, formData.value).subscribe(
          (data: any) => {
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
          }
        );
      }
    }
  }

  dayOfWeek(dayIndex) {
    return [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday'
    ][dayIndex];
  }

  getHour(time) {
    return time.substr(0, 2);
  }

  getMinute(time) {
    return time.substr(3, 2);
  }

  updateIsOpen($event, rowIndex, isSelected) {
    this.resource.workingHours[rowIndex]['isOpen'] = !isSelected;
  }

  updateValue(event, cell, rowIndex, type) {
    let opTime = this.resource.workingHours[rowIndex];
    if (type == 'hour') {
      this.resource.workingHours[rowIndex][cell] = this.resource.workingHours[
        rowIndex
      ][cell].replace(
        this.resource.workingHours[rowIndex][cell].substr(0, 2),
        event.target.value
      );
    } else {
      this.resource.workingHours[rowIndex][cell] = this.resource.workingHours[
        rowIndex
      ][cell].replace(
        this.resource.workingHours[rowIndex][cell].substr(3, 2),
        event.target.value
      );
    }
    this.resource.workingHours = [...this.resource.workingHours];
  }

  updateAllTimings(event, rowIndex) {
    for (let i: number = 0; i < this.resource.workingHours.length; i++) {
      this.resource.workingHours[i].startTime = this.resource.workingHours[
        rowIndex
      ].startTime;
      this.resource.workingHours[i].endTime = this.resource.workingHours[
        rowIndex
      ].endTime;
    }
  }

  addLanguage() {
    const dialogRef = this.dialogRef.open(LanguageComponent, {
      panelClass: 'small-dialog'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.languages = result.languages;
      }
    });
  }

  removeLanguage(item): void {
    const index = this.languages.indexOf(item);
    if (index >= 0) {
      this.languages.splice(index, 1);
    }
  }

  addQualification(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.qualifications.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  removeQualification(item): void {
    const index = this.qualifications.indexOf(item);
    if (index >= 0) {
      this.qualifications.splice(index, 1);
    }
  }
}
