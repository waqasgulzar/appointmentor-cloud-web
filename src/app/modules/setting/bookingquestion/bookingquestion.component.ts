import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as _model from '../../../shared/models/models';
import * as _api from '../../../shared/services/api';
import { Router } from "@angular/router";
@Component({
  selector: 'bookingquestion-component',
  moduleId: module.id,
  templateUrl: 'bookingquestion.html'
})
export class BookingQuestionComponent implements OnInit {
  bookingQuestions: _model.BookingQuestion[];
  bookingQuestion: _model.BookingQuestion;
  userForm: FormGroup;
  removeBookingQuestionId: number = 0;
  updatedBookingQuestionId: number = 0;
  savebuttonText: string = "Save";
  isAlwaysShow: boolean = true;

  services: _model.Service[];
  questionServices: _model.QuestionService[];
  questionService: _model.QuestionService;
  selectedQuestionServices: _model.QuestionService[];
  selectedServiceIds: number[] = [];
  isCheckAll: boolean = false;

  constructor(private fb: FormBuilder,
    private resourcesService: _api.ResourceService,
    private bookingQuestionService: _api.BookingQuestionService,
    private router: Router) {

    this.LoadBookingQuestions();
  }
  ngOnInit() {
    this.ClearFields();
  }
  LoadBookingQuestions() {
    this.bookingQuestionService.getAll()
      .subscribe((data: any) => {
        this.bookingQuestions = data;
      });
  }
  LoadBookingQuestionById(serviceId: number) {
    this.savebuttonText = "Update";
    this.updatedBookingQuestionId = serviceId;
    this.removeBookingQuestionId = 0;
    this.bookingQuestionService.get(serviceId)
      .subscribe((data: any) => {
        var obj = data[0];

        this.questionService = obj["questionservice"];
        this.selectedServiceIds = [];
        for (var i = 0; i < obj["questionservice"].length; i++) {
          this.selectedServiceIds.push(obj["questionservice"][i]["serviceId"]);
        }

        this.userForm = this.fb.group({
          question: [obj["question"]],
          questionType: [obj["questionType"]],
          link: [obj["link"]],
          isRequired: [obj["isRequired"]],
          isAlwaysShow: [obj["isAlwaysShow"]]
        });
      });
  }
  BookingQuestionIdForDelete(bookingQuestiond: number) {
    this.removeBookingQuestionId = bookingQuestiond;
  }
  RemoveBookingQuestion() {
    this.bookingQuestionService.delete(this.removeBookingQuestionId).subscribe((data: any) => {
      this.LoadBookingQuestions();
      this.ClearFields();
    });
  }
  ClearFields() {
    this.userForm = this.fb.group({
      question: ['', Validators.compose([Validators.required, Validators.maxLength(50)])],
      questionType: ['', Validators.required],
      link: ['', Validators.maxLength(500)],
      isRequired: [false],
      isAlwaysShow: [true]
    });
    this.savebuttonText = "Save";
    this.updatedBookingQuestionId = 0;
    this.removeBookingQuestionId = 0;
    this.LoadServices();
    this.LoadBookingQuestions();
  }
  onSubmit(formData: any) {
    let bookingQuestion = {
      bookingQuestionID: this.updatedBookingQuestionId,
      organizationID: Number(sessionStorage.getItem("organizationId")),
      question: formData.controls["question"].value,
      questionType: formData.controls["questionType"].value,
      link: formData.controls["link"].value,
      isRequired: formData.controls["isRequired"].value,
      isAlwaysShow: formData.controls["isAlwaysShow"].value,
      isDeleted: false
    } as _model.BookingQuestion;
    if (this.updatedBookingQuestionId == 0) {
      this.bookingQuestionService.create(bookingQuestion).subscribe((data: any) => {
        var obj = data["results"][0];
        for (var i = 0; i < this.selectedServiceIds.length; i++) {
          let questionService = {
            questionServiceId: 0,
            bookingQuestionId: obj,
            serviceId: this.selectedServiceIds[i],
            serviceName: '',
            isDeleted: false
          } as _model.QuestionService;
          this.bookingQuestionService.create(questionService).subscribe((data: any) => {
            this.LoadBookingQuestions();
          });
          this.LoadBookingQuestions();
        }
      });
    }
    else {

      this.bookingQuestionService.update(this.updatedBookingQuestionId, bookingQuestion).subscribe((data: any) => {
        for (var i = 0; i < this.selectedServiceIds.length; i++) {
          let questionService = {
            questionServiceId: 0,
            bookingQuestionId: this.updatedBookingQuestionId,
            serviceId: this.selectedServiceIds[i],
            serviceName: '',
            isDeleted: false
          } as _model.QuestionService;
          this.bookingQuestionService.create(questionService).subscribe((data: any) => {
            this.LoadBookingQuestions();
          });
          this.LoadBookingQuestions();
        }
      });

    }
    this.questionServices = null;
    this.ClearFields();
  }
  IsShow(isShow: boolean) {
    this.isAlwaysShow = isShow;
  }
  LoadServices() {
    this.resourcesService.getAll()
      .subscribe((data: any) => {
        this.services = data;
      });
  }
  clearServices() {
    this.questionServices = null;
    this.selectedServiceIds = [];
    this.isCheckAll = false;
  }
  isServiceChecked(serviceId: number) {
    if (this.questionServices != null) {
      if (this.questionServices.find(d => d.serviceId === serviceId && d.isDeleted == false)) {
        return true;
      }
      else {
        return false;
      }
    }
    else {
      return false;
    }
  }
  CheckAll() {
    this.isCheckAll = true;
    this.selectedServiceIds = [];
    this.resourcesService.getAll()
      .subscribe((data: any) => {
        for (var i = 0; i < data.length; i++) {
          this.selectedServiceIds.push(data[i]["serviceId"]);
        }
      });
  }
  UncheckAll() {
    this.selectedServiceIds = [];
    this.isCheckAll = false;
    this.questionServices = null;
    this.LoadServices();
  }
  Redirect() {
    this.router.navigate(['/bookingquestiondetail']);
  }
}