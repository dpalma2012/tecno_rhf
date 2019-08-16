import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Company } from '../m-models/Company';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  companysRef: AngularFireList<any>;     //Declaring properties to Reference Firebase data
  companys: Observable<any[]>;
  company: Observable<any>;

  constructor(protected db: AngularFireDatabase) { //Injecting Database
    this.companysRef = this.db.list('companys');
    this.companys = this.db.list(`companys`).snapshotChanges().map(changes => {
      return changes.map(c => ({
        key: c.payload.key, ...c.payload.val()
      }));
    });
  }

  getcompanys() {
    return this.companys;
  }

  newcompany(company: Company) {
    this.companysRef.push(company);
  }

  getcompany(id: string) {
    this.company = this.db.object('/companys/' + id).valueChanges();
    return this.company;
  }

  updatecompany(id: string, company: Company){
    return this.companysRef.update(id, company);
  }

  deletecompany(id: string) {
    return this.companysRef.remove(id);
  }

}
