import { Equipment } from "./Equipment";
import {Bday} from './Bday';
export interface Plant {
    key?:string;
    name?:string;
    location?:string;
    dumper?:boolean;
    active?:boolean;
    equips?:any;
    bdays?:any;
}