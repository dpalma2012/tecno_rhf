import {Moment} from 'moment/moment';
export interface Wdayhour{
    key?:string;
    pId?:string;
    eId?:string;
    bId?:string;
    month?: boolean;
    date?:Moment;
    start?:string;
    end?:string;
    wtime?:number;
    active?:boolean;

}