import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { GeneralService } from './general.service';
import { UserAccountService } from '../../../modules/useraccount/account.service';
import { OpeningTimesService } from '../../../modules/openingtimes/openingtimes.service';
import { environment } from '../../../environments/environment';
import { Router } from "@angular/router";
const apiUrl = environment.apiUrl;
@Component({
    moduleId: module.id,
    templateUrl: 'general.html'
})
export class GeneralComponent implements OnInit {
    timezonelist: any[];
    currencylist: any[];
    selectedTimeZone: string;
    selectedCurrency: string;
    messageText: string = "";
    isHidden: boolean = true;
    userForm: FormGroup;
    constructor(private fb: FormBuilder, private generalService: GeneralService, private userAccountService: UserAccountService, private openingtimesService: OpeningTimesService, private router: Router) {
        if (sessionStorage.getItem("organizationId") == null) {
            this.router.navigate(['']);
        }
        this.LoadTimeZone();
        this.LoadCurrency();
        this.LoadGeneralSetting();
    }
    ngOnInit() {
        this.userForm = this.fb.group({
            calendarIntervalIncrement: ['15'],
            dateFormat: ['mm/dd/yyyy'],
            timezoneControl: [],
            currencyControl: []
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
    LoadGeneralSetting() {
        this.userAccountService.get(Number(sessionStorage.getItem("organizationId"))).subscribe((data: any) => {
            var obj = data["results"][0];
            console.log(obj);
            if (obj["calendarIntervalIncrement"] != "" && obj["calendarIntervalIncrement"] != null)
            {
                this.userForm.controls['calendarIntervalIncrement'].setValue(obj["calendarIntervalIncrement"]);
            }
            if (obj["dateFormat"] != "" && obj["dateFormat"] != null) {
                this.userForm.controls['dateFormat'].setValue(obj["dateFormat"]);
            }
        });
    }
    CalendarIncrementChange() {
        this.messageText = "Calendar Interval Increment";
        this.isHidden = false;
        this.onSubmit();
    }
    TimeZoneChange() {
        this.messageText = "Time Zone";
        this.isHidden = false;
        this.onSubmit();
    }
    CurrencyChange() {
        this.messageText = "Currency";
        this.isHidden = false;
        this.onSubmit();
    }
    DateFormatChange() {
        this.messageText = "Date Format";
        this.isHidden = false;
        this.onSubmit();
    }
    onSubmit() {
        this.generalService.put(apiUrl,
            Number(sessionStorage.getItem("organizationId")),
            Number(this.userForm.value['timezoneControl']),
            Number(this.userForm.value['currencyControl']),
            this.userForm.controls['dateFormat'].value,
            Number(this.userForm.controls['calendarIntervalIncrement'].value)
        ).subscribe((data: any) => { });
    }
}