import { Entity } from "./entity";

export class FileInformation extends Entity {
 name: string;
 onDiskName: string;
 fileSize: number;
 onDiskPath: string;
}