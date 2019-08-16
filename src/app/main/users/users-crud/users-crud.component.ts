import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '../../m-models/User';
import { UserType } from '../../m-models/UserType';
import { UsersService } from '../../m-services/users.service';

import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { CompanyService } from '../../m-services/company.service';
import { Company } from '../../m-models/Company';

@Component({
  selector: 'app-users-crud',
  templateUrl: './users-crud.component.html',
  styleUrls: ['./users-crud.component.css'],
  providers: [MessageService]
})


export class UsersCrudComponent implements OnInit, OnDestroy {

  private unsubscribe: Subject<void> = new Subject();

  userForm: FormGroup;

  displayDialog: boolean;

  userTypes: UserType[];

  user: User = {};

  selectedUser: User;

  newUser: boolean;

  users: User[];

  cols: any[];

  secure: boolean;

  companys: any[] = [];

  constructor(private userService: UsersService, private fb: FormBuilder, private messageService: MessageService, private companyService: CompanyService) { }

  ngOnInit() {
    this.userTypes = [{
      label: 'User', type: 'user'
    }, {
      label: 'Admin', type: 'admin'
    }
    ];

    this.companyService.getcompanys().subscribe((companys) => {
      /* this.companys = companys; */
      console.log(companys);

      let data = [];
      companys.forEach(company => {
        console.log(company.name);
        data.push({
          label: company.name, type: company.name
        });
      });
      this.companys = data;
    });

    this.secure = true;
    this.userForm = this.fb.group({
      'name': new FormControl('', Validators.compose([Validators.required, Validators.pattern(".*\\S.*[a-zA-z0-9 ]")])),
      'email': new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
      'password': new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)])),
      'phone': new FormControl('', Validators.required),
      'rut': new FormControl('', Validators.required),
      'type': new FormControl(this.userTypes[0]),
      'company': new FormControl('', Validators.required)
    })
    this.userService.getUsers().pipe(takeUntil(this.unsubscribe)).subscribe(users => {
      this.users = users;
    });

    this.cols = [
      { field: 'name', header: 'Nombre' },
      { field: 'email', header: 'Email' },
      { field: 'password', header: 'Contraseña' },
      { field: 'phone', header: 'Telefono' },
      { field: 'rut', header: 'Rut' },
      { field: 'type', header: 'Tipo' },
      { field: 'company', header: 'Empresa' },
    ];

  }

  showDialogToAdd() {
    this.userForm.reset();
    this.userForm.controls['type'].patchValue(this.userTypes[0]);


    this.newUser = true;
    this.user = { type: this.userTypes[0] };
    this.displayDialog = true;
    this.secure = true;

  }

  save() {
    let users = [...this.users];
    let userEmails = users.map(c => ({ key: c.key, email: c.email }));
    this.user.email = this.user.email.trim();
    let exists = userEmails.filter(item => item.email.toLowerCase() === this.user.email.toLowerCase());


    this.user.company = this.user.company.type;

    console.log(this.user);

    if (this.newUser) {
      if (exists.length === 0) {
        this.userService.newUser(this.user);
        this.showMessage(true, `${this.user.name} ha sido registrado!`);
      } else {
        this.showMessage(false, `${this.user.name} email esta duplicado!`);
        return null;
      }

    }
    else {
      if (exists.length === 0 || (exists.length === 1 && exists[0].key === this.user.key)) {
        this.userService.updateUser(this.user.key, this.user);
        this.showMessage(true, `${this.user.name} ha sido actualizado!`);
      } else {
        this.showMessage(false, `${this.user.name} email esta duplicado!`);
        return null;
      }
    }

    this.users = users;
    this.user = null;
    this.displayDialog = false;
  }

  delete() {
    if (this.user.key) {
      this.userService.deleteUser(this.selectedUser.key).then(() => {
        this.showMessage(true, `${this.selectedUser.name} ha sido eliminado.`);
      }).catch((e) => {
        this.showMessage(false, `${e}`);
      });
    }
    this.displayDialog = false;
  }

  onRowSelect(event) {
    this.newUser = false;
    this.user = this.cloneUser(event.data);
    console.log('Company', this.user.company);

    this.displayDialog = true;
    this.secure = true;

    this.user.company = {
      label: this.user.company,
      type: this.user.company
    }


  }

  cloneUser(c: User): User {
    let user = {};
    for (let prop in c) {
      user[prop] = c[prop];
    }
    return user;
  }

  generatePass() {
    this.user.password = Math.random().toString(36).slice(-8);
    this.userForm.controls['password'].patchValue(this.user.password);
  }

  togglePass() {
    this.secure = !this.secure;
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
