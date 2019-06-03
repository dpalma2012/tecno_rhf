import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Plant } from '../m-models/Plant';
import { Equipment } from '../m-models/Equipment';
import { Wdayhour } from '../m-models/Wdayhour';

@Injectable()
export class PlantService {

  plantsRef: AngularFireList<any>;     //Declaring properties to Reference Firebase data
  speciesRef: AngularFireList<any>;
  equipsRef: AngularFireList<any>;
  bdaysRef: AngularFireList<any>;
  whoursRef: AngularFireList<any>;
  reservationsRef: AngularFireList<any[]>;
  plants: Observable<any[]>;
  plant: Observable<any>;

  constructor(protected db: AngularFireDatabase) { //Injecting Database
    this.plantsRef = this.db.list('plants');
    this.speciesRef = this.db.list('species');
    this.equipsRef = this.db.list('equips');
    this.whoursRef = this.db.list('whours');
    this.reservationsRef = this.db.list('reservation');
    this.bdaysRef = this.db.list('bdays');
    //Settinng our property to our database collectionn
    this.plants = this.plantsRef.snapshotChanges().map(changes => { //maps through database and grabs key
      return changes.map( c => ({key: c.payload.key, ...c.payload.val()
      }));
    });
  }
  getPlants(events:any[]=null) {  // Setting up Callback Function to retrieve clients
    return this.plants;
  }
  newPlant(plant: Plant) {
    const key = this.db.createPushId();
    plant = {key, ...plant};
    this.plantsRef.set(key, plant);
  }

  getPlant(id: string){
    this.plant = this.db.object('/plants/'+id).valueChanges();
    return this.plant;
  }

  updatePlant(id: string, plant: Plant){
    return this.plantsRef.update(id, plant);
  }
  deletePlant(id: string){
    this.deleteBdaysByXId(id, 'pId', );
    this.deleteEquipsByXId(id, 'pId');
    return this.plantsRef.remove(id);
  }

  // for plants in other views
  oGetPlants(){
    return this.plantsRef.query.once('value').then(data=>{
      let res = data.val()
      if (res!==null){
        return Object.keys(res).map(i=>res[i]);
      }
      return null
    });
  }

  // for equips in other views
  oGetEquipsSub(){
    return this.equipsRef.valueChanges();
  }
  oGetEquips(){
    return this.equipsRef.query.once('value').then(data=>{
      let res = data.val()
      if (res!==null){
        return Object.keys(res).map(i=>res[i]);
      }
      return null
    });
  }
  oGetEquipById(eId:string){
    return this.db.object(`equips/${eId}`).query.once('value').then(data=>{
      let res = data.val()
      if (res!==null){
        return Object.keys(res).map(i=>res[i]);
      }
      return null
    });
  }
  oGetEquipsByXId(xId:string, type:string ){
    return this.db.list('equips', ref=>ref.orderByChild(type).equalTo(xId)).query.once('value').then(data=>{
      let res = data.val()
      if (res!==null){
        return Object.keys(res).map(i=>res[i]);
      }
      return null
    });
  }

  deleteEquipById(id:string){
    let all = true
    console.log('id', id);
    if (id!==undefined) {
      this.deleteWhoursByXId(id, 'eId', all);
      this.deleteSpeciesByEId(id, 'eId');
      return this.equipsRef.remove(id);
    }
   
  }

  deleteEquipsByXId(xId:string, type:string){
    this.oGetEquipsByXId(xId, type).then(equips=>{
      if (equips===null){ return null}
      equips.forEach(e=>{
        this.deleteEquipById(e['key']);
      })
    })
  }

  // for bdays in other views
  oGetBdays(){
    return this.bdaysRef.query.once('value').then(data=>{
      let res = data.val()
      if (res!==null){
        return Object.keys(res).map(i=>res[i]);
      }
      return null
    });
  }
  
  oGetBdaysXId(xId:string, type:string){
    return this.db.list('bdays', ref=>ref.orderByChild(type).equalTo(xId)).query.once('value').then(data=>{
      let res = data.val()
      if (res!==null){
        return Object.keys(res).map(i=>res[i]);
      }
      return null
    });
  }

