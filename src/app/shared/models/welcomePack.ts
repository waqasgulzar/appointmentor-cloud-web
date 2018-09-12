import { Entity } from './entity';
export class WelcomePack extends Entity {
    organizationId?: number;
    email:string;
    cc?:string;
    subject:string;
    message:string;
}
