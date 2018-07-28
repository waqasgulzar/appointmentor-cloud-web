export interface OnlineBookingSetting {
    onlineBookingSettingID: number;
    organizationID: number;
    isCustomAllowBooking: boolean;
    noticeForOnlineBooking: string;
    blockAvailabilityAfter: string;
    isShowPrice: boolean;
    isCustomerSelectResourceGroup: boolean;
    isCustomerSelectResources: boolean;
    showResourceSelection: string;
    isShowResourceImage: boolean;
    isCustomerAllowAny: boolean;
    defaultTimeZoneID: number;
    timeIncrementsAvailability: string;
    noAvailabilityMessage: string;
    isCustomerBookwithoutAccount: boolean;
    isMobileRequired: boolean;
    isNotesForOnlineBooking: boolean;
    notesForOnlineBooking: string;
    confirmationMessageForBooking: string;
    noticeForCancellation: string;
    isCustomerCancelFromConfirmation: boolean;
    isDeleted: boolean;
}