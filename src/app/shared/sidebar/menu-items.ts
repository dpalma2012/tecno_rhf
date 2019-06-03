import { RouteInfo } from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [
    {
        path: '', title: 'Menu', icon: '', class: 'nav-small-cap', label: '', labelClass: '', extralink: true, submenu: []
    },
    {
        path: '/main/plants', title: 'Plants', icon: 'mdi mdi-factory', class: '', label: '', labelClass: '', extralink: false, submenu: []
    },
    {
        path: '/main/equips', title: 'Equipments', icon: 'mdi mdi-bullseye', class: '', label: '', labelClass: '', extralink: false, submenu: []
    },
    {
        path: '/main/species', title: 'Species', icon: 'mdi mdi-format-list-bulleted', class: '', label: '', labelClass: '', extralink: false, submenu: []
    },
    {
        path: '/main/business-days', title: 'Business Days', icon: 'mdi mdi-calendar-today', class: '', label: '', labelClass: '', extralink: false, submenu: []
    },
    {
        path: '/main/working-hours', title: 'Working Hours', icon: 'mdi mdi-timelapse', class: '', label: '', labelClass: '', extralink: false, submenu: []
    },
    {
        path: '/main/users', title: 'Users', icon: 'mdi mdi-face', class: '', label: '', labelClass: '', extralink: false, submenu: []
    },
    {
        path: '/main/records', title: 'Records', icon: 'mdi mdi-record', class: '', label: '', labelClass: '', extralink: false, submenu: []
    },
    {
        path: '/main/reservations', title: 'Reservations', icon: 'mdi mdi-bookmark', class: '', label: '', labelClass: '', extralink: false, submenu: []
    },
         
];

