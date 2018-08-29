import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app.routing';

import { AppComponent } from './app.component';
import { NavbarComponent } from './nav/nav.component';
import { ModalComponent } from './shared/modal/modal.component';
import { LookupComponent } from './shared/lookup/lookup.component';
import { HomeComponent } from './modules/home/home.component';

import { UserComponent } from './modules/user/user.component';
import { AccountSetupComponent } from './modules/user/accountsetup.component';
import { OpeningTimesComponent } from './modules/openingtimes/openingtimes.component';
import { ResourcesComponent } from './modules/resources/resources.component';
import { ServicesComponent } from './modules/services/services.component';
import { LoginComponent } from './modules/login/login.component';
//import { LoginService } from './modules/login/login.service';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { ForgotComponent } from './modules/forgot/forgot.component';
import { ResetComponent } from './modules/reset/reset.component';
import { LogoutComponent } from './modules/logout/logout.component';
import { CustomerComponent } from './modules/customer/customer.component';
import { AppointmentComponent } from './modules/appointment/appointment.component';
import { UserAccountComponent } from './modules/useraccount/account.component';
import { TaskComponent } from './modules/task/task.component';
import { AssetComponent } from './modules/asset/asset.component';
import { ProfileComponent } from './modules/profile/profile.component';
import { GeneralComponent } from './modules/setting/general/general.component';
import { CustomerSettingComponent } from './modules/setting/customer/customersetting.component';
import { CustomerSettingDetailComponent } from './modules/setting/customer/customersettingdetail.component';
import { UserSettingComponent } from './modules/setting/user/usersetting.component';
import { UserSettingDetailComponent } from './modules/setting/user/usersettingdetail.component';
import { EmailSettingComponent } from './modules/setting/email/emailsetting.component';
import { EmailSettingDetailComponent } from './modules/setting/email/emailsettingdetail.component';
import { CustomerDetailComponent } from './modules/customer/customerdetail.component';
import { SMSSettingComponent } from './modules/setting/sms/smssetting.component';
import { BookingQuestionComponent } from './modules/setting/bookingquestion/bookingquestion.component';
import { BookingQuestionDetailComponent } from './modules/setting/bookingquestion/bookingquestiondetail.component';
import { OnlineBookingSettingComponent } from './modules/setting/onlinebooking/onlinebooking.component';
import { MarkettingComponent } from './modules/marketing/marketing.component';
import { SupportComponent } from './modules/support/support.component';
import { CompaignComponent } from './modules/marketing/compaign/compaign.component';
import { NotificationComponent } from './modules/marketing/notification/notification.component';
import { BusinessReportComponent } from './modules/reports/business/businessreport.component';
import { CustomerReportComponent } from './modules/reports/customer/customerreport.component';
import { ResourceReportComponent } from './modules/reports/resource/resourcereport.component';
import { ServiceReportComponent } from './modules/reports/service/servicereport.component';
import { ReportsComponent } from './modules/reports/reports.component';
import { BillingComponent } from './modules/billing/billing.component';
import { StockComponent } from './modules/stock/stock.component';
import { MonthlyOverviewComponent } from './modules/monthlyOverview/monthlyOverview.component';
import { PaymenthistoryComponent } from './modules/paymenthistory/paymenthistory.component';
import { ReviewsComponent } from './modules/reviews/reviews.component';
import { BookingappsComponent } from './modules/bookingapps/bookingapps.component';
import { ApiComponent } from './modules/setting/api/api.component';
import { CalendersyncComponent } from './modules/setting/calendersync/calendersync.component';
import { WebhooksComponent } from './modules/setting/webhooks/webhooks.component';
import { MicrositeComponent } from './modules/setting/microsite/microsite.component';
import { FreeagentComponent } from './modules/setting/freeagent/freeagent.component';
import { EposComponent } from './modules/setting/epos/epos.component';
import { PaymentsComponent } from './modules/setting/payments/payments.component';
import { AppointmentBookingComponent } from './shared/appointmentBooking/appointmentBooking.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgxEditorModule } from 'ngx-editor';
import { ToastrModule } from 'ngx-toastr';
import { TagInputModule } from 'ngx-chips';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import 'rxjs/Rx';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule
} from '@angular/material';
import { ChargeComponent } from './modules/billing/charge.component';
import { ReceiptComponent } from './modules/billing/receipt.component';
import { AssetEditComponent } from './modules/asset/asset-edit/asset-edit.component';
import { CustomerEditComponent } from './modules/customer/customer-edit.component';
import { RouterLinkActive } from './shared/directives/routerLinkActive.directive';
import { UnderProcessComponent } from './shared/underProcess/underProcess.component';
import { NavTopBarComponent } from './nav/topBar/navTopBar.component';
import { AppLayoutComponent } from './_layout/app-layout/app-layout.component';
import { SiteLayoutComponent } from './_layout/site-layout/site-layout.component';
import { AppHeaderComponent } from './_layout/app-header/app-header.component';
import { SiteHeaderComponent } from './_layout/site-header/site-header.component';
import { SiteFooterComponent } from './_layout/site-footer/site-footer.component';
import { ResourceAssetManagerComponent } from './modules/resource-asset-manager/resource-asset-manager.component';
import {
    ModalModule,
    BsDatepickerModule,
    BsDropdownModule,
    TooltipModule
} from 'ngx-bootstrap';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NotificationService } from './shared/services/notification.service';
import { UserInfoService } from './shared/services/userInfo.service';
import { ServiceEditComponent } from './modules/services/service.edit.component';
import { RequiredIfDirective } from './shared/directives/required-if.directive';
import { CategoriesComponent } from './modules/services/category/categories.component';
import { CategoryEditComponent } from './modules/services/category/category-edit.component';

