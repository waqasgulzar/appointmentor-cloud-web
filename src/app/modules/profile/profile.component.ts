﻿/*
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';

import { Router } from '@angular/router';
import { Constant } from '../../shared/constants/constants';
import { NotificationService } from '../../shared/services/notification.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationProperties } from '../../shared/interfaces/NotificationProperties';
import { UserInfoService } from '../../shared/services/userInfo.service';
import {
  DomSanitizer,
  SafeResourceUrl,
  SafeUrl
} from '@angular/platform-browser';
import * as _model from '../../shared/models/models';
import * as _api from '../../shared/services/api';
import { environment } from '../../../environments/environment';

@Component({
  moduleId: module.id,
  templateUrl: 'profile.html'
})
export class ProfileComponent implements OnInit {
  orgInfo = new _model.User();
  userForm: FormGroup;
  logoForMarketingPath: File;
  profileImageForMicrosite1: File;
  profileImageForMicrosite2: File;
  profileImageForMicrosite3: File;
  profileImageForMicrosite4: File;
  bannerImageForMicrosite: File;
  submitted = false;
  formData = new FormData();
  fileToUpload: File = null;
  trustedProfileImageUrl: SafeUrl;

  constructor(
    private fb: FormBuilder,
    private profileService: _api.ProfileService,
    private router: Router,
    private notificationService: NotificationService,
    private spinner: NgxSpinnerService,
    private userInfo: UserInfoService,
    private fileService: _api.FilesService,
    private sanitizer: DomSanitizer
  ) {}

  fileChangeMicrosite(files: any, microsite: number) {
    if (microsite == 0) {
      this.logoForMarketingPath = files[0].nativeElement;
    } else if (microsite == 1) {
      this.profileImageForMicrosite1 = files[0].nativeElement;
    } else if (microsite == 2) {
      this.profileImageForMicrosite2 = files[0].nativeElement;
    } else if (microsite == 3) {
      this.profileImageForMicrosite3 = files[0].nativeElement;
    } else if (microsite == 4) {
      this.profileImageForMicrosite4 = files[0].nativeElement;
    } else if (microsite == 5) {
      this.bannerImageForMicrosite = files[0].nativeElement;
    }
  }

  ngOnInit() {
    this.orgInfo = this.userInfo.currentUser;
    this.loadProfile();
  }

  loadProfile() {
    this.trustedProfileImageUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      environment.apiUrl +
        '/UploadFiles/' +
        this.orgInfo.profile.logoForMarketingPath
    );
    this.userForm = this.fb.group({
      organizationId: [this.orgInfo.organizationId],
      businessName: [
        this.orgInfo.profile.businessName,
        Validators.compose([Validators.required, Validators.maxLength(50)])
      ],
      aboutYourBusiness: [this.orgInfo.profile.aboutYourBusiness],
      street: [this.orgInfo.profile.street],
      city: [this.orgInfo.profile.city],
      postCode: [this.orgInfo.profile.postCode],
      businessPhoneNumber: [this.orgInfo.profile.businessPhoneNumber],
      businessWebsite: [this.orgInfo.profile.businessWebsite],
      mobileNumber: [this.orgInfo.profile.mobileNumber],
      emailAddress: [this.orgInfo.profile.emailAddress],
      otherEmailAddress: [this.orgInfo.profile.otherEmailAddress],
      sendFromEmailAddress: [this.orgInfo.profile.sendFromEmailAddress],
      sendFromNameForEmail: [this.orgInfo.profile.sendFromNameForEmail],
      sendFromNameForSMS: [this.orgInfo.profile.sendFromNameForSMS],
      logoForMarketingPath: [this.orgInfo.profile.logoForMarketingPath],
      setAsDefaultMircrosite1: [
        this.orgInfo.profile.setAsDefaultMircrosite1 || false
      ],
      setAsDefaultMircrosite2: [
        this.orgInfo.profile.setAsDefaultMircrosite2 || false
      ],
      setAsDefaultMircrosite3: [
        this.orgInfo.profile.setAsDefaultMircrosite3 || false
      ],
      setAsDefaultMircrosite4: [
        this.orgInfo.profile.setAsDefaultMircrosite4 || false
      ],
      profileImageForMicrosite1: [
        this.orgInfo.profile.profileImageForMicrosite1
      ],
      profileImageForMicrosite2: [
        this.orgInfo.profile.profileImageForMicrosite2
      ],
      profileImageForMicrosite3: [
        this.orgInfo.profile.profileImageForMicrosite3
      ],
      profileImageForMicrosite4: [
        this.orgInfo.profile.profileImageForMicrosite4
      ],
      bannerImageForMicrosite: [this.orgInfo.profile.bannerImageForMicrosite]
    });
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    this.formData.append('file', files[0], files[0].name);
  }

  onSubmit(userForm: FormGroup) {
    this.submitted = true;

    if (userForm.valid) {
      this.spinner.show();
      // Upload Image
      this.fileService.upload(this.formData).subscribe(data => {
        let fileInfo = data as _model.FileInformation;
        //userForm.setValue({ logoForMarketingPath: fileInfo.onDiskPath });
        userForm.get('logoForMarketingPath').setValue(fileInfo.onDiskName);
        // Update Profile
        this.profileService.create(userForm.value).subscribe(
          (data: any) => {
            this.orgInfo.profile = userForm.value;
            this.orgInfo.profile.logoForMarketingPath = fileInfo.onDiskName;
            this.userInfo.setInfo(this.orgInfo);
            const successNotification: NotificationProperties = {
              message:
                'Organisation Profile has been updated successfully. These changes will take effect next time you login.',
              title: 'Organisation Profile'
            };
            this.notificationService.success(successNotification);
            this.spinner.hide();
            this.submitted = false;
            this.loadProfile();
          },
          error => {
            this.spinner.hide();
            const errorNotification: NotificationProperties = {
              message: error.error,
              title: 'Organisation Profile'
            };
            this.submitted = false;
            this.notificationService.error(errorNotification);
          }
        );
      });
    }
  }
}
*/
//
// IMPORTANT: this is a plugin which requires jQuery for initialisation and data manipulation

