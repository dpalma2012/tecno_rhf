import { Routes } from '@angular/router';
import { PlantsComponent } from './plants/plants.component';
import { EquipmentsComponent} from './equipments/equipments.component';
import { SpeciesComponent} from './species/species.component';
import { BdaysComponent} from './bdays/bdays.component';
import { WhoursComponent } from './whours/whours.component';
import { UsersComponent } from './users/users.component';
import { RecordsComponent} from './records/records.component';
import { ReservationsComponent} from './reservations/reservations.component';

export const MainRoutes: Routes = [
    { path: '', redirectTo: 'plants', pathMatch: 'full' },
    {
        path:'plants',
        component: PlantsComponent,
        data: {
         title: 'Plants',
         urls: [{title: 'Dashboard',url: '/dashboard'},{title: 'plants'}]
       } 
    },
    {
        path:'equips',
        component: EquipmentsComponent,
        data: {
         title: 'Equipments',
         urls: [{title: 'Dashboard',url: '/dashboard'},{title: 'equipments'}]
       } 
    },
    {
        path:'species',
        component: SpeciesComponent,
        data: {
         title: 'Species',
         urls: [{title: 'Dashboard',url: '/dashboard'},{title: 'species'}]
       } 
    },
    {
        path:'business-days',
        component: BdaysComponent,
        data: {
         title: 'Business Days',
         urls: [{title: 'Dashboard',url: '/dashboard'},{title: 'business-days'}]
       } 
    },
    {
        path:'working-hours',
        component: WhoursComponent,
        data: {
         title: 'Working hours',
         urls: [{title: 'Dashboard',url: '/dashboard'},{title: 'working-hours'}]
       } 
    },
    {
        path:'users',
        component: UsersComponent,
        data: {
         title: 'Users',
         urls: [{title: 'Dashboard',url: '/dashboard'},{title: 'users'}]
       } 
    },
    {
        path:'records',
        component: RecordsComponent,
        data: {
         title: 'Records',
         urls: [{title: 'Dashboard',url: '/dashboard'},{title: 'records'}]
       } 
    },
    {
        path:'reservations',
        component: ReservationsComponent,
        data: {
         title: 'Reservations',
         urls: [{title: 'Dashboard',url: '/dashboard'},{title: 'reservations'}]
       } 
    }
    
    
]