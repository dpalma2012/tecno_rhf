import { Component, OnInit, OnDestroy, } from '@angular/core';
import { takeUntil} from 'rxjs/operators';
import { Subject,} from 'rxjs';
import { ReservationService} from '../../m-services/reservation.service';
import { Plant } from '../../m-models/Plant';
import { Reservation } from '../../m-models/Reservation';
import { Equipment } from '../../m-models/Equipment';
import { Specie} from '../../m-models/Specie';
import * as moment from 'moment/moment';

@Component({
  selector: 'app-reservations-crud',
  templateUrl: './reservations-crud.component.html',
  styleUrls: ['./reservations-crud.component.css']
})
export class ReservationsCrudComponent implements OnInit {

  private unsubscribe: Subject<void> = new Subject();
  plants: Plant[];
  equips: Equipment[];
  species: Specie[];
  selectedPlant: Plant={};
  cols: any[];

  reservationsByPlant: Reservation[];

  constructor(private reservationService: ReservationService) { }

  ngOnInit() {
    this.plants=[];
    this.species=[];
    this.equips =[];
    this.reservationsByPlant = [];
    this.reservationService.oGetPlants().then(plants => {
      if (plants===null){ return null}
      this.plants = plants.map(p=>({
        key:p.key,
        name:p.name
      }));
      this.selectedPlant = plants[0];
      if (this.selectedPlant!==undefined){
        this.reservationService.oGetSpecies().then(species =>{
          this.species = species.map(s=>({
            key:s['key'],
            name: s['name']
          }));
          this.getReservations();
        })
      }
      

    });
    this.cols = [
      { field: 'id', header: 'Id'},
      { field: 'date', header: 'date'},
      { field: 'plantName', header: 'Plant'},
      { field: 'specieName', header:'Specie'},
      { field: 'equipName', header: 'Equipment'},
      { field: 'patentTruck', header:'Patent Truck'}
    ];
  }

  getReservations(){
    let pId = this.selectedPlant.key;
    this.reservationService.oGetEquipsByXId(pId, 'pId').then(equips=>{
      this.equips = equips.map(e=>({
        key:e['key'],
        name:e['name']
      }));
      this.reservationService.getReservationsPerPId(pId).pipe(takeUntil(this.unsubscribe)).subscribe(reservations => {
        let i = 1;
        this.reservationsByPlant = reservations.map(r=>({
          id: i++,
          date:this.toDate( r['date'], r['time_hour'], r['time_minute']),
          plantName: this.getPlantName(r['plantID']),
          specieName: this.getSpecieName(r['specieID']),
          equipName: this.getEquipName(r['equipID']),
          patentTruck: r['patentTruck']
        }))
      });
    })
   
  }

  getPlantName(pId:string){
    return this.plants.find(p=>(p.key===pId)).name;
  }

  getSpecieName(sId:string){
    return this.species.find(s=>(s.key===sId)).name;
  }

  getEquipName(eId:string){
    return this.equips.find(e=>(e.key===eId)).name;
  }

  ngOnDestroy(){
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  toDate(val, hour, min){
    let hh = hour;
    let ii = min;
    if (hh<10){
      hh = '0'+hh;
    }
    if (ii<10){
      ii = '0'+ii;
    }

    return moment(val).format('YYYY-MM-DD')+' '+hh+':'+ii;
  }

}
