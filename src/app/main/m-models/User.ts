import { UserType } from "./UserType";

export interface User {
    key?:string;
    name?:string;
    email?:string;
    password?:string;
    phone?:string;
    rut?:string;
    type?:UserType;
}