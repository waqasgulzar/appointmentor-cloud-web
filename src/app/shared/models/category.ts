
import { Service } from './service';
import { Entity } from './entity';

export class Category extends Entity {
    categoryId?: number;
    categoryName?: string;
    isDeleted?: boolean;
    organizationId?: number;
    services?: Array<Service>;
}
