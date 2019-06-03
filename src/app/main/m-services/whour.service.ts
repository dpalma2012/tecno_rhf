import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { EquipmentService } from './equipment.service';
import { Wdayhour } from '../m-models/Wdayhour';
import { PlantService } from './plant.service';

@Injectable({
  providedIn: 'root'
})
export class WhourService extends PlantService{

  constructor(protected db: AngularFireDatabase) {
    super(db);
   }

  getWhoursPerPId(pId:string){
    return this.db.list(`whours`, ref=>ref.orderByChild('pId').equalTo(pId)).snapshotChanges().map(changes=>{
      return changes.map( c => ({key: c.payload.key, ...c.payload.val()
      }));
    });
  }
  updateWhour(whour:Wdayhour){
    delete whour['equip']; 
    return this.db.list(`whours`).update(whour.key, whour);
  }
}
