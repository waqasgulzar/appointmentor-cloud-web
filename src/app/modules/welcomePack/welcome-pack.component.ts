import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from "@angular/forms";
import { Router } from "@angular/router";
import * as _model from "../../shared/models/models";
import { NotificationService } from "../../shared/services/notification.service";
import { NgxSpinnerService } from "ngx-spinner";
import { NotificationProperties } from "../../shared/interfaces/NotificationProperties";
import { UserInfoService } from "../../shared/services/userInfo.service";
import { MatChipInputEvent } from "@angular/material";
import * as _api from "../../shared/services/api";

@Component({
  moduleId: module.id,
  templateUrl: "welcome-pack.html"
})
export class WelcomePackComponent implements OnInit {
  orgInfo = new _model.User();
  userForm: FormGroup;
  mediaFileForm: FormGroup;
  formData = new FormData();
  submitted = false;
  uploadedMediaLibraryFiles: Array<_model.MediaLibrary>;
  mediaLibObj = new _model.MediaLibrary();
  types: Array<any>;
  cclist = [{ email: this.userInfo.currentUser.emailAddress }];
  editorConfig = {
    editable: true,
    spellcheck: false,
    height: "30rem",
    minHeight: "15rem",
    placeholder: "Type your message here...",
    translate: "no"
  };
  htmlContent = "<p>Hi</p>";
  fileToUpload: File = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private notificationService: NotificationService,
    private spinner: NgxSpinnerService,
    private userInfo: UserInfoService,
    private mediaFileService: _api.MediaLibraryService
  ) {}

  ngOnInit() {
    this.orgInfo = this.userInfo.currentUser;
    this.types = [
      { id: 1, title: "Appointment Booking" },
      { id: 2, title: "Appointment Cancellation" },
      { id: 3, title: "Customer Registration" }
    ];


    this.mediaFileForm = this.fb.group({
      //id: [],
      //mediaTypeId: [],
      //documentTypeId: [],
      fileName: [],
      fileSize: []
      //onDiskName: [],
      //onDiskPath: [],
      //createdBy: [],
      //createdOn: [],
      //isDeleted: false
    });

    this.userForm = this.fb.group({
      organizationId: this.orgInfo.organizationId,
      typeId: [0, [Validators.required]],
      cc: [""],
      subject: [
        "",
        Validators.compose([
          Validators.required,
          Validators.maxLength(50),
          Validators.pattern("^[a-zA-Z0-9]*$")
        ])
      ],
      message: [
        "",
        Validators.compose([Validators.required, Validators.maxLength(500)])
      ]
    });
  }

  // add(event: MatChipInputEvent): void {
  //   const input = event.input;
  //   const value = event.value;

  //   // Add our fruit
  //   if ((value || "").trim()) {
  //     this.cclist.push({ email: value.trim() });
  //   }

  //   // Reset the input value
  //   if (input) {
  //     input.value = "";
  //   }
  // }

  // remove(cc): void {
  //   const index = this.cclist.indexOf(cc);

  //   if (index >= 0) {
  //     this.cclist.splice(index, 1);
  //   }
  // }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);

    this.mediaFileForm.setValue({
      fileName: this.fileToUpload.name,
      fileSize: this.fileToUpload.size
    });

    this.mediaFileService.upload(this.mediaFileForm.value).subscribe(
      data => {
        let fileInfo = data as _model.MediaLibrary;
        this.uploadedMediaLibraryFiles.concat(fileInfo);
        //console.log(fileInfo);
      },
      error => {
        console.log(error);
      }
    );
  }

  onSubmit(userForm: FormGroup) {
    this.submitted = true;

    if (!userForm.valid) {
    }
  }
}
