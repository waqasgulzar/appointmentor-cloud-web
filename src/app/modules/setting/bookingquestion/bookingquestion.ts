export interface BookingQuestion {
    bookingQuestionId: number;
    organizationId: number;
    question: string;
    questionType: string;
    link: string;
    isRequired: boolean;
    isAlwaysShow: boolean;
    isDeleted: boolean;
}