import { Component, OnInit, OnChanges, AfterViewInit, SimpleChanges } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators, FormGroup} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { FormBuilder } from '@angular/forms';

declare const $: any;
interface FileReaderEventTarget extends EventTarget {
    result: string;
}

interface FileReaderEvent extends Event {
    target: FileReaderEventTarget;
    getMessage(): string;
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const isSubmitted = form && form.submitted;
        return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }
}

@Component({
    moduleId: module.id,
    templateUrl: 'profile.html'
})
export class ProfileComponent implements OnInit, OnChanges, AfterViewInit {
    cities = [
        {value: 'paris-0', viewValue: 'Paris'},
        {value: 'miami-1', viewValue: 'Miami'},
        {value: 'bucharest-2', viewValue: 'Bucharest'},
        {value: 'new-york-3', viewValue: 'New York'},
        {value: 'london-4', viewValue: 'London'},
        {value: 'barcelona-5', viewValue: 'Barcelona'},
        {value: 'moscow-6', viewValue: 'Moscow'},
    ];
    emailFormControl = new FormControl('', [
        Validators.required,
        Validators.email,
    ]);

    matcher = new MyErrorStateMatcher();

    type : FormGroup;
    constructor(private formBuilder: FormBuilder) {}

    isFieldValid(form: FormGroup, field: string) {
        return !form.get(field).valid && form.get(field).touched;
    }

