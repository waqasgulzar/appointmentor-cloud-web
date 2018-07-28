export interface Customer {
    customerId: number;
    organizationId: number;
    firstName: string;
    lastName: string;
    mobileNumber: string;
    contactNumber: string;
    emailAddress: string;
    twitterUserName: string;
    gender: boolean;
    dateOfBirth: string;
    unsubscribed: boolean;
    addressLine1: string;
    addressLine2: string;
    city: string;
    postCode: string;
    profileImage: string;
    isDeleted: boolean;
}