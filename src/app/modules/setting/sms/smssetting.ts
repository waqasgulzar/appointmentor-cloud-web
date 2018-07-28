export interface SMSSetting {
    sMSSettingID: number;
    organizationID: number;
    isBookingMade: boolean;
    bookingMadeText: string;
    isBookingModified: boolean;
    bookingModifiedText: string;
    isBookingCanceled: boolean;
    bookingCanceledText: string;
    isBookingRequested: boolean;
    bookingRequestedText: string;
    isBookingDeclined: boolean;
    bookingDeclinedText: string;
    isBookingReminder: boolean;
    bookingReminderText: string;
    amountOfNotice: string;
    isRebooking: boolean;
    rebookingText: string;
    isBookingMadeExternal: boolean;
    isBookingCanceledByCustomer: boolean;
    isDeleted: boolean;
}