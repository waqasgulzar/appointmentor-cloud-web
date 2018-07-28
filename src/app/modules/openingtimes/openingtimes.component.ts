import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserAccountService } from '../../modules/useraccount/account.service';
import { OpeningTimesService } from './openingtimes.service';
import { OpeningTime } from './openingtime';
import { environment } from '../../environments/environment';
import { Router } from "@angular/router";
const apiUrl = environment.apiUrl;
@Component({
    selector: 'openingtimes-component',
    moduleId: module.id,
    templateUrl: 'openingtimes.html'
})
export class OpeningTimesComponent implements OnInit {
    timezonelist: any[];
    currencylist: any[];
    openingTimes: OpeningTime[];
    openingTime: OpeningTime;
    userForm: FormGroup;
    emailAddress: FormControl;
    selectedTimeZone: string;
    selectedCurrency: string;
    isHidden: boolean = true;
    public isMondayhidden = false;
    public isTuesdayhidden = false;
    public isWednesdayhidden = false;
    public isThursdayhidden = false;
    public isFridayhidden = false;
    public isSaturdayhidden = true;
    public isSundayhidden = true;
    public selectedOpeningHour: any = "00";
    public selectedClosingHour: any = "00";
    public selectedOpeningMinute: any = "00";
    public selectedClosingMinute: any = "00";
    savebuttonText: string = "Save";
    isMenuhidden: boolean = false;
    constructor(private fb: FormBuilder, private userAccountService: UserAccountService,  private openingtimesService: OpeningTimesService, private router: Router) {
        if (sessionStorage.getItem("isMenuhidden") == "true") {
            this.isMenuhidden = true;
            this.savebuttonText = "Save";
        }
        else
        {
            this.savebuttonText = "Update";
        }
        if (sessionStorage.getItem("organizationId") == null) {
            this.router.navigate(['']);
        }
    }
    ngOnInit() {
        this.userForm = this.fb.group({
            ckMonday: [true],
            MondayOpeningHour: ['00'],
            MondayOpeningMinute: ['00'],
            MondayClosingHour: ['00'],
            MondayClosingMinute: ['00'],
            ckTuesday: [true],
            TuesdayOpeningHour: ['00'],
            TuesdayOpeningMinute: ['00'],
            TuesdayClosingHour: ['00'],
            TuesdayClosingMinute: ['00'],
            ckWednesday: [true],
            WednesdayOpeningHour: ['00'],
            WednesdayOpeningMinute: ['00'],
            WednesdayClosingHour: ['00'],
            WednesdayClosingMinute: ['00'],
            ckThursday: [true],
            ThursdayOpeningHour: ['00'],
            ThursdayOpeningMinute: ['00'],
            ThursdayClosingHour: ['00'],
            ThursdayClosingMinute: ['00'],
            ckFriday: [true],
            FridayOpeningHour: ['00'],
            FridayOpeningMinute: ['00'],
            FridayClosingHour: ['00'],
            FridayClosingMinute: ['00'],
            ckSaturday: [false],
            SaturdayOpeningHour: ['00'],
            SaturdayOpeningMinute: ['00'],
            SaturdayClosingHour: ['00'],
            SaturdayClosingMinute: ['00'],
            ckSunday: [false],
            SundayOpeningHour: ['00'],
            SundayOpeningMinute: ['00'],
            SundayClosingHour: ['00'],
            SundayClosingMinute: ['00'],
            timezoneControl: [],
            currencyControl: []
        });
        this.LoadTimeZone();
        this.LoadCurrency();
        this.LoadOpeningtimes();
    }
    LoadOpeningtimes() {
        this.openingtimesService.get(apiUrl, Number(sessionStorage.getItem("organizationId"))).subscribe((data: any) => {
            var obj = data["results"];
            if (obj != null && obj.length > 0) {
                var mondayobj = data["results"][0];
                var tuesdayobj = data["results"][1];
                var wednesdayobj = data["results"][2];
                var thursdayobj = data["results"][3];
                var fridayobj = data["results"][4];
                var saturdayobj = data["results"][5];
                var sundayobj = data["results"][6];
                this.userForm = this.fb.group({
                    ckMonday: [mondayobj["isOpen"]],
                    MondayOpeningHour: [mondayobj["openingTime"].substr(0, 2)],
                    MondayOpeningMinute: [mondayobj["openingTime"].substr(3, 2)],
                    MondayClosingHour: [mondayobj["closingTime"].substr(0, 2)],
                    MondayClosingMinute: [mondayobj["closingTime"].substr(3, 2)],
                    ckTuesday: [tuesdayobj["isOpen"]],
                    TuesdayOpeningHour: [tuesdayobj["openingTime"].substr(0, 2)],
                    TuesdayOpeningMinute: [tuesdayobj["openingTime"].substr(3, 2)],
                    TuesdayClosingHour: [tuesdayobj["closingTime"].substr(0, 2)],
                    TuesdayClosingMinute: [tuesdayobj["closingTime"].substr(3, 2)],
                    ckWednesday: [wednesdayobj["isOpen"]],
                    WednesdayOpeningHour: [wednesdayobj["openingTime"].substr(0, 2)],
                    WednesdayOpeningMinute: [wednesdayobj["openingTime"].substr(3, 2)],
                    WednesdayClosingHour: [wednesdayobj["closingTime"].substr(0, 2)],
                    WednesdayClosingMinute: [wednesdayobj["closingTime"].substr(3, 2)],
                    ckThursday: [thursdayobj["isOpen"]],
                    ThursdayOpeningHour: [thursdayobj["openingTime"].substr(0, 2)],
                    ThursdayOpeningMinute: [thursdayobj["openingTime"].substr(3, 2)],
                    ThursdayClosingHour: [thursdayobj["closingTime"].substr(0, 2)],
                    ThursdayClosingMinute: [thursdayobj["closingTime"].substr(3, 2)],
                    ckFriday: [fridayobj["isOpen"]],
                    FridayOpeningHour: [fridayobj["openingTime"].substr(0, 2)],
                    FridayOpeningMinute: [fridayobj["openingTime"].substr(3, 2)],
                    FridayClosingHour: [fridayobj["closingTime"].substr(0, 2)],
                    FridayClosingMinute: [fridayobj["closingTime"].substr(3, 2)],
                    ckSaturday: [saturdayobj["isOpen"]],
                    SaturdayOpeningHour: [saturdayobj["openingTime"].substr(0, 2)],
                    SaturdayOpeningMinute: [saturdayobj["openingTime"].substr(3, 2)],
                    SaturdayClosingHour: [saturdayobj["closingTime"].substr(0, 2)],
                    SaturdayClosingMinute: [saturdayobj["closingTime"].substr(3, 2)],
                    ckSunday: [sundayobj["isOpen"]],
                    SundayOpeningHour: [sundayobj["openingTime"].substr(0, 2)],
                    SundayOpeningMinute: [sundayobj["openingTime"].substr(3, 2)],
                    SundayClosingHour: [sundayobj["closingTime"].substr(0, 2)],
                    SundayClosingMinute: [sundayobj["closingTime"].substr(3, 2)],
                    timezoneControl: [],
                    currencyControl: []
                });

                this.LoadTimeZone();
                this.LoadCurrency();
            }
        });
    }
    LoadTimeZone() {
        this.openingtimesService.getByCategory(apiUrl, "Timezone").subscribe((data: any) => {
            this.timezonelist = data["results"];
            this.userAccountService.get(Number(sessionStorage.getItem("organizationId"))).subscribe((data: any) => {
                var obj = data["results"][0];
                this.selectedTimeZone = obj["timezoneId"];
            });
        });
    }
    LoadCurrency() {
        this.openingtimesService.getByCategory(apiUrl, "Currency").subscribe((data: any) => {
            this.currencylist = data["results"];
            this.userAccountService.get(Number(sessionStorage.getItem("organizationId"))).subscribe((data: any) => {
                var obj = data["results"][0];
                this.selectedCurrency = obj["currencyId"];
            });
        });
    }
    ApplyChangesForAll(day: any) {
        switch (day) {
            case "Monday":
                this.selectedOpeningHour = this.userForm.value["MondayOpeningHour"];
                this.selectedOpeningMinute = this.userForm.value["MondayOpeningMinute"];
                this.selectedClosingHour = this.userForm.value["MondayClosingHour"];
                this.selectedClosingMinute = this.userForm.value["MondayClosingMinute"];
                break;
            case "Tuesday":
                this.selectedOpeningHour = this.userForm.value["TuesdayOpeningHour"];
                this.selectedOpeningMinute = this.userForm.value["TuesdayOpeningMinute"];
                this.selectedClosingHour = this.userForm.value["TuesdayClosingHour"];
                this.selectedClosingMinute = this.userForm.value["TuesdayClosingMinute"];
                break;
            case "Wednesday":
                this.selectedOpeningHour = this.userForm.value["WednesdayOpeningHour"];
                this.selectedOpeningMinute = this.userForm.value["WednesdayOpeningMinute"];
                this.selectedClosingHour = this.userForm.value["WednesdayClosingHour"];
                this.selectedClosingMinute = this.userForm.value["WednesdayClosingMinute"];
                break;
            case "Thursday":
                this.selectedOpeningHour = this.userForm.value["ThursdayOpeningHour"];
                this.selectedOpeningMinute = this.userForm.value["ThursdayOpeningMinute"];
                this.selectedClosingHour = this.userForm.value["ThursdayClosingHour"];
                this.selectedClosingMinute = this.userForm.value["ThursdayClosingMinute"];
                break;
            case "Friday":
                this.selectedOpeningHour = this.userForm.value["FridayOpeningHour"];
                this.selectedOpeningMinute = this.userForm.value["FridayOpeningMinute"];
                this.selectedClosingHour = this.userForm.value["FridayClosingHour"];
                this.selectedClosingMinute = this.userForm.value["FridayClosingMinute"];
                break;
            case "Saturday":
                this.selectedOpeningHour = this.userForm.value["SaturdayOpeningHour"];
                this.selectedOpeningMinute = this.userForm.value["SaturdayOpeningMinute"];
                this.selectedClosingHour = this.userForm.value["SaturdayClosingHour"];
                this.selectedClosingMinute = this.userForm.value["SaturdayClosingMinute"];
                break;
            case "Sunday":
                this.selectedOpeningHour = this.userForm.value["SundayOpeningHour"];
                this.selectedOpeningMinute = this.userForm.value["SundayOpeningMinute"];
                this.selectedClosingHour = this.userForm.value["SundayClosingHour"];
                this.selectedClosingMinute = this.userForm.value["SundayClosingMinute"];
                break;
        }
    }
    onChange(day: any, event: any) {
        switch (day) {
            case "ckMonday":
                if (!event.target.checked)
                    this.isMondayhidden = true;
                else
                    this.isMondayhidden = false;
                break;
            case "ckTuesday":
                if (!event.target.checked)
                    this.isTuesdayhidden = true;
                else
                    this.isTuesdayhidden = false;
                break;
            case "ckWednesday":
                if (!event.target.checked)
                    this.isWednesdayhidden = true;
                else
                    this.isWednesdayhidden = false;
                break;
            case "ckThursday":
                if (!event.target.checked)
                    this.isThursdayhidden = true;
                else
                    this.isThursdayhidden = false;
                break;
            case "ckFriday":
                if (!event.target.checked)
                    this.isFridayhidden = true;
                else
                    this.isFridayhidden = false;
                break;
            case "ckSaturday":
                if (!event.target.checked)
                    this.isSaturdayhidden = true;
                else
                    this.isSaturdayhidden = false;
                break;
            case "ckSunday":
                if (!event.target.checked)
                    this.isSundayhidden = true;
                else
                    this.isSundayhidden = false;
                break;
        }
    }
    onSubmit(formData: any, ismenuhidden: boolean) {
        this.openingtimesService.putOrganization(apiUrl, Number(sessionStorage.getItem("organizationId")), Number(formData.value['timezoneControl']), Number(formData.value['currencyControl'])).subscribe((data: any) => { });
        var mondayOpening = formData.controls["MondayOpeningHour"].value + ":" + formData.controls["MondayOpeningMinute"].value;
        var mondayClosing = formData.controls["MondayClosingHour"].value + ":" + formData.controls["MondayClosingMinute"].value;
        var tuesdayOpening = formData.controls["TuesdayOpeningHour"].value + ":" + formData.controls["TuesdayOpeningMinute"].value;
        var tuesdayClosing = formData.controls["TuesdayClosingHour"].value + ":" + formData.controls["TuesdayClosingMinute"].value;
        var wednesdayOpening = formData.controls["WednesdayOpeningHour"].value + ":" + formData.controls["WednesdayOpeningMinute"].value;
        var wednesdayClosing = formData.controls["WednesdayClosingHour"].value + ":" + formData.controls["WednesdayClosingMinute"].value;
        var thursdayOpening = formData.controls["ThursdayOpeningHour"].value + ":" + formData.controls["ThursdayOpeningMinute"].value;
        var thursdayClosing = formData.controls["ThursdayClosingHour"].value + ":" + formData.controls["ThursdayClosingMinute"].value;
        var fridayOpening = formData.controls["FridayOpeningHour"].value + ":" + formData.controls["FridayOpeningMinute"].value;
        var fridayClosing = formData.controls["FridayClosingHour"].value + ":" + formData.controls["FridayClosingMinute"].value;
        var saturdayOpening = formData.controls["SaturdayOpeningHour"].value + ":" + formData.controls["SaturdayOpeningMinute"].value;
        var saturdayClosing = formData.controls["SaturdayClosingHour"].value + ":" + formData.controls["SaturdayClosingMinute"].value;
        var sundayOpening = formData.controls["SundayOpeningHour"].value + ":" + formData.controls["SundayOpeningMinute"].value;
        var sundayClosing = formData.controls["SundayClosingHour"].value + ":" + formData.controls["SundayClosingMinute"].value;
        this.InsertDays(1, mondayOpening, mondayClosing, formData.controls["ckMonday"].value);
        this.InsertDays(2, tuesdayOpening, tuesdayClosing, formData.controls["ckTuesday"].value);
        this.InsertDays(3, wednesdayOpening, wednesdayClosing, formData.controls["ckWednesday"].value);
        this.InsertDays(4, thursdayOpening, thursdayClosing, formData.controls["ckThursday"].value);
        this.InsertDays(5, fridayOpening, fridayClosing, formData.controls["ckFriday"].value);
        this.InsertDays(6, saturdayOpening, saturdayClosing, formData.controls["ckSaturday"].value);
        this.InsertDays(7, sundayOpening, sundayClosing, formData.controls["ckSunday"].value);
        if (ismenuhidden) {
            this.router.navigate(['/services']);
        }
    }
    InsertDays(dayId: number, openingtime: string, closingtime: string, isOpen: boolean) {
        this.openingTime = {
            openingId: 0,
            organizationId: Number(sessionStorage.getItem("organizationId")),
            dayId: dayId,
            openingtime: openingtime,
            closingtime: closingtime,
            isOpen: isOpen,
            isDeleted: false
        };
        if (this.savebuttonText == "Save") {
            this.openingtimesService.postOpeningTime(apiUrl, this.openingTime).subscribe((data: any) => { });
        }
        else {
            this.openingtimesService.putOpeningTime(apiUrl, this.openingTime).subscribe((data: any) => { });
        }
        this.isHidden = false;
    }
}