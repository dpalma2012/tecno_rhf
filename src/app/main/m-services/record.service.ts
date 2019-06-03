import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class RecordService  {

    recordsRef: AngularFireList<any>;
    records: Observable<any[]>;

    constructor (protected db: AngularFireDatabase){
        this.recordsRef = this.db.list('record');
        this.records = this.recordsRef.snapshotChanges().map(changes=>{
            return changes.map(c=>({key:c.key, ...c.payload.val()}))
        })

    }

    getRecords(){
        return this.records;
    }
    
}