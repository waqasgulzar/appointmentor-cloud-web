import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validator } from '@angular/forms';
import { Router } from '@angular/router';
import * as _model from '../../shared/models/models';
import { NotificationService } from '../../shared/services/notification.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationProperties } from '../../shared/interfaces/NotificationProperties';
import { UserInfoService } from '../../shared/services/userInfo.service';
import * as _api from '../../shared/services/api';

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
    private welcomePackService: _api.WelcomePackService
  ) {}

  ngOnInit() {
    this.accesLevels = [
      { id: 1, title: 'Personal' },
      { id: 2, title: 'Local share' },
      { id: 3, title: 'Global share' }
    ];

    this.loadData();
    this.orgInfo = this.userInfo.currentUser;
    this.mediaLibraryForm = this.fb.group({
      AccesLevelId: []
    });

    this.loadMediaLibrary();
  }

  loadData() {
    this.lookUpService.load('DocumentTypes').subscribe((data: any) => {
      this.documentTypes = data;
    });
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    this.formData.append('file', files[0], files[0].name);

    const documentType = this.documentTypes.find(
      t => t.title === this.fileToUpload.type
    ) as _model.Lookup;

    this.fileService
      .upload(this.formData)
      .subscribe((fileInfo: _model.FileInformation) => {
        let media = new _model.MediaLibrary();
        media.fileName = this.fileToUpload.name;
        media.fileSize = this.fileToUpload.size;
        media.onDiskName = fileInfo.onDiskName;
        media.onDiskPath = fileInfo.onDiskPath;
        media.mediaTypeId = 1;//Number(mediaTypeId);
        media.documentTypeId =
          documentType.id == undefined ? 1 : documentType.id;
        media.isDeleted = false;

        this.mediaLibraryService.create(media).subscribe(data => {
          this.loadMediaLibrary();
        });
      });
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
