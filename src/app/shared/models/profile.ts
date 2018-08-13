import { Entity } from './entity';
export class Profile extends Entity {
    profileID?: number;
    organizationId?: number;
    businessName?: string;
    aboutYourBusiness?: string;
    street?: string;
    city?: string;
    postCode?: string;
    businessPhoneNumber?: string;
    businessWebsite?: string;
    mobileNumber?: string;
    emailAddress?: string;
    otherEmailAddress?: string;
    sendFromEmailAddress?: string;
    sendFromNameForEmail?: string;
    sendFromNameForSMS?: string;
    logoForMarketingPath?: string;
    profileImageForMicrosite1?: string;
    setAsDefaultMircrosite1?: boolean;
    profileImageForMicrosite2?: string;
    setAsDefaultMircrosite2?: boolean;
    profileImageForMicrosite3?: string;
    setAsDefaultMircrosite3?: boolean;
    profileImageForMicrosite4?: string;
    setAsDefaultMircrosite4?: boolean;
    bannerImageForMicrosite?: string;
    isDeleted?: boolean;
}
