import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JsonpModule } from '@angular/Http';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { environment } from '../../environments/environment';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { MainRoutes } from './main.routing';

import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { InputMaskModule } from 'primeng/inputmask';
import { GrowlModule } from 'primeng/growl';
import { ToastModule } from 'primeng/toast';
import { MessageModule } from 'primeng/message';
import { CalendarModule } from 'primeng/calendar';
import { MultipleDatePickerModule } from '../libs/multiple-date-picker-angular/multiple-date-picker.module';
import { MultiSelectModule } from 'primeng/multiselect';


import { PlantsComponent } from './plants/plants.component';
import { PlantsCrudComponent } from './plants/plants-crud/plants-crud.component';
import { EquipmentsComponent } from './equipments/equipments.component';
import { EquipmentsCrudComponent } from './equipments/equipments-crud/equipments-crud.component';
import { SpeciesComponent } from './species/species.component';
import { SpeciesCrudComponent } from './species/species-crud/species-crud.component';
import { BdaysComponent } from './bdays/bdays.component';
import { BdaysCrudComponent } from './bdays/bdays-crud/bdays-crud.component';
import { UsersComponent } from './users/users.component';
import { UsersCrudComponent } from './users/users-crud/users-crud.component';
import { WhoursComponent } from './whours/whours.component';
import { WhoursCrudComponent } from './whours/whours-crud/whours-crud.component';
import { RecordsComponent } from './records/records.component';
import { RecordsCrudComponent } from './records/records-crud/records-crud.component';
import { ReservationsComponent } from './reservations/reservations.component';
import { ReservationsCrudComponent } from './reservations/reservations-crud/reservations-crud.component';

import { PlantService } from './m-services/plant.service';
import { SpecieService } from './m-services/specie.service';
import { UsersService } from './m-services/users.service';
import { EquipmentService } from './m-services/equipment.service';
import { BdayService } from './m-services/bday.service';
import { WhourService } from './m-services/whour.service';
import { RecordService } from './m-services/record.service';
import { ReservationService } from './m-services/reservation.service';
import { CompanysComponent } from './companys/companys.component';
import { CompanysCrudComponent } from './companys/companys-crud/companys-crud.component';
import { CompanyService } from './m-services/company.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardCrudComponent } from './dashboard/dashboard-crud/dashboard-crud.component';





@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(MainRoutes),
    FormsModule,
    ReactiveFormsModule,
    JsonpModule,
    NgbModule,
    TableModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    CheckboxModule,
    DropdownModule,
    InputMaskModule,
    MultipleDatePickerModule,
    GrowlModule,
    MessageModule,
    ToastModule,
    CalendarModule,
    MultiSelectModule
  ],
  declarations: [
    PlantsComponent,
    PlantsCrudComponent,
    EquipmentsComponent,
    EquipmentsCrudComponent,
    SpeciesComponent,
    UsersComponent,
    SpeciesCrudComponent,
    UsersCrudComponent,
    BdaysComponent,
    BdaysCrudComponent,
    WhoursComponent,
    WhoursCrudComponent,
    RecordsComponent,
    RecordsCrudComponent,
    ReservationsComponent,
    ReservationsCrudComponent,
    CompanysComponent,
    CompanysCrudComponent,
    DashboardComponent,
    DashboardCrudComponent
  ],
  providers: [
    AngularFireDatabase,
    AngularFireDatabaseModule,
    PlantService,
    EquipmentService,
    SpecieService,
    UsersService,
    BdayService,
    WhourService,
    RecordService,
    ReservationService,
    CompanyService
  ],
})
export class MainModule { }
