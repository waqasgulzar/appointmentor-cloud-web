import { NgModule } from '@angular/core';
import { RouterModule, PreloadAllModules, Routes } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';
import { UserComponent } from './modules/user/user.component';
import { AccountSetupComponent } from './modules/user/accountsetup.component';
import { OpeningTimesComponent } from './modules/openingtimes/openingtimes.component';
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
import { ResourceAssetManagerComponent } from './modules/resource-asset-manager/resource-asset-manager.component';
import { ServiceEditComponent } from './modules/services/service.edit.component';
import { CategoriesComponent } from './modules/services/category/categories.component';
import { CategoryEditComponent } from './modules/services/category/category-edit.component';
import { WelcomePackComponent } from './modules/welcomePack/welcome-pack.component';
import {MediaLibraryComponent} from './modules/medialibrary/mediaLibrary.component';
import { AuthGuardService as AuthGuard } from './shared/services/auth-guard.service';
import { ResourceEditComponent } from './modules/resources/resource-edit/resource-edit.component';
import { RedirectFreeAgent } from './modules/setting/freeagent/redirect-free-agent/redirect-free-agent.component';
import { ResourcesComponent } from './modules/resources/resources.component';

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
          { path: 'accountsetup', component: AccountSetupComponent },
          { path: 'forgot', component: ForgotComponent }
          //{ path: 'test/:id', component: AboutComponent }
        ]
      },

      // App routes goes here here
      {
        canActivate: [AuthGuard],
        path: '',
        component: AppLayoutComponent,
        children: [
          {
            path: 'reports/dashboard',
            component: DashboardComponent,
            data: { breadcrumbs: 'Home' }
          },
          {
            path: 'organisation/openingtimes',
            component: OpeningTimesComponent,
            data: { breadcrumbs: 'Opening Times' }
          },
          {
            path: 'organisation/resources',
            component: ResourcesComponent,
            data: { breadcrumbs: 'Resources' }
          },
          {
            path: 'resource/:id',
            component: ResourceEditComponent,
            data: { breadcrumbs: 'Resource' }
          },

          {
            path: 'organisation/asset',
            component: AssetComponent,
            data: { breadcrumbs: 'Assets' }
          },
          {
            path: 'asset/:id',
            component: AssetEditComponent,
            data: { breadcrumbs: 'Asset' }
          },

          {
            path: 'organisation/services',
            component: ServicesComponent,
            data: { breadcrumbs: 'Services' }
          },
          {
            path: 'service/:id',
            component: ServiceEditComponent,
            data: { breadcrumbs: 'Service' }
          },

          {
            path: 'plans',
            component: CategoriesComponent,
            data: { breadcrumbs: 'Categories' }
          },
          {
            path: 'plan/:id',
            component: CategoryEditComponent,
            data: { breadcrumbs: 'Category' }
          },

          {
            path: 'communications/welcomepack',
            component: WelcomePackComponent,
            data: { breadcrumbs: 'Welcome Pack' }
          },
          {
            path: 'communications/medialibrary',
            component: MediaLibraryComponent,
            data: {breadcrumbs: 'Media Library'}
          },
          {
            path: 'reset/:id',
            component: ResetComponent,
            data: { breadcrumbs: 'Password Reset' }
          },
          {
            path: 'customer/customers',
            component: CustomerComponent,
            data: { breadcrumbs: 'Customers' }
          },
          {
            path: 'customer/:id',
            component: CustomerEditComponent,
            data: { breadcrumbs: 'Customer' }
          },
          {
            path: 'appointment',
            component: AppointmentComponent,
            data: { breadcrumbs: 'Appointment' }
          },
          {
            path: 'organisation/task',
            component: TaskComponent,
            data: { breadcrumbs: 'Tasks' }
          },
          {
            path: 'organisation/account',
            component: UserAccountComponent,
            data: { breadcrumbs: 'My Account' }
          },
          {
            path: 'logout',
            component: LogoutComponent,
            data: { breadcrumbs: 'Home' }
          },
          {
            path: 'organisation/profile',
            component: ProfileComponent,
            data: { breadcrumbs: 'My Profile' }
          },
          {
            path: 'organisation/general',
            component: GeneralComponent,
            data: { breadcrumbs: 'General Settings' }
          },
          {
            path: 'customersetting',
            component: CustomerSettingComponent,
            data: { breadcrumbs: 'Home' }
          },
          {
            path: 'customersettingdetail',
            component: CustomerSettingDetailComponent,
            data: { breadcrumbs: 'Home' }
          },
          {
            path: 'usersetting',
            component: UserSettingComponent,
            data: { breadcrumbs: 'Home' }
          },
          {
            path: 'usersettingdetail',
            component: UserSettingDetailComponent,
            data: { breadcrumbs: 'Home' }
          },
          {
            path: 'communications/emailsetting',
            component: EmailSettingComponent,
            data: { breadcrumbs: 'Home' }
          },
          {
            path: 'emailsettingdetail',
            component: EmailSettingDetailComponent,
            data: { breadcrumbs: 'Home' }
          },
          {
            path: 'customerdetail',
            component: CustomerDetailComponent,
            data: { breadcrumbs: 'Home' }
          },
          {
            path: 'smssetting',
            component: SMSSettingComponent,
            data: { breadcrumbs: 'Home' }
          },
          {
            path: 'onlinebookingsetting',
            component: OnlineBookingSettingComponent,
            data: { breadcrumbs: 'Home' }
          },
          {
            path: 'bookingquestion',
            component: BookingQuestionComponent,
            data: { breadcrumbs: 'Home' }
          },
          {
            path: 'bookingquestiondetail',
            component: BookingQuestionDetailComponent,
            data: { breadcrumbs: 'Home' }
          },
          {
            path: 'communications/marketing',
            component: MarkettingComponent,
            data: { breadcrumbs: 'Home' }
          },
          {
            path: 'support',
            component: SupportComponent,
            data: { breadcrumbs: 'Home' }
          },
          {
            path: 'notification',
            component: NotificationComponent,
            data: { breadcrumbs: 'Home' }
          },
          {
            path: 'compaign',
            component: CompaignComponent,
            data: { breadcrumbs: 'Home' }
          },
          {
            path: 'businessreport',
            component: BusinessReportComponent,
            data: { breadcrumbs: 'Home' }
          },
          {
            path: 'customerreport',
            component: CustomerReportComponent,
            data: { breadcrumbs: 'Home' }
          },
          {
            path: 'resourcereport',
            component: ResourceReportComponent,
            data: { breadcrumbs: 'Home' }
          },
          {
            path: 'servicereport',
            component: ServiceReportComponent,
            data: { breadcrumbs: 'Home' }
          },
          {
            path: 'reports',
            component: ReportsComponent,
            data: { breadcrumbs: 'Home' }
          },
          {
            path: 'financial/billing',
            component: BillingComponent,
            data: { breadcrumbs: 'Home' }
          },
          {
            path: 'stock',
            component: StockComponent,
            data: { breadcrumbs: 'Home' }
          },
          {
            path: 'paymenthistory',
            component: PaymenthistoryComponent,
            data: { breadcrumbs: 'Home' }
          },
          {
            path: 'reports/monthlyOverview',
            component: MonthlyOverviewComponent,
            data: { breadcrumbs: 'Home' }
          },
          {
            path: 'communications/reviews',
            component: ReviewsComponent,
            data: { breadcrumbs: 'Home' }
          },
          {
            path: 'integrations/bookingapps',
            component: BookingappsComponent,
            data: { breadcrumbs: 'Home' }
          },
          {
            path: 'integrations/api',
            component: ApiComponent,
            data: { breadcrumbs: 'Home' }
          },
          {
            path: 'calendersync',
            component: CalendersyncComponent,
            data: { breadcrumbs: 'Home' }
          },
          {
            path: 'webhooks',
            component: WebhooksComponent,
            data: { breadcrumbs: 'Home' }
          },
          {
            path: 'tools/microsite',
            component: MicrositeComponent,
            data: { breadcrumbs: 'Microsite' }
          },
          {
            path: 'integrations/freeagent',
            component: FreeagentComponent,
            data: { breadcrumbs: 'FreeAgent' }
          },
          {
            path: 'redirect/freeagent/:code',
            component: RedirectFreeAgent,
            data: { breadcrumbs: 'FreeAgent' }
          },
          {
            path: 'integrations/epos',
            component: EposComponent,
            data: { breadcrumbs: 'ePos' }
          },
          {
            path: 'tools/payments',
            component: PaymentsComponent,
            data: { breadcrumbs: 'Payments' }
          },
          {
            path: 'charge',
            component: ChargeComponent,
            data: { breadcrumbs: 'Charge' }
          },
          {
            path: 'premium/receipt/:id',
            component: ReceiptComponent,
            data: { breadcrumbs: 'Receipt' }
          },
          {
            path: 'underProcess',
            component: UnderProcessComponent,
            data: { breadcrumbs: 'In Progress' }
          }
        ]
      },

      //no layout routes

      // otherwise redirect to home
      { path: '**', redirectTo: '' }
    ])
  ],
  exports: [RouterModule]
})

//export const routing = RouterModule.forRoot(appRoutes);
export class AppRoutingModule {}
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
