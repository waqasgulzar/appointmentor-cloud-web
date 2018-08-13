import { Entity } from './entity';
export class QuestionService extends Entity {
    questionServiceId?: number;
    bookingQuestionId?: number;
    serviceId?: number;
    serviceName?: string;
    isDeleted?: boolean;
}
