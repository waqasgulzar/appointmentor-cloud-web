import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SMSSettingService } from './smssetting.service';
import { SMSSetting } from './smssetting';
import { environment } from '../../../environments/environment';
import { Router } from "@angular/router";
const apiUrl = environment.apiUrl;
@Component({
    moduleId: module.id,
    templateUrl: 'smssetting.html'
})

export class SMSSettingComponent implements OnInit {
    smsSetting: SMSSetting;
    userForm: FormGroup;
    constructor(private fb: FormBuilder, private smsSettingService: SMSSettingService, private router: Router) {
        if (sessionStorage.getItem("organizationId") == null) {
            this.router.navigate(['']);
        }
    }
    ngOnInit() {
        this.userForm = this.fb.group({
            isBookingMade: [false],
            bookingMadeText: [''],
            isBookingModified: [false],
            bookingModifiedText: [''],
            isBookingCanceled: [false],
            bookingCanceledText: [''],
            isBookingRequested: [false],
            bookingRequestedText: [''],
            isBookingDeclined: [false],
            bookingDeclinedText: [''],
            isBookingReminder: [false],
            bookingReminderText: [''],
            amountOfNotice: [''],
            isRebooking: [false],
            rebookingText: [''],
            isBookingMadeExternal: [false],
            isBookingCanceledByCustomer: [false]
        });
        this.LoadEmailSetting();
    }
    onSubmit(formData: any) {
        this.smsSetting = {
            sMSSettingID: 0,
            organizationID: Number(sessionStorage.getItem("organizationId")),
            isBookingMade: formData.controls["isBookingMade"].value,
            bookingMadeText: formData.controls["bookingMadeText"].value,
            isBookingModified: formData.controls["isBookingModified"].value,
            bookingModifiedText: formData.controls["bookingModifiedText"].value,
            isBookingCanceled: formData.controls["isBookingCanceled"].value,
            bookingCanceledText: formData.controls["bookingCanceledText"].value,
            isBookingRequested: formData.controls["isBookingRequested"].value,
            bookingRequestedText: formData.controls["bookingRequestedText"].value,
            isBookingDeclined: formData.controls["isBookingDeclined"].value,
            bookingDeclinedText: formData.controls["bookingDeclinedText"].value,
            isBookingReminder: formData.controls["isBookingReminder"].value,
            bookingReminderText: formData.controls["bookingReminderText"].value,
            amountOfNotice: formData.controls["amountOfNotice"].value,
            isRebooking: formData.controls["isRebooking"].value,
            rebookingText: formData.controls["rebookingText"].value,
            isBookingMadeExternal: formData.controls["isBookingMadeExternal"].value,
            isBookingCanceledByCustomer: formData.controls["isBookingCanceledByCustomer"].value,
            isDeleted: false
        };
        this.smsSettingService.post(apiUrl, this.smsSetting).subscribe((data: any) => {});
    }
    LoadEmailSetting() {
        this.smsSettingService.get(apiUrl, Number(sessionStorage.getItem("organizationId")))
            .subscribe((data: any) => {
                var obj = data["results"][0];
                console.log(obj);
                this.userForm = this.fb.group({
                    isBookingMade: [obj["isBookingMade"]],
                    bookingMadeText: [obj["bookingMadeText"]],
                    isBookingModified: [obj["isBookingModified"]],
                    bookingModifiedText: [obj["bookingModifiedText"]],
                    isBookingCanceled: [obj["isBookingCanceled"]],
                    bookingCanceledText: [obj["bookingCanceledText"]],
                    isBookingRequested: [obj["isBookingRequested"]],
                    bookingRequestedText: [obj["bookingRequestedText"]],
                    isBookingDeclined: [obj["isBookingDeclined"]],
                    bookingDeclinedText: [obj["bookingDeclinedText"]],
                    isBookingReminder: [obj["isBookingReminder"]],
                    bookingReminderText: [obj["bookingReminderText"]],
                    amountOfNotice: [obj["amountOfNotice"]],
                    isRebooking: [obj["isRebooking"]],
                    rebookingText: [obj["rebookingText"]],
                    isBookingMadeExternal: [obj["isBookingMadeExternal"]],
                    isBookingCanceledByCustomer: [obj["isBookingCanceledByCustomer"]]
                });
            });
    }
}