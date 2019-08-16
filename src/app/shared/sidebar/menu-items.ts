import { RouteInfo } from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [
  {
    path: '', title: 'Menu', icon: '', class: 'nav-small-cap', label: '', labelClass: '', extralink: true, submenu: []
  },
  {
    path: '/main/plants', title: 'Plantas', icon: 'mdi mdi-factory', class: '', label: '', labelClass: '', extralink: false, submenu: []
  },
  {
    path: '/main/equips', title: 'Equipos', icon: 'mdi mdi-bullseye', class: '', label: '', labelClass: '', extralink: false, submenu: []
  },
  {
    path: '/main/company', title: 'Empresas', icon: 'mdi mdi-city', class: '', label: '', labelClass: '', extralink: false, submenu: []
  },
  {
    path: '/main/species', title: 'Productos', icon: 'mdi mdi-format-list-bulleted', class: '', label: '', labelClass: '', extralink: false, submenu: []
  },
  {
    path: '/main/business-days', title: 'Días Habiles', icon: 'mdi mdi-calendar-today', class: '', label: '', labelClass: '', extralink: false, submenu: []
  },
  {
    path: '/main/working-hours', title: 'Horas Laborales', icon: 'mdi mdi-timelapse', class: '', label: '', labelClass: '', extralink: false, submenu: []
  },
  {
    path: '/main/users', title: 'Usuarios', icon: 'mdi mdi-face', class: '', label: '', labelClass: '', extralink: false, submenu: []
  },
  {
    path: '/main/records', title: 'Registros', icon: 'mdi mdi-record', class: '', label: '', labelClass: '', extralink: false, submenu: []
  },
  {
    path: '/main/reservations', title: 'Reservas', icon: 'mdi mdi-bookmark', class: '', label: '', labelClass: '', extralink: false, submenu: []
  },

];

