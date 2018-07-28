export interface User {
    organizationId: number;
    firstName: string;
    lastName: string;
    companyName: string;
    phoneNumber: string;
    emailAddress: string;
    password: string;
    timeZoneId: number;
    currencyId: number;
    isDeleted: boolean;
}