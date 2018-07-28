import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { OnlineBookingSettingService } from './onlinebooking.service';
import { OpeningTimesService } from '../../../modules/openingtimes/openingtimes.service';
import { OnlineBookingSetting } from './onlinebooking';
import { environment } from '../../../environments/environment';
import { Router } from "@angular/router";
const apiUrl = environment.apiUrl;
@Component({
    moduleId: module.id,
    templateUrl: 'onlinebooking.html'
})

export class OnlineBookingSettingComponent implements OnInit {
    onlineBookingSetting: OnlineBookingSetting;
    timezonelist: any[];
    userForm: FormGroup;
    constructor(private fb: FormBuilder, private onlineBookingSettingService: OnlineBookingSettingService, private openingtimesService: OpeningTimesService, private router: Router) {
        if (sessionStorage.getItem("organizationId") == null) {
            this.router.navigate(['']);
        }
    }
    ngOnInit() {
        this.userForm = this.fb.group({
            isCustomAllowBooking: [true],
            noticeForOnlineBooking: [''],
            blockAvailabilityAfter: [''],
            isShowPrice: [true],
            isCustomerSelectResourceGroup: [true],
            isCustomerSelectResources: [true],
            showResourceSelection: [''],
            isShowResourceImage: [true],
            isCustomerAllowAny: [true],
            defaultTimeZoneID: [''],
            timeIncrementsAvailability: [''],
            noAvailabilityMessage: [''],
            isCustomerBookwithoutAccount: [true],
            isMobileRequired: [true],
            isNotesForOnlineBooking: [true],
            notesForOnlineBooking: [''],
            confirmationMessageForBooking: [''],
            noticeForCancellation: [''],
            isCustomerCancelFromConfirmation: [true]
        });
        this.LoadTimeZone();
        this.LoadEmailSetting();
    }
    LoadTimeZone() {
        this.openingtimesService.getByCategory(apiUrl, "Timezone").subscribe((data: any) => {
            this.timezonelist = data["results"];
            //this.userAccountService.get(apiUrl, Number(sessionStorage.getItem("organizationId"))).subscribe((data: any) => {
            //    var obj = data["results"][0];
            //    this.selectedTimeZone = obj["timezoneId"];
            //});
        });
    }
    onSubmit(formData: any) {
        this.onlineBookingSetting = {
            onlineBookingSettingID: 0,
            organizationID: Number(sessionStorage.getItem("organizationId")),
            isCustomAllowBooking: formData.controls["isCustomAllowBooking"].value,
            noticeForOnlineBooking: formData.controls["noticeForOnlineBooking"].value,
            blockAvailabilityAfter: formData.controls["blockAvailabilityAfter"].value,
            isShowPrice: formData.controls["isShowPrice"].value,
            isCustomerSelectResourceGroup: formData.controls["isCustomerSelectResourceGroup"].value,
            isCustomerSelectResources: formData.controls["isCustomerSelectResources"].value,
            showResourceSelection: formData.controls["showResourceSelection"].value,
            isShowResourceImage: formData.controls["isShowResourceImage"].value,
            isCustomerAllowAny: formData.controls["isCustomerAllowAny"].value,
            defaultTimeZoneID: formData.controls["defaultTimeZoneID"].value,
            timeIncrementsAvailability: formData.controls["timeIncrementsAvailability"].value,
            noAvailabilityMessage: formData.controls["noAvailabilityMessage"].value,
            isCustomerBookwithoutAccount: formData.controls["isCustomerBookwithoutAccount"].value,
            isMobileRequired: formData.controls["isMobileRequired"].value,
            isNotesForOnlineBooking: formData.controls["isNotesForOnlineBooking"].value,
            notesForOnlineBooking: formData.controls["notesForOnlineBooking"].value,
            confirmationMessageForBooking: formData.controls["confirmationMessageForBooking"].value,
            noticeForCancellation: formData.controls["noticeForCancellation"].value,
            isCustomerCancelFromConfirmation: formData.controls["isCustomerCancelFromConfirmation"].value,
            isDeleted: false
        };
        this.onlineBookingSettingService.post(apiUrl, this.onlineBookingSetting).subscribe((data: any) => { });
    }
    LoadEmailSetting() {
        this.onlineBookingSettingService.get(apiUrl, Number(sessionStorage.getItem("organizationId")))
            .subscribe((data: any) => {
                var obj = data["results"][0];
                console.log(obj);
                this.userForm = this.fb.group({
                    isCustomAllowBooking: [obj["isCustomAllowBooking"]],
                    noticeForOnlineBooking: [obj["noticeForOnlineBooking"]],
                    blockAvailabilityAfter: [obj["blockAvailabilityAfter"]],
                    isShowPrice: [obj["isShowPrice"]],
                    isCustomerSelectResourceGroup: [obj["isCustomerSelectResourceGroup"]],
                    isCustomerSelectResources: [obj["isCustomerSelectResources"]],
                    showResourceSelection: [obj["showResourceSelection"]],
                    isShowResourceImage: [obj["isShowResourceImage"]],
                    isCustomerAllowAny: [obj["isCustomerAllowAny"]],
                    defaultTimeZoneID: [obj["defaultTimeZoneID"]],
                    timeIncrementsAvailability: [obj["timeIncrementsAvailability"]],
                    noAvailabilityMessage: [obj["noAvailabilityMessage"]],
                    isCustomerBookwithoutAccount: [obj["isCustomerBookwithoutAccount"]],
                    isMobileRequired: [obj["isMobileRequired"]],
                    isNotesForOnlineBooking: [obj["isNotesForOnlineBooking"]],
                    notesForOnlineBooking: [obj["notesForOnlineBooking"]],
                    confirmationMessageForBooking: [obj["confirmationMessageForBooking"]],
                    noticeForCancellation: [obj["noticeForCancellation"]],
                    isCustomerCancelFromConfirmation: [obj["isCustomerCancelFromConfirmation"]]
                });
            });
    }
}