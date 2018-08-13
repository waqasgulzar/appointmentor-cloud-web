import { Entity } from './entity';
export class ServiceResource extends Entity {
    serviceResourceId?: number;
    serviceName?: string;
    resourseName?: string;
    serviceId?: number;
    resourceId?: number;
    isDeleted?: boolean;
}
