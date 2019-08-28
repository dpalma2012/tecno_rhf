import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { SpecieService } from '../../m-services/specie.service';
import { ReservationService } from '../../m-services/reservation.service';
import * as moment from 'moment';
import { CalendarEvent } from 'calendar-utils';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
} from 'date-fns';
@Component({
  selector: 'app-dashboard-crud',
  templateUrl: './dashboard-crud.component.html',
  styleUrls: ['./dashboard-crud.component.css'],
  providers: [MessageService]

})
export class DashboardCrudComponent implements OnInit {

  especies: any[] = [];
  myDate = new Date();
  selectedEspecie;
  horas: any[] = [];

  viewDate: Date = new Date();

  events: CalendarEvent[] = [];

  constructor(private specieService: SpecieService, private reservationService: ReservationService) { }

  ngOnInit() {

    this.specieService.getSpecies().subscribe((data) => {
      if (data === null) { return null }
      console.log(data);
      this.especies = data.map(p => ({
        key: p.key,
        name: p.name
      }));
      this.selectedEspecie = this.especies[0];
      this.change();
    });
  }

  change() {

    let date = moment().set({ hour: 0, minute: 0, second: 0 }).unix() * 1000;
    this.reservationService.getReservationsPerSId(this.selectedEspecie.key).subscribe((data: any) => {

      this.horas = [];
      this.events = [];

      data.sort(this.compare);

      data.forEach(element => {

        if (element.date == date) {

          this.horas.push(element);

          let fecha = new Date(element.date);

          fecha.setHours(element.time_hour, element.time_minute);

          console.log(fecha);

          let fecha2 = new Date(element.date);
          fecha2.setHours(element.time_hour, element.time_minute);
          let myTimeSpan = (element.stepTime-1)*60*1000;
          fecha2.setTime(fecha2.getTime() + myTimeSpan);

          console.log(fecha2);

          this.events = [
            ...this.events,
            {
              start: fecha,
              end: fecha2,
              title: `<h6>Patente:${element.patentTruck}</h6><h6>Hora:  <span class="badge badge-primary font-16"> ${element.time_hour}:${element.time_minute}</span></h6><h6>Empresa: ${element.company}</h6>`,
              color: {
                primary: 'rgba(0,0,0,0.125)',
                secondary: '#b9f4e3'
              }
            }
          ];
        }

      });

    });
  }


  compare(a, b) {
    if (a.time_hour < b.time_hour) {
      return -1;
    }
    if (a.time_hour > b.time_hour) {
      return 1;
    }
    return 0;
  }





}
