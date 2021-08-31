import { User } from "./user.model";

export class Customer {
    id!: number;
    name!: string;
    website?: string;
    address!: string;
    users?: User[] = [];
    createdOn!: string;
    modifiedOn!: string;
}