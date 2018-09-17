import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import * as _model from '../../shared/models/models';
import { NotificationService } from '../../shared/services/notification.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationProperties } from '../../shared/interfaces/NotificationProperties';
import { UserInfoService } from '../../shared/services/userInfo.service';
import { MatChipInputEvent } from '@angular/material';
import * as _api from '../../shared/services/api';

@Component({
  moduleId: module.id,
  templateUrl: 'welcome-pack.html'
})
export class WelcomePackComponent implements OnInit {
  orgInfo = new _model.User();
  userForm: FormGroup;
  formData = new FormData();
  submitted = false;
  files: Array<_model.MediaLibrary>;
  mediaTypes: Array<any>;
  documentTypes: Array<any>;
  cclist = [{ email: this.userInfo.currentUser.emailAddress }];
  editorConfig = {
    editable: true,
    spellcheck: false,
    height: '30rem',
    minHeight: '15rem',
    placeholder: 'Type your message here...',
    translate: 'no'
  };
  htmlContent = '<p>Hi</p>';
  fileToUpload: File = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private notificationService: NotificationService,
    private spinner: NgxSpinnerService,
    private userInfo: UserInfoService,
    private fileService: _api.FilesService,
    private mediaLibraryService: _api.MediaLibraryService,
    private lookUpService: _api.LookupService,
    private welcomePackService: _api.WelcomePackService
  ) {}

  ngOnInit() {
    this.orgInfo = this.userInfo.currentUser;
    this.userForm = this.fb.group({
      organizationId: this.orgInfo.organizationId,
      mediaTypeId: [0, [Validators.required]],
      cc: [''],
      subject: [
        '',
        Validators.compose([
          Validators.required,
          Validators.maxLength(50),
          Validators.pattern('^[a-zA-Z0-9]*$')
        ])
      ],
      message: [
        '',
        Validators.compose([Validators.required, Validators.maxLength(500)])
      ]
    });

    this.loadData();
  }

  loadData() {
    this.lookUpService.load('MediaTypes').subscribe((data: any) => {
      this.mediaTypes = data;
    });

    this.lookUpService.load('DocumentTypes').subscribe((data: any) => {
      this.documentTypes = data;
    });

    this.loadMediaLibrary();
  }

  loadMediaLibrary() {
    this.mediaLibraryService
      .getAll()
      .subscribe((data: Array<_model.MediaLibrary>) => {
        this.files = data; //.filter(t => t.mediaTypeId == Number(this.userForm.get('mediaTypeId')));
      });
  }

  removeFile(id: number) {
    this.mediaLibraryService.delete(id).subscribe((data: any) => {
      this.loadMediaLibrary();
      const successNotification: NotificationProperties = {
        message: 'File has been deleted successfully.',
        title: 'Welcome Pack'
      };
      this.notificationService.success(successNotification);
    });
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    this.formData.append('file', files[0], files[0].name);
    const mediaTypeId = this.userForm.value['mediaTypeId'];
    const documentType = this.documentTypes.find(
      t => t.title === this.fileToUpload.type
    ) as _model.Lookup;
    this.fileService.upload(this.formData).subscribe(
      (fileInfo: _model.FileInformation) => {
        let media = new _model.MediaLibrary();
        media.fileName = this.fileToUpload.name;
        media.fileSize = this.fileToUpload.size;
        media.onDiskName = fileInfo.onDiskName;
        media.onDiskPath = fileInfo.onDiskPath;
        media.mediaTypeId = Number(mediaTypeId);
        media.documentTypeId =
          documentType.id == undefined ? 1 : documentType.id;
        media.isDeleted = false;
        this.mediaLibraryService.create(media).subscribe(data => {
          this.loadMediaLibrary();
        });
      },
      error => {
        console.log(error);
      }
    );
  }

  onSubmit(userForm: FormGroup) {
    this.submitted = true;

    if (!userForm.valid) {
      this.spinner.hide();
      this.welcomePackService.create(userForm.value).subscribe(
        data => {
          const successNotification: NotificationProperties = {
            message: 'Welcome Pack has been save successfully.',
            title: 'Welcome Pack'
          };
          this.notificationService.success(successNotification);
          this.spinner.hide();
        },
        error => {
          this.spinner.hide();
        }
      );
    }
  }
}
