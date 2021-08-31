import { ROLE } from "./user.model";

export class Role{
    key!:ROLE;
    name!:string;
    description?:string;
    createdOn?:string;
    modifiedOn?:string;
}