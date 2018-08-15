import { Entity } from "./entity";

export class Lookup extends Entity {
  id: number;
  title: string;
  description: string;
  isDeleted: boolean;
}