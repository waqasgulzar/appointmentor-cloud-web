import { Entity } from './entity';
export class CustomField extends Entity {
    customId?: number;
    organizationId?: number;
    fieldName?: string;
    isRequired?: boolean;
    isDeleted?: boolean;
}
