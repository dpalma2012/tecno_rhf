import {Plant} from './Plant';
import {Relation} from './Relation';
export interface Equipment {
    key?:string;
    name?:string;
    status?:string;   
    active?:boolean;
    // for showing parent information
    plant?:Plant;
    plantName?:string;
    location?:boolean;
    // for showing parent hierachy
    pId?:string;
    // for showing childs 
    species?:Relation[];
}