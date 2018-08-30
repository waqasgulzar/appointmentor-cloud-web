import { Category } from './category';
import { Entity } from './entity';

export class Service extends Entity {
  serviceId?: number;
  organizationId?: number;
  serviceName?: string;
  duration?: number;
  durationType?: string;
  isPriceOfApplication?: boolean;
  price?: number;
  formattedPrice?: string;
  permissionId?: number;
  isCustomerSupport?: boolean;
  occupancy?: number;
  categoryId?: number;
  serviceDescription?: string;
  offerPrice?: number;
  bufferTimeBefore?: string;
  bufferTimeAfter?: string;
  isOnlineGroupBooking?: boolean;
  isCustomBookableTime?: boolean;
  isDeleted?: boolean;
  category?: Category;
}