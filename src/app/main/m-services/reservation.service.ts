import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { PlantService } from './plant.service';

@Injectable({
  providedIn: 'root'
})
export class ReservationService extends PlantService{
  reservationsRef: AngularFireList<any>;
  reservations: Observable<any[]>;
  constructor(protected db: AngularFireDatabase) {
    super(db);
   }

   getReservationsPerPId(pId:string){
    return  this.db.list(`reservation`, ref=>ref.orderByChild('plantID').equalTo(pId)).snapshotChanges().map(changes=>{
  
      return changes.map( c => ({key: c.payload.key, ...c.payload.val()
      }));
    });

   }
}