  deleteBdayById(id:string){
    if (id !==undefined){
      this.deleteWhoursByXId(id, 'bId');
      return this.bdaysRef.remove(id);
    }
  }

  deleteBdaysByXId(xId:string, type:string){
    this.oGetBdaysXId(xId, type).then(bdays=>{
      if (bdays===null){return null};
      bdays.forEach(b=>{
        this.deleteBdayById(b['key']);
      })
    })
  }



  // for whours in other views

  addWhour(whour:Wdayhour){
    console.log('whour', whour);
    if (whour.bId!==undefined&&whour.eId!==undefined){
      const key = this.db.createPushId();
      whour = {key, ...whour};
      this.whoursRef.set(key, whour);
    }   
  }

  oGetWhoursXId(xId:string, type:string){
    console.log('type', `${type}/${xId}`);
    return this.db.list('whours', ref=>ref.orderByChild(type).equalTo(xId)).query.once('value').then(data=>{
      let res = data.val()
      if (res!==null){
        return Object.keys(res).map(i=>res[i]);
      }
      return null
    });
  }

  deleteWhourById(id:string){
    console.log('wid', id);
    if (id!==undefined){
      this.whoursRef.remove(id);
    } 
  }

  deleteWhoursByXId(xId:string, type:string, all:boolean=false) {
    console.log('xid', xId);    
    this.oGetWhoursXId(xId, type).then(whours=>{
      console.log('whours', whours);
      if (whours===null) {return null}
      whours.forEach(w=>{
        if (w['bid']!=='0'||all===true){
          this.deleteWhourById(w['key']);
        }
      })
  
      
    })
  }


  //for species in other views
  oGetSpecies(){
    return this.db.list('species').query.once('value').then(data=>{
      let res = data.val()
      if (res!==null){
        return Object.keys(res).map(i=>res[i]);
      }
      return null
    });
  }

  oGetSpecieById(sId:string){
    return this.db.object(`species/${sId}`).query.once('value').then(data=>{
      let res = data.val()
      if (res!==null){
        return Object.keys(res).map(i=>res[i]);
      }
      return null
    });
  }

  oGetSpecieEquipByEId(sId:string, eId:string){
    return this.db.list(`species/${sId}/equips`, ref=>ref.orderByChild('key').equalTo(eId)).query.once('value').then(data=>{
      let res = data.val()
      if (res!==null){
        return Object.keys(res).map(i=>res[i]);
      }
      return null
    });
  }

  deleteSpecieById(id:string){
    if (id!==undefined){
      this.speciesRef.remove(id);
      this.deleteReservationByXId(id, 'specieID');
    }
    
  }

  deleteSpeciesByEId(eId:string, type:string){
    this.oGetSpecies().then(species=>{
      if (species===null){ return null}
      species.forEach(specie=>{
        console.log('specie', specie);
        this.oGetSpecieEquipByEId(specie.key, eId).then(c=>{
          if (c===null) {return null}
          console.log('sdf', c);
          c.forEach(df=>{
            console.log('df',df);
            this.db.list(`species/${specie.key}/equips`).remove(df.sekey).then(()=>{
              let sspeci = this.db.object(`species/${specie.key}`);
              sspeci.valueChanges().subscribe(sss=>{
                if (sss===null||sss['equips']===undefined){
                    sspeci.remove();
                }
              })
            });
          })
        })
      })
    })
  }

  //reservations
  oGetReservationsXId(xId:string, type:string){
    return this.db.list(`reservation`, ref=>ref.orderByChild(type).equalTo(xId)).query.once('value').then(data=>{
      let res = data.val()
      if (res!==null){
        return Object.keys(res).map(i=>res[i]);
      }
      return null
    });
  }

  deleteReservationById(id:string){
    if (id!==undefined){
      this.reservationsRef.remove(id);
    }
  }

  deleteReservationByXId(xId:string, type:string){
    this.oGetReservationsXId(xId, type).then(ress=>{
      if (ress===null) {return null}
      ress.forEach(re=>{
        this.deleteReservationById(re['key']);
      })
    })
  }
  

}
