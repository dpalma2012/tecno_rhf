import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-plants',
  templateUrl: './plants.component.html',
  styleUrls: ['./plants.component.css']
})
export class PlantsComponent implements OnInit, AfterViewInit {
  
  subtitle:string;
  constructor() { 
    this.subtitle = "This is some text within a card block."
  }

  ngOnInit() {
  }

  ngAfterViewInit(){}

}
