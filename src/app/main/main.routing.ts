import { Routes } from '@angular/router';
import { PlantsComponent } from './plants/plants.component';
import { EquipmentsComponent } from './equipments/equipments.component';
import { SpeciesComponent } from './species/species.component';
import { BdaysComponent } from './bdays/bdays.component';
import { WhoursComponent } from './whours/whours.component';
import { UsersComponent } from './users/users.component';
import { RecordsComponent } from './records/records.component';
import { ReservationsComponent } from './reservations/reservations.component';
import { CompanysComponent } from './companys/companys.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const MainRoutes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

  {
    path: 'dashboard',
    component: DashboardComponent,
    data: {
      title: 'Dashboard',
      urls: [{ title: 'Dashboard', url: '/dashboard' }, { title: 'Dashboard' }]
    }
  },
  {
    path: 'plants',
    component: PlantsComponent,
    data: {
      title: 'Plantas',
      urls: [{ title: 'Dashboard', url: '/dashboard' }, { title: 'Plantas' }]
    }
  },
  {
    path: 'equips',
    component: EquipmentsComponent,
    data: {
      title: 'Equipos',
      urls: [{ title: 'Dashboard', url: '/dashboard' }, { title: 'Equipos' }]
    }
  },
  {
    path: 'company',
    component: CompanysComponent,
    data: {
      title: 'Empresas',
      urls: [{ title: 'Dashboard', url: '/dashboard' }, { title: 'Empresas' }]
    }
  },
  {
    path: 'species',
    component: SpeciesComponent,
    data: {
      title: 'Productos',
      urls: [{ title: 'Dashboard', url: '/dashboard' }, { title: 'Productos' }]
    }
  },
  {
    path: 'business-days',
    component: BdaysComponent,
    data: {
      title: 'Días Habiles',
      urls: [{ title: 'Dashboard', url: '/dashboard' }, { title: 'Días-habiles' }]
    }
  },
  {
    path: 'working-hours',
    component: WhoursComponent,
    data: {
      title: 'Horas Laborales',
      urls: [{ title: 'Dashboard', url: '/dashboard' }, { title: 'Horas-laborales' }]
    }
  },
  {
    path: 'users',
    component: UsersComponent,
    data: {
      title: 'Usuarios',
      urls: [{ title: 'Dashboard', url: '/dashboard' }, { title: 'Usuarios' }]
    }
  },
  {
    path: 'records',
    component: RecordsComponent,
    data: {
      title: 'Registros',
      urls: [{ title: 'Dashboard', url: '/dashboard' }, { title: 'Registros' }]
    }
  },
  {
    path: 'reservations',
    component: ReservationsComponent,
    data: {
      title: 'Reservas',
      urls: [{ title: 'Dashboard', url: '/dashboard' }, { title: 'Reservas' }]
    }
  }


]
