export interface Service {
    serviceId: number;
    organizationId: number;
    serviceName: string;
    duration: number;
    durationType: string;
    isPriceOfApplication: boolean;
    price : number;
    permissionId: number;
    isCustomerSupport: boolean;
    occupancy: number;
    categoryId: number;
    serviceDescription: string;
    offerPrice : number;
    bufferTimeBefore: string;
    bufferTimeAfter: string;
    isOnlineGroupBooking: boolean;
    isCustomBookableTime: boolean;
    isDeleted: boolean;
}