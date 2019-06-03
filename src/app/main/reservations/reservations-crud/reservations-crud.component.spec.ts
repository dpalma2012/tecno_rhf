import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationsCrudComponent } from './reservations-crud.component';

describe('ReservationsCrudComponent', () => {
  let component: ReservationsCrudComponent;
  let fixture: ComponentFixture<ReservationsCrudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReservationsCrudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationsCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
