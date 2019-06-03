import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Plant} from '../../m-models/Plant';
import {BdayService} from '../../m-services/bday.service';
import * as moment from 'moment/moment';
import {Bday} from '../../m-models/Bday';
import {MultipleDatePickerComponent} from '../../../libs/multiple-date-picker-angular';
import { takeUntil} from 'rxjs/operators';
import { Subject } from 'rxjs';
import { MessageService}  from 'primeng/api';

@Component({
  selector: 'app-bdays-crud',
  templateUrl: './bdays-crud.component.html',
  styleUrls: ['./bdays-crud.component.css'],
  providers: [MessageService]
})
export class BdaysCrudComponent implements OnInit {

  private unsubscribe: Subject<void> = new Subject();
  highlightDays: any[];
  initialCount: Array<any>;// this is the [(ngModel)] property
  datesArray: Array<any>;
  myMonth: any;
  plants: Plant[];
  plant: Plant = {};
  selectedPlant: Plant={};
  bdays: Bday[];

  constructor( private bdayService:BdayService,private messageService: MessageService) { }
  @ViewChild(MultipleDatePickerComponent) private multipleDatePicker: MultipleDatePickerComponent;

  ngOnInit() {
    let plantEvents = ['child_added', 'child_removed'];
    this.myMonth = moment().startOf('day');
    this.initialCount = [];
    this.bdayService.oGetPlants().then (plants =>{
      if (plants===null){ return null}
      this.plants = plants;
      if (this.selectedPlant.key===undefined){
        this.selectedPlant = plants[0];

      }
      if (this.selectedPlant!==undefined){
        this.getBdays();
      }

  });

  }

  getBdays(){
    this.multipleDatePicker.clearDays();
    this.bdayService.getBdaysPerPlant(this.selectedPlant.key).pipe(takeUntil(this.unsubscribe)).subscribe(bdays=>{
      this.initialCount = [];
      this.bdays = bdays;
      this.bdays.forEach(bday=>{
        this.initialCount.push(moment(bday.date));
      });
    });
  }

  save(){
    let prepare = this.initialCount.map(c=>{return c.valueOf()});//now days to be modified
    let preCount = [];//the previous days already existed
    this.bdays.forEach(bday=>{
      preCount.push(bday.date);
    })

    let newdays = prepare.filter(item=>preCount.indexOf(item)<0);//new days to be inserted
    let deleteddays = this.bdays.filter(bday=>prepare.indexOf(bday.date)<0);//delete days to be deleted
    if (prepare.length > 0){
      deleteddays.forEach(bday=>{
          this.bdayService.deleteBdayById(bday.key);
      })
    } else {
      //if prepare doesn't contain any day, it should delete all bdays belonging to plant
      this.bdayService.deleteBdaysByXId(this.selectedPlant.key, 'pId');
    }


    newdays.forEach(date=>{
      let newbday = {date:date}
      this.bdayService.newBday(newbday, this.selectedPlant);
    })
    let message = `Los días hábiles de ${this.selectedPlant.name} han sido cambiados!`;
    this.messageService.add({severity:'info', summary:'Success', detail:message});
  }

  ngOnDestroy(){
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

}
