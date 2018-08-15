import { Entity } from './entity';

export class ApiCredential extends Entity {
  id: number;
  organizationId: number;
  apiKey: string;
  apiSecret: number;
  apiToken: Date;
  expiryDate: Date;
}
