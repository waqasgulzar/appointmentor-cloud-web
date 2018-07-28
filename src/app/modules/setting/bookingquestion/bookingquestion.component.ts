import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BookingQuestionService } from './bookingquestion.service';
import { ResourcesService } from '../../resources/resources.service';
import { Service } from '../../services/service';
import { BookingQuestion } from './bookingquestion';
import { QuestionService } from './questionservice';
import { environment } from '../../../environments/environment';
import { Router } from "@angular/router";
const apiUrl = environment.apiUrl;
@Component({
    selector: 'bookingquestion-component',
    moduleId: module.id,
    templateUrl: 'bookingquestion.html'
})
export class BookingQuestionComponent implements OnInit {
    bookingQuestions: BookingQuestion[];
    bookingQuestion: BookingQuestion;
    userForm: FormGroup;
    removeBookingQuestionId: number = 0;
    updatedBookingQuestionId: number = 0;
    savebuttonText: string = "Save";
    isAlwaysShow: boolean = true;

    services: Service[];
    questionServices: QuestionService[];
    questionService: QuestionService;
    selectedQuestionServices: QuestionService[];
    selectedServiceIds: number[] = [];
    isCheckAll: boolean = false;

    constructor(private fb: FormBuilder, private resourcesService: ResourcesService, private bookingQuestionService: BookingQuestionService, private router: Router) {
        if (sessionStorage.getItem("organizationId") == null) {
            this.router.navigate(['']);
        }
        this.LoadBookingQuestions();
    }
    ngOnInit() {
        this.ClearFields();
    }
    LoadBookingQuestions() {
        this.bookingQuestionService.get(apiUrl, Number(sessionStorage.getItem("organizationId")))
            .subscribe((data: any) => {
                this.bookingQuestions = data["results"];
            });
    }
    LoadBookingQuestionById(serviceId: number) {
        this.savebuttonText = "Update";
        this.updatedBookingQuestionId = serviceId;
        this.removeBookingQuestionId = 0;
        this.bookingQuestionService.getBookingQuestionById(apiUrl, serviceId)
            .subscribe((data: any) => {
                var obj = data["results"][0];

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
        this.bookingQuestionService.delete(apiUrl, this.removeBookingQuestionId).subscribe((data: any) => {
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
        this.bookingQuestion = {
            bookingQuestionId: this.updatedBookingQuestionId,
            organizationId: Number(sessionStorage.getItem("organizationId")),
            question: formData.controls["question"].value,
            questionType: formData.controls["questionType"].value,
            link: formData.controls["link"].value,
            isRequired: formData.controls["isRequired"].value,
            isAlwaysShow: formData.controls["isAlwaysShow"].value,
            isDeleted: false
        };
        if (this.updatedBookingQuestionId == 0) {
            this.bookingQuestionService.post(apiUrl, this.bookingQuestion).subscribe((data: any) => {
                var obj = data["results"][0];
                for (var i = 0; i < this.selectedServiceIds.length; i++) {
                    this.questionService = {
                        questionServiceId: 0,
                        bookingQuestionId: obj,
                        serviceId: this.selectedServiceIds[i],
                        serviceName: '',
                        isDeleted: false
                    };
                    this.bookingQuestionService.postQuestionServices(apiUrl, this.questionService).subscribe((data: any) => {
                        this.LoadBookingQuestions();
                    });
                    this.LoadBookingQuestions();
                }
            });
        }
        else {
            //Mark all Question Services to removed.
            this.bookingQuestionService.postQuestion(apiUrl, this.updatedBookingQuestionId).subscribe((data: any) => {
                this.bookingQuestionService.put(apiUrl, this.updatedBookingQuestionId, this.bookingQuestion).subscribe((data: any) => {
                    for (var i = 0; i < this.selectedServiceIds.length; i++) {
                        this.questionService = {
                            questionServiceId: 0,
                            bookingQuestionId: this.updatedBookingQuestionId,
                            serviceId: this.selectedServiceIds[i],
                            serviceName: '',
                            isDeleted: false
                        };
                        this.bookingQuestionService.postQuestionServices(apiUrl, this.questionService).subscribe((data: any) => {
                            this.LoadBookingQuestions();
                        });
                        this.LoadBookingQuestions();
                    }
                });
            });
        }
        this.questionServices = null;
        this.ClearFields();
    }
    IsShow(isShow: boolean) {
        this.isAlwaysShow = isShow;
    }
    LoadServices() {
        this.resourcesService.getServices(apiUrl, Number(sessionStorage.getItem("organizationId")))
            .subscribe((data: any) => {
                this.services = data["results"];
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
        this.resourcesService.getServices(apiUrl, Number(sessionStorage.getItem("organizationId")))
            .subscribe((data: any) => {
                for (var i = 0; i < data["results"].length; i++) {
                    this.selectedServiceIds.push(data["results"][i]["serviceId"]);
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