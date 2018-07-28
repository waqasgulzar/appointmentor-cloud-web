export interface Resource {
    resourceId: number;
    organizationId: number;
    resourceName: string;
    contactName: string;
    emailAddress: string;
    isSendConfirmationEmail: boolean;
    houseNo :string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    postcode: string;
    color: string;
    isDeleted: boolean;
}