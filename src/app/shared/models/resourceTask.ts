import { Entity } from './entity';
export class ResourceTask extends Entity {
  taskId?: number;
  taskName?: string;
  resourceId?: number;
  resourceName?: string;
  dueDate?: Date;
  customerId?: number;
  customerName?: string;
  details?: string;
  isTaskCompleted?: boolean;
  completedDate?: Date;
  isDeleted?: boolean;

  constructor() {
    super();
  }
}