    displayFieldCss(form: FormGroup, field: string) {
        return {
            'has-error': this.isFieldValid(form, field),
            'has-feedback': this.isFieldValid(form, field)
        };
    }
    ngOnInit() {
        this.type = this.formBuilder.group({
            // To add a validator, we must first convert the string value into an array. The first item in the array is the default value if any, then the next item in the array is the validator. Here we are adding a required validator meaning that the firstName attribute must have a value in it.
            firstName: [null, Validators.required],
            lastName: [null, Validators.required],
            email: [null, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
        });
        // Code for the Validator
        const $validator = $('.card-wizard form').validate({
            rules: {
                firstname: {
                    required: true,
                    minlength: 3
                },
                lastname: {
                    required: true,
                    minlength: 3
                },
                email: {
                    required: true,
                    minlength: 3,
                }
            },

            highlight: function(element) {
                $(element).closest('.form-group').removeClass('has-success').addClass('has-danger');
            },
            success: function(element) {
                $(element).closest('.form-group').removeClass('has-danger').addClass('has-success');
            },
            errorPlacement : function(error, element) {
                $(element).append(error);
            }
        });

        // Wizard Initialization
        $('.card-wizard').bootstrapWizard({
            'tabClass': 'nav nav-pills',
            'nextSelector': '.btn-next',
            'previousSelector': '.btn-previous',

            onNext: function(tab, navigation, index) {
                var $valid = $('.card-wizard form').valid();
                if(!$valid) {
                    $validator.focusInvalid();
                    return false;
                }
            },

            onInit: function(tab: any, navigation: any, index: any){

                // check number of tabs and fill the entire row
                let $total = navigation.find('li').length;
                let $wizard = navigation.closest('.card-wizard');

                let $first_li = navigation.find('li:first-child a').html();
                let $moving_div = $('<div class="moving-tab">' + $first_li + '</div>');
                $('.card-wizard .wizard-navigation').append($moving_div);

                $total = $wizard.find('.nav li').length;
                let  $li_width = 100/$total;

                let total_steps = $wizard.find('.nav li').length;
                let move_distance = $wizard.width() / total_steps;
                let index_temp = index;
                let vertical_level = 0;

                let mobile_device = $(document).width() < 600 && $total > 3;

                if(mobile_device){
                    move_distance = $wizard.width() / 2;
                    index_temp = index % 2;
                    $li_width = 50;
                }

                $wizard.find('.nav li').css('width',$li_width + '%');

                let step_width = move_distance;
                move_distance = move_distance * index_temp;

                let $current = index + 1;

                if($current == 1 || (mobile_device == true && (index % 2 == 0) )){
                    move_distance -= 8;
                } else if($current == total_steps || (mobile_device == true && (index % 2 == 1))){
                    move_distance += 8;
                }

                if(mobile_device){
                    let x: any = index / 2;
                    vertical_level = parseInt(x);
                    vertical_level = vertical_level * 38;
                }

                $wizard.find('.moving-tab').css('width', step_width);
                $('.moving-tab').css({
                    'transform':'translate3d(' + move_distance + 'px, ' + vertical_level +  'px, 0)',
                    'transition': 'all 0.5s cubic-bezier(0.29, 1.42, 0.79, 1)'

                });
                $('.moving-tab').css('transition','transform 0s');
            },

            onTabClick : function(tab: any, navigation: any, index: any){

                const $valid = $('.card-wizard form').valid();

                if (!$valid) {
                    return false;
                } else {
                    return true;
                }
            },

            onTabShow: function(tab: any, navigation: any, index: any) {
                let $total = navigation.find('li').length;
                let $current = index + 1;

                const $wizard = navigation.closest('.card-wizard');

                // If it's the last tab then hide the last button and show the finish instead
                if ($current >= $total) {
                    $($wizard).find('.btn-next').hide();
                    $($wizard).find('.btn-finish').show();
                } else {
                    $($wizard).find('.btn-next').show();
                    $($wizard).find('.btn-finish').hide();
                }

                const button_text = navigation.find('li:nth-child(' + $current + ') a').html();

                setTimeout(function(){
                    $('.moving-tab').text(button_text);
                }, 150);

                const checkbox = $('.footer-checkbox');

                if ( index !== 0 ) {
                    $(checkbox).css({
                        'opacity':'0',
                        'visibility':'hidden',
                        'position':'absolute'
                    });
                } else {
                    $(checkbox).css({
                        'opacity':'1',
                        'visibility':'visible'
                    });
                }
                $total = $wizard.find('.nav li').length;
                let  $li_width = 100/$total;

                let total_steps = $wizard.find('.nav li').length;
                let move_distance = $wizard.width() / total_steps;
                let index_temp = index;
                let vertical_level = 0;

                let mobile_device = $(document).width() < 600 && $total > 3;

                if(mobile_device){
                    move_distance = $wizard.width() / 2;
                    index_temp = index % 2;
                    $li_width = 50;
                }

                $wizard.find('.nav li').css('width',$li_width + '%');

                let step_width = move_distance;
                move_distance = move_distance * index_temp;

                $current = index + 1;

                if($current == 1 || (mobile_device == true && (index % 2 == 0) )){
                    move_distance -= 8;
                } else if($current == total_steps || (mobile_device == true && (index % 2 == 1))){
                    move_distance += 8;
                }

                if(mobile_device){
                    let x: any = index / 2;
                    vertical_level = parseInt(x);
                    vertical_level = vertical_level * 38;
                }

                $wizard.find('.moving-tab').css('width', step_width);
                $('.moving-tab').css({
                    'transform':'translate3d(' + move_distance + 'px, ' + vertical_level +  'px, 0)',
                    'transition': 'all 0.5s cubic-bezier(0.29, 1.42, 0.79, 1)'

                });
            }
        });


        // Prepare the preview for profile picture
        $('#wizard-picture').change(function(){
            const input = $(this);

            if (input[0].files && input[0].files[0]) {
                const reader = new FileReader();

                reader.onload = function (e: FileReaderEvent) {
                    $('#wizardPicturePreview').attr('src', e.target.result).fadeIn('slow');
                };
                reader.readAsDataURL(input[0].files[0]);
            }
        });

        $('[data-toggle="wizard-radio"]').click(function(){
            const wizard = $(this).closest('.card-wizard');
            wizard.find('[data-toggle="wizard-radio"]').removeClass('active');
            $(this).addClass('active');
            $(wizard).find('[type="radio"]').removeAttr('checked');
            $(this).find('[type="radio"]').attr('checked', 'true');
        });

        $('[data-toggle="wizard-checkbox"]').click(function(){
            if ( $(this).hasClass('active')) {
                $(this).removeClass('active');
                $(this).find('[type="checkbox"]').removeAttr('checked');
            } else {
                $(this).addClass('active');
                $(this).find('[type="checkbox"]').attr('checked', 'true');
            }
        });

        $('.set-full-height').css('height', 'auto');

    }

    ngOnChanges(changes: SimpleChanges) {
        const input = $(this);

        if (input[0].files && input[0].files[0]) {
            const reader: any = new FileReader();

            reader.onload = function (e: FileReaderEvent) {
                $('#wizardPicturePreview').attr('src', e.target.result).fadeIn('slow');
            };
            reader.readAsDataURL(input[0].files[0]);
        }
    }
    ngAfterViewInit() {

        $( window ).resize( () => { $('.card-wizard').each(function(){

            const $wizard = $(this);
            const index = $wizard.bootstrapWizard('currentIndex');
            let $total = $wizard.find('.nav li').length;
            let  $li_width = 100/$total;

            let total_steps = $wizard.find('.nav li').length;
            let move_distance = $wizard.width() / total_steps;
            let index_temp = index;
            let vertical_level = 0;

            let mobile_device = $(document).width() < 600 && $total > 3;

            if(mobile_device){
                move_distance = $wizard.width() / 2;
                index_temp = index % 2;
                $li_width = 50;
            }

            $wizard.find('.nav li').css('width',$li_width + '%');

            let step_width = move_distance;
            move_distance = move_distance * index_temp;

            let $current = index + 1;

            if($current == 1 || (mobile_device == true && (index % 2 == 0) )){
                move_distance -= 8;
            } else if($current == total_steps || (mobile_device == true && (index % 2 == 1))){
                move_distance += 8;
            }

            if(mobile_device){
                let x: any = index / 2;
                vertical_level = parseInt(x);
                vertical_level = vertical_level * 38;
            }

            $wizard.find('.moving-tab').css('width', step_width);
            $('.moving-tab').css({
                'transform':'translate3d(' + move_distance + 'px, ' + vertical_level +  'px, 0)',
                'transition': 'all 0.5s cubic-bezier(0.29, 1.42, 0.79, 1)'
            });

            $('.moving-tab').css({
                'transition': 'transform 0s'
            });
        });
        });
    }
}


