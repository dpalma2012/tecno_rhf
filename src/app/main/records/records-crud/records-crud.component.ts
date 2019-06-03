import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';

import { RecordService } from '../../m-services/record.service';
import { takeUntil} from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Record } from '../../m-models/Record';
import * as moment from 'moment/moment';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-records-crud',
  templateUrl: './records-crud.component.html',
  styleUrls: ['./records-crud.component.css']
})
export class RecordsCrudComponent implements OnInit, OnDestroy {

  private unsubscribe: Subject<void> = new Subject();
  @ViewChild('dt') private _table: Table;
  dateFilters: any;
  plants: any[];

  selectedPlant: any={};
  cols: any[];

  records: Record[];
  recordsByPlant: Record[];

  constructor(private recordService: RecordService ) { }

  ngOnInit() {

    var _self = this;
    this.recordService.getRecords().pipe(takeUntil(this.unsubscribe)).subscribe(records=>{
      this.records = records.map(r=>({
        identifier:r.identifier,
        date:new Date(r.date),
        specieName: r.specieName,
        operatorName: r.operatorName,
        phoneNumber: r.phoneNumber,
        email: r.userEmail,
        rut_Carrier: r.rut_Carrier,
        patentTruck: r.patentTruck,
        plantName: r.plantName,
        dumper: r.dumper,
      }));
      let plants = records.map(r=>(r.plantName));
      this.plants = plants.filter((x, i, a)=>a.indexOf(x)==i).map(c=>({name:c}));
      this.selectedPlant = this.plants[0];
      this.getRecordsByPlant();
    });

    this.cols = [
      { field: 'id', header: 'ID'},
      { field: 'identifier', header: 'Identificador'},
      { field: 'date', header: 'Fecha'},
      { field: 'specieName', header:'Producto'},
      { field: 'operatorName', header: 'Operador'},
      { field: 'phoneNumber', header:'Telefono'},
      { field: 'email', header:'Email'},
      { field: 'rut_Carrier', header :'Rut Cargador'},
      { field: 'patentTruck', header:'Patente Camión'},
      { field: 'plantName', header: 'Planta'},
      { field: 'dumper', header:'Dumper'}
    ],

    this._table.filterConstraints['dateRangeFilter'] = (value, filter): boolean => {
      // get the from/start value
      var s = _self.dateFilters[0].getTime();
      var e;
      // the to/end value might not be set
      // use the from/start date and add 1 day
      // or the to/end date and add 1 day
      if (_self.dateFilters[1]) {
        e = _self.dateFilters[1].getTime() + 86400000;
      } else {
        e = s + 86400000;
      }
      // compare it to the actual values
      return value.getTime() >= s && value.getTime() <= e;
    }
  }


  getRecordsByPlant(){
    let i=1;
    this.recordsByPlant = this.records.filter(c=>(c.plantName===this.selectedPlant.name)).map(d=>({id:i++, ...d}));
  }
  isBoolean(val){
    return typeof val === 'boolean';  }

  ngOnDestroy(){
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  toDate(val){
    return moment(val).format('DD-MM-YYYY');
  }

}
