
import { QuestionService } from './questionService';
import { Entity } from './entity';

export class BookingQuestion extends Entity {
    bookingQuestionID?: number;
    organizationID?: number;
    questionType?: string;
    question?: string;
    link?: string;
    isRequired?: boolean;
    isAlwaysShow?: boolean;
    isDeleted?: boolean;
    questionservice?: Array<QuestionService>;
}
