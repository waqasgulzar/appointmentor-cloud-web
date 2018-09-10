import { Entity } from "./entity";
export class MediaLibrary extends Entity {
  id: number;
  mediaTypeId: number;
  documentTypeId: number;
  fileName: string;
  fileSize: number;
  onDiskName: string;
  onDiskPath: string;
  createdBy: number;
  createdOn: Date;
  isDeleted: true;
}
