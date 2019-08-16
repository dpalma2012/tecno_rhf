import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FullComponent } from './layouts/full/full.component';

import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './components/login/login.component';

export const Approutes: Routes = [
  {
    path: '',
    component: FullComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'main', pathMatch: 'full' },
      { path: 'main', loadChildren: './main/main.module#MainModule' },
    ]
  },

  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '**',
    redirectTo: '/main'
  }];


