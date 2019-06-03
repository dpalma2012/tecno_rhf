import { Component, OnInit,OnDestroy } from '@angular/core';
import { Plant } from '../../m-models/Plant';
import { PlantService } from '../../m-services/plant.service';
import { takeUntil} from 'rxjs/operators';
import { Subject } from 'rxjs';
import {Validators,FormControl,FormGroup,FormBuilder} from '@angular/forms';
import {MessageService}  from 'primeng/api';


@Component({
  selector: 'app-plants-crud',
  templateUrl: './plants-crud.component.html',
  styleUrls: ['./plants-crud.component.css'],
  providers: [MessageService]

})
export class PlantsCrudComponent implements OnInit, OnDestroy {

  private unsubscribe: Subject<void> = new Subject();

  plantForm: FormGroup;

  displayDialog: boolean;

  plant: Plant = {};

  selectedPlant: Plant;

  newPlant: boolean;

  plants: Plant[];

  cols: any[];

  constructor( private plantService:PlantService, private fb: FormBuilder, private messageService: MessageService) { }

  ngOnInit() {
      this.plantForm = this.fb.group({
        'name': new FormControl('', Validators.compose([Validators.required, Validators.pattern(".*\\S.*[a-zA-z0-9 ]")])),
        'location': new FormControl('', Validators.compose([Validators.required, Validators.pattern(".*\\S.*[a-zA-z0-9 ]")])),
        'dumper': new FormControl(false),
        'active': new FormControl(false)
      })

    this.plantService.getPlants().pipe(takeUntil(this.unsubscribe)).subscribe (plants =>{
        this.plants = plants;
    });

    this.cols = [
      { field: 'name', header: 'Nombre' },
      { field: 'location', header: 'Ubicación' },
      { field: 'dumper', header: 'Dumper' },
      { field: 'active', header: 'Activo' },
    ];

  }

  showDialogToAdd() {
    this.newPlant = true;
    this.plant = {active:false, dumper:false};
    this.plantForm.reset();
    this.plantForm.controls['dumper'].patchValue(false);
    this.plantForm.controls['active'].patchValue(false);
    this.displayDialog = true;
  }

  save() {
    let plants = [...this.plants];
    let plantNames = plants.map(c=>({key:c.key, name:c.name}));
    this.plant.name = this.plant.name.trim();
    let exists = plantNames.filter(item=>item.name.toLowerCase()===this.plant.name.toLowerCase());
    if (this.newPlant)
        {

          if (exists.length===0){
            this.plantService.newPlant(this.plant);
            const message = `${this.plant.name} ha sido creado!`;
            this.showMessage(true, message);
          } else {
            const message = `${this.plant.name} tiene duplicación!`;
            this.showMessage(false, message);
            return null;
          }

      }
    else
        { if (exists.length===0||(exists.length===1&&exists[0].key===this.plant.key)){
          this.plantService.updatePlant(this.plant.key, this.plant);
          this.showMessage(true, `${this.plant.name} ha sido actualizado!`);
        } else {
          this.showMessage(false, `${this.plant.name} tiene duplicacion!`);
          return null;
        }

        }

    this.plants = plants;
    this.plant = null;
    this.displayDialog = false;
  }

  delete() {
    if (this.plant.key) {
      this.plantService.deletePlant(this.selectedPlant.key).then(()=>{
        this.showMessage(true, `${this.plant.name} ha sido eliminado!`);
      }).catch((e)=>{
        this.showMessage(false, `${e}`);
      });

    }
    this.displayDialog = false;
  }

  onRowSelect(event) {
    this.newPlant = false;
    this.plant = this.clonePlant(event.data);
    this.selectedPlant = this.plant;
    this.displayDialog = true;
  }

  clonePlant(c: Plant): Plant {
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
