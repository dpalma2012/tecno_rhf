import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import {Plant} from '../m-models/Plant';
import {Bday} from '../m-models/Bday';
import { PlantService } from './plant.service';
import 'rxjs/add/operator/first';

@Injectable({
  providedIn: 'root'
})
export class BdayService extends PlantService{
  bdaysRef: AngularFireList<any>;     //Declaring properties to Reference Firebase data
  bdays: Observable<any[]>;
  bday: Observable<any>;

  constructor(protected db: AngularFireDatabase) { //Injecting Database
    super(db);
    this.bdaysRef = this.db.list('bdays'); 
  }

  getBdaysPerPlant(pId:string){  // Setting up Callback Function to retrieve clients   
    return this.db.list(`bdays`, ref=>ref.orderByChild('pId').equalTo(pId)).snapshotChanges().map(changes=>{
      return changes.map( c => ({key: c.payload.key, ...c.payload.val()
      }));
    });
  }

  newBday(bday: Bday, plant:Plant){
    bday.pId = plant.key
    if (plant.key===undefined){return}
    const key = this.db.createPushId();
    bday = {key, ...bday};
    this.bdaysRef.set(key, bday).then(()=>{
      this.oGetEquipsByXId(bday.pId, 'pId').then(equips=>{
        if (equips===null ){return null}
        equips.forEach(e => {
          this.addBdayWhour(e['key'], bday.pId, bday, key);
        })
      })
    });
  }

  addBdayWhour(eId:string, pId:string, bday, bId){
  
    let whour =  {
      eId:eId,
      pId:pId,
      bId:bId,
      month:false,
      active:false,
      date: bday.date,
    }
      this.addWhour(whour);
  }

}
