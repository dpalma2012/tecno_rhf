import { Component, OnInit, OnDestroy } from '@angular/core';
import { Equipment } from '../../m-models/Equipment';
import { Plant } from '../../m-models/Plant';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { CompanyService } from '../../m-services/company.service';
import { Company } from '../../m-models/Company';

@Component({
  selector: 'app-companys-crud',
  templateUrl: './companys-crud.component.html',
  styleUrls: ['./companys-crud.component.css'],
  providers: [MessageService]

})
export class CompanysCrudComponent implements OnInit {

  private unsubscribe: Subject<void> = new Subject();

  companyForm: FormGroup;

  displayDialog: boolean;

  companys: Company[];

  cols: any[];

  company: Company = {};

  selectedCompany: Company;

  newCompany: boolean;



  constructor(private companyService: CompanyService, private fb: FormBuilder, private messageService: MessageService) { }

  ngOnInit() {

    this.companyService.getcompanys().pipe(takeUntil(this.unsubscribe)).subscribe(companys => {
      this.companys = companys;
    });

    this.companyForm = this.fb.group({
      'name': new FormControl('', Validators.compose([Validators.required, Validators.pattern(".*\\S.*[a-zA-z0-9 ]")])),

      'active': new FormControl(false)
    })

    this.cols = [
      { field: 'name', header: 'Nombre' },
      { field: 'active', header: 'Activo' },
    ];

  }

  getPlantById(pId: string) {
    return this.companys.find(function (p) {
      return p.key === pId;
    })
  }

  showDialogToAdd() {
    this.newCompany = true;
    this.company = {active:false};
    this.companyForm.reset();
    this.companyForm.controls['active'].patchValue(false);
    this.displayDialog = true;
  }

  save() {
    let companys = [...this.companys];
    let companysNames = companys.map(c => ({ key: c.key, name: c.name }));
    this.company.name = this.company.name.trim();
    let exists = companysNames.filter(item => item.name.toLowerCase() === this.company.name.toLowerCase());
    if (this.newCompany) {

      if (exists.length === 0) {
        this.companyService.newcompany(this.company);
        const message = `${this.company.name} ha sido creado!`;
        this.showMessage(true, message);
      } else {
        const message = `${this.company.name} tiene duplicación!`;
        this.showMessage(false, message);
        return null;
      }

    }
    else {
      if (exists.length === 0 || (exists.length === 1 && exists[0].key === this.company.key)) {
        this.companyService.updatecompany(this.company.key, this.company);
        this.showMessage(true, `${this.company.name} ha sido actualizado!`);
      } else {
        this.showMessage(false, `${this.company.name} tiene duplicacion!`);
        return null;
      }

    }

    this.companys = companys;
    this.company = null;
    this.displayDialog = false;
  }

  delete() {
    if (this.company.key) {
      this.companyService.deletecompany(this.selectedCompany.key).then(()=>{
        this.showMessage(true, `${this.company.name} ha sido eliminado!`);
      }).catch((e)=>{
        this.showMessage(false, `${e}`);
      });

    }
    this.displayDialog = false;
  }
  onRowSelect(event) {
    this.newCompany = false;
    this.company = this.cloneCompany(event.data);
    this.selectedCompany = this.company;
    this.displayDialog = true;
  }

  cloneCompany(c: Company): Company {
    let company = {};
    for (let prop in c) {
        company[prop] = c[prop];
    }
    return company;
  }

  isBoolean(val) {
    return typeof val === 'boolean';
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  showMessage(status: boolean, detail: string) {
    if (status) {
      this.messageService.add({ severity: 'info', summary: 'Success', detail: detail });
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: detail });
    }
  }

}
