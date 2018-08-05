import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app.routing';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { NavbarComponent } from './nav/nav.component';
import { ModalComponent } from './shared/modal/modal.component';
import { LookupComponent } from './shared/lookup/lookup.component';
import { HomeComponent } from './modules/home/home.component';
import { ProductComponent } from './modules/products/product.component';
import { ProductService } from './modules/products/product.service';
import { UserComponent } from './modules/user/user.component';
import { AccountSetupComponent } from './modules/user/accountsetup.component';
import { OpeningTimesComponent } from './modules/openingtimes/openingtimes.component';
import { OpeningTimesService } from './modules/openingtimes/openingtimes.service';
import { ResourcesComponent } from './modules/resources/resources.component';
import { ResourcesService } from './modules/resources/resources.service';
import { ServicesComponent } from './modules/services/services.component';
import { ServicesService } from './modules/services/services.service';
import { UserService } from './modules/user/user.service';
import { LoginComponent } from './modules/login/login.component';
import { LoginService } from './modules/login/login.service';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { DashboardService } from './modules/dashboard/dashboard.service';
import { ForgotComponent } from './modules/forgot/forgot.component';
import { ForgotService } from './modules/forgot/forgot.service';
import { ResetComponent } from './modules/reset/reset.component';
import { ResetService } from './modules/reset/reset.service';
import { LogoutComponent } from './modules/logout/logout.component';
import { CustomerComponent } from './modules/customer/customer.component';
import { CustomerService } from './modules/customer/customer.service';
import { AppointmentComponent } from './modules/appointment/appointment.component';
import { AppointmentService } from './modules/appointment/appointment.service';
import { UserAccountComponent } from './modules/useraccount/account.component';
import { UserAccountService } from './modules/useraccount/account.service';
import { TaskComponent } from './modules/task/task.component';
import { TaskService } from './modules/task/task.service';
import { AssetComponent } from './modules/asset/asset.component';
import { AssetService } from './modules/asset/asset.service';
import { ProfileComponent } from './modules/profile/profile.component';
import { ProfileService } from './modules/profile/profile.service';
import { GeneralComponent } from './modules/setting/general/general.component';
import { GeneralService } from './modules/setting/general/general.service';
import { CustomerSettingComponent } from './modules/setting/customer/customersetting.component';
import { CustomerSettingService } from './modules/setting/customer/customersetting.service';
import { CustomerSettingDetailComponent } from './modules/setting/customer/customersettingdetail.component';
import { UserSettingComponent } from './modules/setting/user/usersetting.component';
import { UserSettingService } from './modules/setting/user/usersetting.service';
import { UserSettingDetailComponent } from './modules/setting/user/usersettingdetail.component';
import { EmailSettingComponent } from './modules/setting/email/emailsetting.component';
import { EmailSettingService } from './modules/setting/email/emailsetting.service';
import { EmailSettingDetailComponent } from './modules/setting/email/emailsettingdetail.component';
import { CustomerDetailComponent } from './modules/customer/customerdetail.component';
import { SMSSettingComponent } from './modules/setting/sms/smssetting.component';
import { SMSSettingService } from './modules/setting/sms/smssetting.service';
import { BookingQuestionComponent } from './modules/setting/bookingquestion/bookingquestion.component';
import { BookingQuestionService } from './modules/setting/bookingquestion/bookingquestion.service';
import { BookingQuestionDetailComponent } from './modules/setting/bookingquestion/bookingquestiondetail.component';
import { OnlineBookingSettingComponent } from './modules/setting/onlinebooking/onlinebooking.component';
import { OnlineBookingSettingService } from './modules/setting/onlinebooking/onlinebooking.service';
import { MarkettingComponent } from './modules/marketing/marketing.component';
import { SupportComponent } from './modules/support/support.component';
import { CompaignComponent } from './modules/marketing/compaign/compaign.component';
import { NotificationComponent } from './modules/marketing/notification/notification.component';
import { BusinessReportComponent } from './modules/reports/business/businessreport.component';
import { BusinessReportService } from './modules/reports/business/businessreport.service';
import { CustomerReportComponent } from './modules/reports/customer/customerreport.component';
import { CustomerReportService } from './modules/reports/customer/customerreport.service';
import { ResourceReportComponent } from './modules/reports/resource/resourcereport.component';
import { ResourceReportService } from './modules/reports/resource/resourcereport.service';
import { ServiceReportComponent } from './modules/reports/service/servicereport.component';
import { ServiceReportService } from './modules/reports/service/servicereport.service';
import { ReportsComponent } from './modules/reports/reports.component';
import { ReportsService } from './modules/reports/reports.service';
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

import { ToastrModule } from 'ngx-toastr';
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
import { PaymentService } from './modules/billing/payment.service';
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
import { CategoryService } from './modules/services/category/category.service';

const ROUTER_DIRECTIVES = [RouterLinkActive];

@NgModule({
  imports: [
    NgxSpinnerModule,
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpModule,
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
    ToastrModule.forRoot({ preventDuplicates: true })
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
    ProductComponent,
    LookupComponent,
    UserComponent,
    AccountSetupComponent,
    OpeningTimesComponent,
    ResourcesComponent,
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
    RequiredIfDirective
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    ProductService,
    UserService,
    LoginService,
    DashboardService,
    ForgotService,
    OpeningTimesService,
    ServicesService,
    ResourcesService,
    CustomerService,
    AppointmentService,
    UserAccountService,
    ResetService,
    TaskService,
    ProfileService,
    GeneralService,
    CustomerSettingService,
    UserSettingService,
    AssetService,
    EmailSettingService,
    SMSSettingService,
    BookingQuestionService,
    OnlineBookingSettingService,
    BusinessReportService,
    CustomerReportService,
    ResourceReportService,
    ServiceReportService,
    ReportsService,
    PaymentService,
    NotificationService,
    UserInfoService,
    CategoryService
  ],
  entryComponents: [AppointmentBookingComponent],
  bootstrap: [AppComponent],
  exports: ROUTER_DIRECTIVES
})
export class AppModule {}
