import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import {Equipment} from '../m-models/Equipment';
import {PlantService } from './plant.service';
import { WhourService } from './whour.service';

@Injectable({
  providedIn: 'root'
})
export class EquipmentService extends PlantService{

  equipsRef: AngularFireList<any>;     //Declaring properties to Reference Firebase data
  equips: Observable<any[]>;
  equip: Observable<any>;

  constructor(protected db: AngularFireDatabase) { //Injecting Database
    super(db);
    this.equipsRef = this.db.list('equips');
    this.equips =  this.db.list(`equips`).snapshotChanges().map(changes=>{
        return changes.map( c => ({key: c.payload.key, ...c.payload.val()
        }));
    });
  }

  getEquips( ){
    return this.equips;
  }

  newEquip (equip:Equipment) {
    equip.pId = equip.plant.key;
    equip.status = "stopped";
    delete equip.plant;
    delete equip.plantName;
    delete equip.location;
    const key = this.db.createPushId();
    equip = {key, ...equip};
    this.equipsRef.set(key, equip).then(ref=>{
        this.addMonthWhour(key, equip.pId);
        this.oGetBdaysXId(equip.pId, 'pId').then(bdays=>{
          if (bdays===null){ return bdays}
          bdays.forEach(bday=> {
            this.addBdayWhour(key, equip.pId, bday);
          }) 
        })
    })
  }


  addMonthWhour(eId:string, pId:string){
    let whour =  {
      eId:eId,
      pId:pId,
      bId:'0',
      month:true,
      active:false}
      this.addWhour(whour);
  }

  addBdayWhour(eId:string, pId:string, bday){
    let whour =  {
      eId:eId,
      pId:pId,
      bId:bday.key,
      month:false,
      active:false,
      date: bday.date,
    }
      this.addWhour(whour);
  }

  getEquip(id: string){
    this.equip = this.db.object('/equips/'+id).valueChanges();
    return this.equip;
  }

  updateEquip(equip: Equipment,nowPlantKey:string, prePlantKey: string){
    console.log('prePlantkey', prePlantKey);
    console.log('equip', equip);
    let {key} = equip;
    const pId = nowPlantKey; 
    if (prePlantKey===pId){
      delete equip.plant;
      delete equip.plantName;
      delete equip.location; 
      return this.equipsRef.update(key, equip);
    } else {
      equip.pId = pId;
      this.deleteEquip(key).then(()=>{
        this.newEquip(equip);
      }
      );
      
    } 
  }

  deleteEquip(key:string){
    return  this.deleteEquipById(key);
  }

  cloneMe(c: any): any {
    let me = {};
    for (let prop in c) {
        me[prop] = c[prop];
    }
    return me;
  }
}
