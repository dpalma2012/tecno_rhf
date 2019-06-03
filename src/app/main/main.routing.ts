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
         title: 'Plantas',
         urls: [{title: 'Dashboard',url: '/dashboard'},{title: 'plantas'}]
       }
    },
    {
        path:'equips',
        component: EquipmentsComponent,
        data: {
         title: 'Equipos',
         urls: [{title: 'Dashboard',url: '/dashboard'},{title: 'equipos'}]
       }
    },
    {
        path:'species',
        component: SpeciesComponent,
        data: {
         title: 'Productos',
         urls: [{title: 'Dashboard',url: '/dashboard'},{title: 'productos'}]
       }
    },
    {
        path:'business-days',
        component: BdaysComponent,
        data: {
         title: 'Días Habiles',
         urls: [{title: 'Dashboard',url: '/dashboard'},{title: 'días-habiles'}]
       }
    },
    {
        path:'working-hours',
        component: WhoursComponent,
        data: {
         title: 'Horas Laborales',
         urls: [{title: 'Dashboard',url: '/dashboard'},{title: 'horas-laborales'}]
       }
    },
    {
        path:'users',
        component: UsersComponent,
        data: {
         title: 'Usuarios',
         urls: [{title: 'Dashboard',url: '/dashboard'},{title: 'usuarios'}]
       }
    },
    {
        path:'records',
        component: RecordsComponent,
        data: {
         title: 'Registros',
         urls: [{title: 'Dashboard',url: '/dashboard'},{title: 'Registros'}]
       }
    },
    {
        path:'reservations',
        component: ReservationsComponent,
        data: {
         title: 'Reservas',
         urls: [{title: 'Dashboard',url: '/dashboard'},{title: 'reservas'}]
       }
    }


]
