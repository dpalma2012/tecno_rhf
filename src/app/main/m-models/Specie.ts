import { Equipment } from "./Equipment";

export interface Specie{
    key?:string;
    name?:string;
    active?:boolean;
    // for showing parent hierachy;
    pId?:string;
    // for showing parent
    equips?:Equipment[];
    equipsName?:string;
}