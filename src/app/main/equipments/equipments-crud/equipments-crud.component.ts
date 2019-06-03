import { Component, OnInit,OnDestroy } from '@angular/core';
import { Equipment } from '../../m-models/Equipment';
import { Plant } from '../../m-models/Plant';
import { EquipmentService } from '../../m-services/equipment.service';
import { takeUntil} from 'rxjs/operators';
import { Subject } from 'rxjs';
import {Validators,FormControl,FormGroup,FormBuilder} from '@angular/forms';
import {MessageService}  from 'primeng/api';

@Component({
  selector: 'app-equipments-crud',
  templateUrl: './equipments-crud.component.html',
  styleUrls: ['./equipments-crud.component.css'],
  providers: [MessageService]

})
export class EquipmentsCrudComponent implements OnInit {

  private unsubscribe: Subject<void> = new Subject();

  equipForm: FormGroup;

  displayDialog: boolean;

  equip: Equipment = {};

  selectedEquip: Equipment;

  newEquip: boolean;

  equips: Equipment[];

  plants: Plant[];

  cols: any[];

  prePlantKey: string;

  constructor( private equipService:EquipmentService, private fb: FormBuilder, private messageService: MessageService) { }

  ngOnInit() {
    this.equips = [];
    this.plants = [];
    this.equipService.oGetPlants().then(plants=>{
      this.plants = plants;
      this.equipService.getEquips().pipe(takeUntil(this.unsubscribe)).subscribe(equips=>{
        this.equips = equips.map(e=>({
          ...e,
          plant: this.getPlantById(e.pId),
          plantName: this.getPlantById(e.pId).name,
          location: this.getPlantById(e.pId).location
        }))
      })
    });

    this.equipForm = this.fb.group({
      'name': new FormControl('', Validators.compose([Validators.required, Validators.pattern(".*\\S.*[a-zA-z0-9 ]")])),
      'plant': new FormControl(null, Validators.required),
      'active': new FormControl(false)
    })

    this.cols = [
      { field: 'name', header: 'Nombre' },
      { field: 'plantName', header: 'Planta' },
      { field: 'location', header: 'Ubicación' },
      { field: 'active', header: 'Activo' },
      { field: 'status', header: 'Estado' }
    ];

  }

  getPlantById(pId:string){
    return this.plants.find(function(p){
      return p.key===pId;
    })
  }

  showDialogToAdd() {
    this.newEquip = true;
    this.equip = {};
    this.equip.active = false;
    this.equip.plant = this.plants[0];
    this.equipForm.reset();
    this.equipForm.controls['active'].patchValue(false);
    this.equipForm.controls['plant'].patchValue(this.plants[0]);
    this.displayDialog = true;
  }

  save() {
    console.log('equip', this.equip);
    let nowPlantKey = this.equip.plant.key;
    console.log('copied', nowPlantKey);
    let equips = [...this.equips];
    let equipNames = equips.map(c=>({key:c.key, name:c.name}));
    this.equip.name = this.equip.name.trim();
    let exists = equipNames.filter(item=>item.name.toLowerCase()===this.equip.name.toLowerCase());
    if (this.newEquip)
      {
        if (exists.length ===0){
          this.equipService.newEquip(this.equip);
          this.showMessage(true, `${this.equip.name} ha sido creado!`);
        } else {
          this.showMessage(false, `${this.equip.name} tiene duplicación!`);
          return null;
        }
      }
    else
      {
        if (exists.length===0||(exists.length===1&&exists[0].key===this.equip.key)){

          this.equipService.updateEquip(this.equip,nowPlantKey, this.prePlantKey)
          this.showMessage(true, `${this.equip.name} ha sido actualizado!`);
        } else {
          this.showMessage(false, `${this.equip.name} tiene duplicación!`);
          return null;
        }
      }

    this.equips = equips;
    this.equip = null;
    this.displayDialog = false;
  }

  delete() {
    this.equipService.deleteEquip(this.selectedEquip.key).then(()=>{
      this.showMessage(true, `${this.selectedEquip.name} ha sido eliminado!`);
    }).catch((e)=>{
      this.showMessage(false, `${e}`)
    });
    this.displayDialog = false;
  }

  onRowSelect(event) {
    this.newEquip = false;
    this.equip = this.cloneEquip(event.data);
    console.log('equips selected', this.equip);
    this.selectedEquip = this.equip;
    this.prePlantKey = this.equip.plant.key;
    this.displayDialog = true;
  }

  cloneEquip(c: Equipment): Equipment {
    let plant = {};
    for (let prop in c) {
        plant[prop] = c[prop];
    }
    return plant;
  }

  isBoolean(val){
    return typeof val === 'boolean';  }

    ngOnDestroy(){
      this.unsubscribe.next();
      this.unsubscribe.complete();
    }

    showMessage(status:boolean, detail:string){
      if (status){
        this.messageService.add({severity:'info', summary:'Success', detail:detail});
      } else {
        this.messageService.add({severity:'error', summary:'Error', detail:detail});
      }
    }

}
