export interface Profile {
    profileId: number;
    organizationId: number;
    businessName: string;
    aboutYourBusiness: string;
    street: string;
    city: string;
    postCode: string;
    businessPhoneNumber: string;
    businessWebsite: string;
    mobileNumber: string;
    emailAddress: string;
    otherEmailAddress: string;
    sendFromEmailAddress: string;
    sendFromNameForEmail: string;
    sendFromNameForSMS: string;
    logoForMarketingPath: any;
    profileImageForMicrosite1: any;
    setAsDefaultMircrosite1: boolean;
    profileImageForMicrosite2: any;
    setAsDefaultMircrosite2: boolean;
    profileImageForMicrosite3: any;
    setAsDefaultMircrosite3: boolean;
    profileImageForMicrosite4: any;
    setAsDefaultMircrosite4: boolean;
    bannerImageForMicrosite: any;
    isDeleted: boolean;
}