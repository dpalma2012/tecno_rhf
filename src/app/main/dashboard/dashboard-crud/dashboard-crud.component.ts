import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { SpecieService } from '../../m-services/specie.service';
import { ReservationService } from '../../m-services/reservation.service';
import * as moment from 'moment';

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

      data.sort(this.compare);

      data.forEach(element => {

        if (element.date == date) {
          console.log(element);
          this.horas.push(element);
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
