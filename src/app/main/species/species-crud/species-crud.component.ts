import { Component, OnInit, OnDestroy } from '@angular/core';
import { Specie} from '../../m-models/Specie';
import { SpecieService } from '../../m-services/specie.service';
import {Validators,FormControl,FormGroup,FormBuilder} from '@angular/forms';
import { MessageService}  from 'primeng/api';
import { takeUntil} from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Equipment } from '../../m-models/Equipment';

@Component({
  selector: 'app-species-crud',
  templateUrl: './species-crud.component.html',
  styleUrls: ['./species-crud.component.css'],
  providers: [MessageService]
})
export class SpeciesCrudComponent implements OnInit, OnDestroy {

  private unsubscribe: Subject<void> = new Subject();

  specieForm: FormGroup;

  displayDialog: boolean;

  specie: Specie = {};

  selectedSpecie: Specie;

  newSpecie: boolean;

  species: Specie[];

  equips: Equipment[];

  cols: any[];

  submitted: boolean;

  constructor( private specieService:SpecieService, private fb: FormBuilder, private messageService: MessageService) { }

  ngOnInit() {
    this.equips = [];
    this.specieService.oGetEquips().then(equips=>{
      if (equips===null) {return null}
        this.equips = equips.map(e=>({key:e.key, name:e.name}));

      this.specieService.getSpecies().pipe(takeUntil(this.unsubscribe)).subscribe(species =>{
        this.species = [];
        species.forEach(s=>{
          if (s.equips!==undefined){
            this.species.push({
              active:s.active,
              name:s.name,
              key:s.key,
              equips: Object.keys(s.equips).map(key => ({key:s.equips[key].key, name:s.equips[key].name})),
              equipsName: this.getEquipsList(s.equips)})
          }
        })
      })
    });


    this.specieForm = this.fb.group({
      'name': new FormControl('', Validators.compose([Validators.required, Validators.pattern(".*\\S.*[a-zA-z0-9 ]")])),
      'equips': new FormControl([], Validators.required),
      'active': new FormControl('', Validators.required)
    });

    this.cols = [
      { field: 'name', header: 'Nombre' },
      { field: 'equipsName', header: 'Equipos'},
      { field: 'active', header: 'Activo' },
    ];

  }

  getEquipsList(equips:Equipment[]){
    let list = '';
    if (equips!==undefined){
      Object.keys(equips).forEach(key=>{
        let equip = equips[key];
        list = list+this.getEquipName(equip.key).name+', ';
      })
    }
    return list.substring(0, list.length-2);
  }

  getEquipName(ekey:string){
    return this.equips.find(function(e){
      return e.key===ekey
    })

  }

  showDialogToAdd() {
    this.specieForm.reset();
    this.specieForm.controls['active'].patchValue(false);
    this.newSpecie = true;
    this.specie = {active:false, equips:[]};
    this.displayDialog = true;
  }

  save() {
    let species = [...this.species];
    this.specie.name = this.specie.name.trim();
    let exists = species.filter(s=>s.name.toLowerCase()===this.specie.name.toLowerCase());
    if (this.newSpecie)
      {
          if (exists.length===0){
            this.specieService.newSpecie(this.specie);
            this.showMessage(true,  `${this.specie.name} ha sido creado!`);
          } else {
            this.showMessage(false, `${this.specie.name} tiene duplicación!`);
            return null;
          }
      }
    else
        {
          if (exists.length===0||(exists.length===1&&exists[0].key===this.specie.key)){
            this.specieService.updateSpecie(this.specie.key, this.specie);
            let detail = `${this.specie.name} ha sido actualizado!`
            this.showMessage(true, detail );
          } else {
            this.showMessage(false, `${this.specie.name} tiene duplicación!`);
            return null;
          }
        }

    this.species = species;
    this.specie = null;
    this.displayDialog = false;
    return null;

  }

  delete() {
    this.specieService.deleteSpecie(this.selectedSpecie).then(()=>{
      this.showMessage(true, `${this.selectedSpecie.name} ha sido eliminado!.`);
    }).catch((e)=>{
      this.showMessage(false, `${e}`);
    });

    this.displayDialog = false;
  }

  onRowSelect(event) {
    this.newSpecie = false;
    this.specie = this.cloneSpecie(event.data);
    console.log('specie', this.specie);
    this.equips = this.equips.map(e=>({key:e.key, name:e.name}))
    console.log('equips', this.equips);
    this.displayDialog = true;
  }

  cloneSpecie(c: Specie): Specie {
    let plant = {};
    for (let prop in c) {
        plant[prop] = c[prop];
    }
    return plant;
  }
  isBoolean(val){
    return typeof val === 'boolean';  }

  showMessage(status:boolean, detail:string){
    if (status===true){
      this.messageService.add({severity:'info', summary:'Success', detail:detail});
    } else {
      this.messageService.add({severity:'error', summary:'Error', detail:detail});
    }
  }

  ngOnDestroy(){
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

}