import { WelcomePackComponent } from './modules/welcomePack/welcome-pack.component';
import { AppointmentorAuthInterceptor } from './shared/interceptors/auth.interceptors';
import { ErrorHandlerService } from './shared/services/error-handler.service';
import * as _api from './shared/services/api';
import { AuthGuardService } from './shared/services/auth-guard.service';
import { DataService } from './shared/services/data.service';
import { ResourceEditComponent } from './modules/resources/resource-edit/resource-edit.component';


import {
    SocialLoginModule,
    AuthServiceConfig,
    GoogleLoginProvider,
    FacebookLoginProvider,
    LinkedinLoginProvider
} from "angular5-social-login";

export function getAuthServiceConfigs() {
    let config = new AuthServiceConfig(
        [
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider("260776801121658")
          },
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider("380191121936-vjf5j8rp43og4b2jkpnk18minlu3u2rc.apps.googleusercontent.com")
          },
          {
           id: LinkedinLoginProvider.PROVIDER_ID,
           provider: new LinkedinLoginProvider("Your-Linkedin-Client-Id")
         },
        ]
    );
    return config;
  }

const ROUTER_DIRECTIVES = [RouterLinkActive];

@NgModule({
    imports: [
        LoggerModule.forRoot({ level: NgxLoggerLevel.DEBUG }),

        HttpClientModule,
        NgxSpinnerModule,
        TagInputModule,
        ModalModule.forRoot(),
        BsDatepickerModule.forRoot(),
        BsDropdownModule.forRoot(),
        TooltipModule.forRoot(),
        BrowserAnimationsModule,
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,

        MatAutocompleteModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatCardModule,
        MatCheckboxModule,
        MatChipsModule,
        MatStepperModule,
        MatDatepickerModule,
        MatDialogModule,
        MatDividerModule,
        MatExpansionModule,
        MatGridListModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatMenuModule,
        MatNativeDateModule,
        MatPaginatorModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatRadioModule,
        MatRippleModule,
        MatSelectModule,
        MatSidenavModule,
        MatSliderModule,
        MatSlideToggleModule,
        MatSnackBarModule,
        MatSortModule,
        MatTableModule,
        MatTabsModule,
        MatToolbarModule,
        MatTooltipModule,
        NgxDatatableModule,
        ToastrModule.forRoot({ preventDuplicates: true }),
        NgxEditorModule,
        SocialLoginModule
    ],
    declarations: [
        ROUTER_DIRECTIVES,
        AppLayoutComponent,
        SiteLayoutComponent,
        AppHeaderComponent,
        SiteHeaderComponent,
        SiteFooterComponent,
        AppComponent,
        ModalComponent,
        HomeComponent,
        LookupComponent,
        UserComponent,
        AccountSetupComponent,
        OpeningTimesComponent,
        ResourcesComponent,
        ResourceEditComponent,
        ServicesComponent,
        CategoriesComponent,
        CategoryEditComponent,
        LoginComponent,
        DashboardComponent,
        ForgotComponent,
        ResetComponent,
        LogoutComponent,
        CustomerComponent,
        AppointmentComponent,
        UserAccountComponent,
        TaskComponent,
        AssetComponent,
        ProfileComponent,
        GeneralComponent,
        CustomerSettingComponent,
        CustomerSettingDetailComponent,
        UserSettingComponent,
        UserSettingDetailComponent,
        EmailSettingComponent,
        EmailSettingDetailComponent,
        CustomerDetailComponent,
        SMSSettingComponent,
        BookingQuestionComponent,
        BookingQuestionDetailComponent,
        OnlineBookingSettingComponent,
        MarkettingComponent,
        SupportComponent,
        CompaignComponent,
        NotificationComponent,
        BusinessReportComponent,
        CustomerReportComponent,
        ResourceReportComponent,
        ServiceReportComponent,
        ReportsComponent,
        NavbarComponent,
        NavTopBarComponent,
        BillingComponent,
        StockComponent,
        MonthlyOverviewComponent,
        PaymenthistoryComponent,
        ReviewsComponent,
        BookingappsComponent,
        ApiComponent,
        CalendersyncComponent,
        WebhooksComponent,
        MicrositeComponent,
        FreeagentComponent,
        EposComponent,
        PaymentsComponent,
        AppointmentBookingComponent,
        ChargeComponent,
        ReceiptComponent,
        AssetEditComponent,
        CustomerEditComponent,
        UnderProcessComponent,
        ResourceAssetManagerComponent,
        ServiceEditComponent,
        RequiredIfDirective,
        WelcomePackComponent
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AppointmentorAuthInterceptor,
            multi: true
        },
        { 
            provide: LocationStrategy, useClass: HashLocationStrategy 
        },
        {
            provide: AuthServiceConfig,
            useFactory: getAuthServiceConfigs
        },
        ErrorHandlerService,
        //LoginService,
        NotificationService,
        UserInfoService,
        _api.AuthenticationService,
        AuthGuardService,
        _api.AppointmentService,
        _api.AssetService,
        _api.AssetServiceService,
        _api.BookingQuestionService,
        _api.CategoryService,
        _api.CustomerService,
        _api.CustomerSettingService,
        DataService,
        _api.EmailSettingService,
        _api.FilesService,
        _api.ForgotPasswordService,
        _api.LookupService,
        _api.OnlineAppointmentBookingSettingsService,
        _api.OpeningTimeService,
        _api.OrganizationService,
        _api.PaymentService,
        _api.ProfileService,
        _api.ResetPasswordService,
        _api.ResourceService,
        _api.ServiceService,
        _api.ServiceResourceService,
        _api.SmsSettingService,
        _api.TaskService,
        _api.UserService,
        _api.UserSettingService,
        _api.ValidationService
    ],
    entryComponents: [AppointmentBookingComponent],
    bootstrap: [AppComponent],
    exports: ROUTER_DIRECTIVES
})
export class AppModule { }
