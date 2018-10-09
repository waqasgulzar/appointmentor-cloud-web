import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { UserInfoService } from '../shared/services/userInfo.service';
import PerfectScrollbar from 'perfect-scrollbar';
import {
    DomSanitizer,
    SafeResourceUrl,
    SafeUrl
} from '@angular/platform-browser';
import {environment} from "../../environments/environment";

declare const $: any;

//Metadata
export interface RouteInfo {
    path: string;
    title: string;
    type: string;
    icontype: string;
    collapse?: string;
    children?: ChildrenItems[];
}

export interface ChildrenItems {
    path: string;
    title: string;
    ab: string;
    type?: string;
}

//Menu Items
export const ROUTES: RouteInfo[] = [{
    path: '/dashboard',
    title: 'Dashboard',
    type: 'link',
    icontype: 'dashboard'
},{
    path: '/organisation',
    title: 'Settings',
    type: 'sub',
    icontype: 'apps',
    collapse: 'components',
    children: [
        {path: 'profile', title: 'Organisation Proﬁle', ab:'B'},
        {path: 'openingtimes', title: 'Timings & Calendar', ab:'TC'},
        {path: 'plans', title: 'Plans, Services & Prices', ab:'PSP'},
        {path: 'resources', title: 'Team & Resources', ab:'TR'},
        {path: 'asset', title: 'Assets, Inventory & Stocks', ab:'AIS'},
        {path: 'task', title: 'Tasks & Activities', ab:'TA'},
        {path: 'general', title: 'Configurations & Rules', ab:'CR'},
        {path: 'account', title: 'Account Management', ab:'AM'},

    ]
},{
    path: '/customer',
    title: 'Customer Management',
    type: 'sub',
    icontype: 'content_paste',
    collapse: 'forms',
    children: [
        {path: 'customers', title: 'Profiles & Registrations', ab:'C'},
        {path: 'underProcess', title: 'Customers Financials', ab:'CF'}
    ]
},{
    path: '/communications',
    title: 'Communications',
    type: 'sub',
    icontype: 'grid_on',
    collapse: 'tables',
    children: [
        {path: 'welcomepack', title: 'Comms & Messages', ab:'CM'},
        {path: 'underProcess', title: 'Feedback & Notiﬁcations', ab:'FN'},
        {path: 'emailsetting', title: 'Follow up / Recall Manager', ab:'FR'},
        {path: 'reviews', title: 'Reviews & Social Media', ab:'RS'},
        {path: 'marketing', title: 'Marketing Campaigns', ab:'MC'},
        {path: 'welcomepack', title: 'Templates (Welcome, FB)', ab:'T'},
        {path: 'underProcess', title: 'CRM Routines', ab:'CR'},
        {path: 'welcomepack', title: 'Welcome Packs', ab:'WP'},
        {path: 'emailsetting', title: 'Email & SMS', ab:'ES'},
        {path: 'medialibrary', title: 'Media Library ', ab:'ML'},
    ]
},{
    path: '/tools',
    title: 'Tools & Plugins',
    type: 'sub',
    icontype: 'place',
    collapse: 'maps',
    children: [
        {path: 'payments', title: 'e-Payments ', ab:'P'},
        {path: 'microsite', title: 'Business Micro Web Site', ab:'BMW'},
        {path: 'underProcess', title: 'Couponator', ab:'C'},
        {path: 'underProcess', title: 'Referrals Magic', ab:'C'},
        {path: 'underProcess', title: 'Self Check-in', ab:'C'},
        {path: 'underProcess', title: 'Customer Connections', ab:'C'},
        {path: 'underProcess', title: 'Providers myDiary App', ab:'PMA'},
        {path: 'underProcess', title: 'myAppointments App', ab:'AA'}
    ]
},{
    path: '/integrations',
    title: 'Integrations',
    type: 'sub',
    icontype: 'widgets',
    collapse: 'charts',
    children: [
        {path: 'epos', title: 'Point of Sale - EPoS', ab:'POS'},
        {path: 'account', title: 'Accounting', ab:'A'},
        {path: 'bookingapps', title: 'Booking Apps', ab:'B'},
        {path: 'api', title: 'APIs & Webhooks', ab:'AW'},
        {path: 'freeagent', title: 'Free Agent', ab:'F'}
    ]

},{
    path: '/reports',
    title: 'Reports',
    type: 'sub',
    icontype: 'timeline',
    collapse: 'dashboard',
    children: [
        {path: 'dashboard', title: 'Dashboard ', ab:'P'},
        {path: 'underProcess', title: 'Booking & User Reports', ab:'POS'},
        {path: 'monthlyOverview', title: 'Financial Reports', ab:'A'}
    ]

},{
    path: '/financial',
    title: 'Financial Management',
    type: 'sub',
    icontype: 'date_range',
    collapse: 'md',
    children: [
        {path: 'underProcess', title: 'Income ', ab:'P'},
        {path: 'billing', title: 'Invoices and Payments', ab:'POS'},
        {path: 'underProcess', title: 'Insurance Billing', ab:'IB'},
        {path: 'underProcess', title: 'Expenses', ab:'E'},
        {path: 'underProcess', title: 'Billing (Platform)', ab:'B'},
        {path: 'underProcess', title: 'Team and Op Costs', ab:'TAOC'}

    ]

},{
    path: '/help',
    title: 'Help & Support',
    type: 'sub',
    icontype: 'image',
    collapse: 'pages',
    children: [
        {path: 'underProcess', title: 'Launch Support Ticket', ab:'P'},
        {path: 'underProcess', title: 'UserGuide', ab:'TP'},
        {path: 'underProcess', title: 'Support & Feedback', ab:'LP'},
        {path: 'underProcess', title: 'Suggestions & Ideas', ab:'RP'}
    ]
},{
    path: '/links',
    title: 'Recently Used Links',
    type: 'sub',
    icontype: 'date_range',
    collapse: 'calender',
    children: [
        {path: 'underProcess', title: 'Recall Manager ', ab:'P'},
        {path: 'billing', title: 'Support & Feedback', ab:'POS'},
        {path: 'service-edit', title: 'Services', ab:'S'}

    ]

}
];

@Component({
  moduleId: module.id,
  selector: 'ng-nav',
  templateUrl: 'nav.template.html',
  
})

export class NavbarComponent implements OnInit {

    public menuItems: any[];
  appName: string = "Appointmentor";
  active: string = "settings";
    trustedProfileImageUrl: SafeUrl;

    constructor(
        public userInfo: UserInfoService,
        private sanitizer: DomSanitizer
    ) {}
    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
        this.trustedProfileImageUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
            environment.apiUrl +
            '/UploadFiles/' +
            this.userInfo.currentUser.profile.logoForMarketingPath
        );
    }


    isMobileMenu() {
        if ($(window).width() > 991) {
            return false;
        }
        return true;
    };

    updatePS(): void  {
        if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
            const elemSidebar = <HTMLElement>document.querySelector('.sidebar .sidebar-wrapper');
            let ps = new PerfectScrollbar(elemSidebar, { wheelSpeed: 2, suppressScrollX: true });
        }
    }
    isMac(): boolean {
        let bool = false;
        if (navigator.platform.toUpperCase().indexOf('MAC') >= 0 || navigator.platform.toUpperCase().indexOf('IPAD') >= 0) {
            bool = true;
        }
        return bool;
    }

}
