export interface EmailSetting {
    emailSettingID: number;
    organizationID: number;
    isInternalBooking: boolean;
    internalBookingText: string;
    isExternalBooking: boolean;
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
    isBookingReminderAfterOneDay: boolean;
    bookingReminderAfterOneDayText: string;
    isRebookingReminder: boolean;
    rebookingReminderText: string;
    comebackEmailAfter: string;
    emailHeader: string;
    emailFooter: string;
    prefilledDirectMessage: string;
    isDeleted: boolean;
}