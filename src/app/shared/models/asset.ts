
import { AssetService } from './assetService';
import { Entity } from './entity';

export class Asset extends Entity {
    assetId?: number;
    organizationId?: number;
    name?: string;
    quantity?: number;
    isDeleted?: boolean;
    assetservice?: Array<AssetService>;
}
