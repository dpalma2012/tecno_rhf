import { Component, OnDestroy, OnInit } from '@angular/core';
import { Wdayhour } from '../../m-models/Wdayhour';
import { Plant } from '../../m-models/Plant';
import { WhourService } from '../../m-services/whour.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormArray } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Equipment } from '../../m-models/Equipment';
import { CompanyService } from '../../m-services/company.service';
import { Company } from '../../m-models/Company';

@Component({
  selector: 'app-whours-crud',
  templateUrl: './whours-crud.component.html',
  styleUrls: ['./whours-crud.component.css'],
  providers: [MessageService]
})
export class WhoursCrudComponent implements OnInit, OnDestroy {

  private unsubscribe: Subject<void> = new Subject();

  displayDialog: boolean;

  whour: Wdayhour = {};

  selectedPlant: Plant = {};

  selectedWhour: Wdayhour = {};

  whours: Wdayhour[];

  plants: Plant[];

  equips: Equipment[];

  cols: any[];

  monthflag: number;

  companys: Company[];

  companysValidation: boolean;

  constructor(private whourService: WhourService, private messageService: MessageService, private companyService: CompanyService) { }

  ngOnInit() {
    this.whours = [];
    this.plants = [];
    this.monthflag = 0;
    this.whourService.oGetPlants().then(plants => {
      if (plants === null) { return null }
      this.plants = plants;
      this.selectedPlant = plants[0];
      if (plants.length > 0) {
        this.getEquips();
      }

    })

    this.cols = [
      { field: 'equip', header: 'Equipo' },
      { field: 'date', header: 'Día' },
      { field: 'month', header: 'Mes' },
      { field: 'start', header: 'Tiempo de inicio' },
      { field: 'end', header: 'Tiempo de termino' },
      { field: 'wtime', header: 'Tiempo de trabajo' },
      { field: 'active', header: 'Activo' }
    ];

    this.companyService.getcompanys().subscribe(data => {
      this.companys = data;
      console.log('Empresas', this.companys);
    });

  }

  getEquips() {
    this.monthflag = 0;
    this.whourService.oGetEquipsByXId(this.selectedPlant.key, 'pId').then(equips => {
      this.equips = equips;
      this.getWhours();
    })
  }

  getEquipById(eId: string) {
    return this.equips.find(function (e) {
      return e.key === eId;
    })
  }

  getWhours() {
    this.whourService.getWhoursPerPId(this.selectedPlant.key).pipe(takeUntil(this.unsubscribe)).subscribe(whours => {
      let bdaywhours = this.filterWhours(whours);
      if (bdaywhours.length > 0) {
        this.whours = bdaywhours.map(w => ({
          ...w,
          equip: this.getEquipById(w.eId).name
        }))
      } else {
        this.whours = whours.map(w => ({
          ...w,
          equip: this.getEquipById(w['eId']).name
        }))
      }
    })
  }

  filterWhours(whours: Wdayhour[]) {
    return whours.filter(w => (w.bId !== '0'))
  }

  save() {
    let whours = [...this.whours];
    let equip = this.whour['equip'];
    this.whourService.updateWhour(this.whour).then(() => {
      this.showMessage(true, `El tiempo de trabajo para ${equip} se ha establecido!`);
    }).catch((e) => {
      this.showMessage(false, `${e}`);
    });
    this.ctrlEnd.reset();
    this.ctrlStart.reset();
    this.ctrlWtime.reset();
    this.whour = null;
    this.displayDialog = false;
  }

  calculateDuration(start, end) {
    try {
      if (end['hour'] === 0 && end['minute'] === 0) {
        end['hour'] = 24;
      }
      if (start['hour'] === 24) {
        start['hour'] = 0;
      }
      let dhours = end['hour'] - start['hour'];
      return dhours * 60 + (end['minute'] - start['minute']);
    } catch (e) {
      return -1;
    }

  }

  calcularhorasCompany() {
    console.log(this.calculateDuration(this.whour.start, this.whour.end) / this.whour.wtime);

  }

  onRowSelect(event) {
    this.whour = this.cloneWhour(event.data);
    console.log(event.data);
    this.displayDialog = true;
  }

  cloneWhour(c: any): any {
    let whour = {};
    for (let prop in c) {
      whour[prop] = c[prop];

    }

    return whour;
  }

  isBoolean(val) {
    return typeof val === 'boolean';
  }

  isDate(val) {
    return typeof val === 'object';
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  toDate(val) {
    return new Date(val);
  }

  toFormatTime(val) {
    if (val === undefined) {
      return '';
    }
    let hour = '', minute = '';
    if (val.hour < 10) {
      hour = '0' + val.hour;
    } else {
      hour = val.hour.toString();
    }
    if (val.minute < 10) {
      minute = '0' + val.minute;
    } else {
      minute = val.minute.toString();
    }
    return `${hour} : ${minute}`;
  }


  ctrlStart = new FormControl('', (control: FormControl) => {
    const value = control.value;

    if (!value) {
      return null;
    }
    if (this.calculateDuration(value, this.whour.end) < 0) {
      this.whour.end = value;
      return { laterThanEnd: true }
    }

    return null;
  });

  ctrlEnd = new FormControl('', (control: FormControl) => {
    const value = control.value;

    if (!value) {
      return null;
    }
    if (this.calculateDuration(this.whour.start, value) < 0) {
      this.whour.start = value;
      return { earlierThanStart: true }
    }
    return null;
  });

  ctrlWtime = new FormControl('', (control: FormControl) => {
    const value = control.value;
    if (!value) {
      return { required: true };
    }
    if (value > this.calculateDuration(this.whour.start, this.whour.end)) {
      return { biggerThanInterval: true }
    }
    return null;
  });

  showMessage(status: boolean, detail: string) {
    if (status) {
      this.messageService.add({ severity: 'info', summary: 'Success', detail: detail });
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: detail });
    }
  }


  pushTime(name, ref) {

    if (this.whour.companys) {
      console.log('Con Dato');


      let pos = this.whour.companys.map(function(e) { return e.name; }).indexOf(name);
      console.log(pos);

      if(pos!==-1){
        this.whour.companys[pos].amount_hour = Number(ref.value);
      }else{
        this.whour.companys.push({
          'name': name,
          'amount_hour': Number(ref.value),
          'reserve_hour': 0
        });
      }

    } else {
      console.log('Vacio');
      this.whour.companys = [{
        'name': name,
        'amount_hour': Number(ref.value),
        'reserve_hour': 0
      }];
    }


    let validation = 0;
    this.whour.companys.forEach(element => {
      validation += element.amount_hour;
    });

    if(validation===Math.round(this.calculateDuration(this.whour.start, this.whour.end) / this.whour.wtime)){
      console.log('Iguales', validation);
      console.log(Math.round(this.calculateDuration(this.whour.start, this.whour.end) / this.whour.wtime));
      this.companysValidation = false;
    }else{
      console.log('Distintos', validation);
      console.log(Math.round(this.calculateDuration(this.whour.start, this.whour.end) / this.whour.wtime));
      this.companysValidation = true;
    }

    console.log(this.whour);

  }

}
