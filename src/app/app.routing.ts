import { NgModule } from '@angular/core';
import { RouterModule, PreloadAllModules, Routes } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';
import { ProductComponent } from './modules/products/product.component';
import { UserComponent } from './modules/user/user.component';
import { AccountSetupComponent } from './modules/user/accountsetup.component';
import { OpeningTimesComponent } from './modules/openingtimes/openingtimes.component';
import { ResourcesComponent } from './modules/resources/resources.component';
import { ServicesComponent } from './modules/services/services.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { LoginComponent } from './modules/login/login.component';
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
import { PaymenthistoryComponent } from './modules/paymenthistory/paymenthistory.component';
import { MonthlyOverviewComponent } from './modules/monthlyOverview/monthlyOverview.component';
import { ReviewsComponent } from './modules/reviews/reviews.component';
import { BookingappsComponent } from './modules/bookingapps/bookingapps.component';
import { ApiComponent } from './modules/setting/api/api.component';
import { CalendersyncComponent } from './modules/setting/calendersync/calendersync.component';
import { WebhooksComponent } from './modules/setting/webhooks/webhooks.component';
import { MicrositeComponent } from './modules/setting/microsite/microsite.component';
import { FreeagentComponent } from './modules/setting/freeagent/freeagent.component';
import { EposComponent } from './modules/setting/epos/epos.component';
import { PaymentsComponent } from './modules/setting/payments/payments.component';
import { ChargeComponent } from './modules/billing/charge.component';
import { ReceiptComponent } from './modules/billing/receipt.component';
import { AssetEditComponent } from './modules/asset/asset-edit/asset-edit.component';
import { CustomerEditComponent } from './modules/customer/customer-edit.component';
import { UnderProcessComponent } from './shared/underProcess/underProcess.component';
import { AppLayoutComponent } from './_layout/app-layout/app-layout.component';
import { SiteLayoutComponent } from './_layout/site-layout/site-layout.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
      //Site routes goes here 
      {
        path: '',
        component: SiteLayoutComponent,
        children: [
          { path: '', component: HomeComponent, pathMatch: 'full' },
          { path: 'home', component: HomeComponent },
          { path: 'login', component: LoginComponent },
          { path: 'registration', component: UserComponent },
          //{ path: 'test/:id', component: AboutComponent }
        ]
      },

      // App routes goes here here
      {
        path: '',
        component: AppLayoutComponent,
        children: [
          { path: 'dashboard', component: DashboardComponent },
          { path: 'accountsetup', component: AccountSetupComponent },
          { path: 'openingtimes', component: OpeningTimesComponent },
          { path: 'resources', component: ResourcesComponent },
          { path: 'services', component: ServicesComponent },
          { path: 'forgot', component: ForgotComponent },
          { path: 'reset/:id', component: ResetComponent },
          { path: 'customer', component: CustomerComponent },
          { path: 'customer/:id', component: CustomerEditComponent },
          { path: 'appointment', component: AppointmentComponent },
          { path: 'task', component: TaskComponent },
          { path: 'account', component: UserAccountComponent },
          { path: 'asset', component: AssetComponent },
          { path: 'asset/:id', component: AssetEditComponent },
          { path: 'logout', component: LogoutComponent },
          { path: 'profile', component: ProfileComponent },
          { path: 'general', component: GeneralComponent },
          { path: 'customersetting', component: CustomerSettingComponent },
          { path: 'customersettingdetail', component: CustomerSettingDetailComponent },
          { path: 'usersetting', component: UserSettingComponent },
          { path: 'usersettingdetail', component: UserSettingDetailComponent },
          { path: 'emailsetting', component: EmailSettingComponent },
          { path: 'emailsettingdetail', component: EmailSettingDetailComponent },
          { path: 'customerdetail', component: CustomerDetailComponent },
          { path: 'smssetting', component: SMSSettingComponent },
          { path: 'onlinebookingsetting', component: OnlineBookingSettingComponent },
          { path: 'bookingquestion', component: BookingQuestionComponent },
          { path: 'bookingquestiondetail', component: BookingQuestionDetailComponent },
          { path: 'marketing', component: MarkettingComponent },
          { path: 'support', component: SupportComponent },
          { path: 'notification', component: NotificationComponent },
          { path: 'compaign', component: CompaignComponent },
          { path: 'businessreport', component: BusinessReportComponent },
          { path: 'customerreport', component: CustomerReportComponent },
          { path: 'resourcereport', component: ResourceReportComponent },
          { path: 'servicereport', component: ServiceReportComponent },
          { path: 'reports', component: ReportsComponent },
          { path: 'billing', component: BillingComponent },
          { path: 'stock', component: StockComponent },
          { path: 'paymenthistory', component: PaymenthistoryComponent },
          { path: 'monthlyOverview', component: MonthlyOverviewComponent },
          { path: 'reviews', component: ReviewsComponent },
          { path: 'bookingapps', component: BookingappsComponent },
          { path: 'api', component: ApiComponent },
          { path: 'calendersync', component: CalendersyncComponent },
          { path: 'webhooks', component: WebhooksComponent },
          { path: 'microsite', component: MicrositeComponent },
          { path: 'freeagent', component: FreeagentComponent },
          { path: 'epos', component: EposComponent },
          { path: 'payments', component: PaymentsComponent },
          { path: 'charge', component: ChargeComponent },
          { path: 'premium/receipt/:id', component: ReceiptComponent },
          { path: 'underProcess', component: UnderProcessComponent },
        ]
      },

      //no layout routes
     
      // otherwise redirect to home
      { path: '**', redirectTo: '' },
    ])],
  exports: [RouterModule]
})

//export const routing = RouterModule.forRoot(appRoutes);
export class AppRoutingModule { }
//@NgModule({
//  imports: [
//    RouterModule.forRoot([

//      //{
//      //  path: 'dashboard', component: DashboardComponent, redirectTo: '/dashboard', pathMatch: 'full',
//      //  children: [
//      //    { path: '', redirectTo: 'dashboard', },

//      //  ]
//      //},
//      { path: '', component: HomeComponent },
//      { path: 'login', component: LoginComponent },
//      { path: 'registration', component: UserComponent },
//    ], { preloadingStrategy: PreloadAllModules })
//  ],
//  exports: [RouterModule]
//})

//export class AppRoutingModule { }