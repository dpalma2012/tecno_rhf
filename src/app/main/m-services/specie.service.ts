import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Specie } from '../m-models/Specie';
import { EquipmentService } from './equipment.service';
import { PlantService } from './plant.service';
import { Equipment } from '../m-models/Equipment';

@Injectable()
export class SpecieService extends PlantService{

  speciesRef: AngularFireList<any>;     //Declaring properties to Reference Firebase data
  species: Observable<any[]>;
  specie: Observable<any>;

  constructor(protected db: AngularFireDatabase) { //Injecting Database
    super(db);
    this.speciesRef = this.db.list('species');   //Settinng our property to our database collectionn
    this.species = this.speciesRef.snapshotChanges().map(changes => { //maps through database and grabs key
      return changes.map( c => ({key: c.payload.key, ...c.payload.val()
      }));
    });
  }

  getSpecies(){  // Setting up Callback Function to retrieve clients
    return this.species;
  }

  newSpecie(specie: Specie){
    let equips = specie.equips;
    delete specie.equips;
    const key = this.db.createPushId();
    specie = {key, ...specie};
    this.speciesRef.set(key, specie).then(()=>{
      equips.forEach(e=>{
        this.addEquipsToSpecie(key, e)
      })
    })
  }

  addEquipsToSpecie(skey:string, equip:Equipment){
    const sekey = this.db.createPushId();
    equip['sekey'] =sekey;
    this.db.list(`species/${skey}/equips`).set(sekey, equip);
  }

  getSpecie(id: string){
    this.specie = this.db.object('/species/'+id).valueChanges();
    return this.specie;
  }

  updateSpecie(id: string, specie: Specie){
    let equips = specie.equips;
    delete specie['equipsName'];
    delete specie['equips'];  
    this.db.list(`species/${id}/equips`).remove().then(()=>{
    this.speciesRef.update(id, specie).then(()=>{
        equips.forEach(e=>{
          this.addEquipsToSpecie(id, e);
        })
      })
    });
  }

  deleteSpecie(specie:Specie){
    return this.speciesRef.remove(specie.key);
  }
}
