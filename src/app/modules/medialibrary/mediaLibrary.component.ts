import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validator } from '@angular/forms';
import { Router } from '@angular/router';
import * as _model from '../../shared/models/models';
import { NotificationService } from '../../shared/services/notification.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationProperties } from '../../shared/interfaces/NotificationProperties';
import { UserInfoService } from '../../shared/services/userInfo.service';
import * as _api from '../../shared/services/api';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';
import { environment } from '../../../environments/environment';

@Component({
  moduleId: module.id,
  templateUrl: 'mediaLibrary.html'
})
export class MediaLibraryComponent implements OnInit {
  mediaLibraryForm: FormGroup;
  orgInfo = new _model.User();
  accesLevels: Array<any>;
  submitted = false;
  fileToUpload: File = null;
  formData = new FormData();
  documentTypes: Array<any>;
  files: Array<_model.MediaLibrary>;

  constructor(
    private fb: FormBuilder,
    private notificationService: NotificationService,
    private spinner: NgxSpinnerService,
    private userInfo: UserInfoService,
    private fileService: _api.FilesService,
    private mediaLibraryService: _api.MediaLibraryService,
    private lookUpService: _api.LookupService,
    private welcomePackService: _api.WelcomePackService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.loadData();
    this.orgInfo = this.userInfo.currentUser;
    this.mediaLibraryForm = this.fb.group({
      mediaTypeId: [],
      AccesLevelId: []
    });

    this.loadMediaLibrary();
  }

  getTrustedUrl(onDiskName) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      environment.apiUrl + '/UploadFiles/' + onDiskName
    );
  }

  loadData() {
    this.lookUpService.load('MediaTypes').subscribe((data: any) => {
      this.accesLevels = data;
    });

    this.lookUpService.load('DocumentTypes').subscribe((data: any) => {
      this.documentTypes = data;
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

      const documentType = this.documentTypes.find(
        t => t.title === this.fileToUpload.type
      ) as _model.Lookup;

      const mediaTypeId = Number(userForm.controls['mediaTypeId'].value);

      const mediaType = this.accesLevels.find(
        t => t.id === mediaTypeId
      ) as _model.Lookup;

      this.fileService.upload(this.formData).subscribe(
        (fileInfo: _model.FileInformation) => {
          let media = new _model.MediaLibrary();
          media.fileName = this.fileToUpload.name;
          media.fileSize = this.fileToUpload.size;
          media.onDiskName = fileInfo.onDiskName;
          media.onDiskPath = fileInfo.onDiskPath;
          media.mediaTypeId = Number(userForm.controls['mediaTypeId'].value); //Number(mediaTypeId);
          media.documentTypeId =
            ( documentType == undefined || documentType.id == undefined )
              ? 1
              : documentType.id;
          media.isDeleted = false;
          media.documentType = documentType;
          media.mediaType = mediaType;

          //console.log(media);

          this.mediaLibraryService.create(media).subscribe(
            data => {
              this.loadMediaLibrary();
              this.spinner.hide();
            },
            error => {
              this.spinner.hide();
              const errorNotification: NotificationProperties = {
                message: error.error,
                title: 'Media Library'
              };
              this.submitted = false;
              this.notificationService.error(errorNotification);
            }
          );
        },
        error => {
          this.spinner.hide();
          const errorNotification: NotificationProperties = {
            message: error.error,
            title: 'Media Library'
          };
          this.submitted = false;
          this.notificationService.error(errorNotification);
        }
      );
    }
  }

  removeFile(id: number) {
    this.mediaLibraryService.delete(id).subscribe((data: any) => {
      this.loadMediaLibrary();
      const successNotification: NotificationProperties = {
        message: 'File has been deleted successfully.',
        title: 'Media Library'
      };
      this.notificationService.success(successNotification);
    });
  }

  loadMediaLibrary() {
    this.mediaLibraryService
      .getAll()
      .subscribe((data: Array<_model.MediaLibrary>) => {
        this.files = data; //.filter(t => t.mediaTypeId == Number(this.userForm.get('mediaTypeId')));
      });
  }
}
