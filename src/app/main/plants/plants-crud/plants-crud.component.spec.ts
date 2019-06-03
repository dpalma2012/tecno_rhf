import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantsCrudComponent } from './plants-crud.component';

describe('PlantsCrudComponent', () => {
  let component: PlantsCrudComponent;
  let fixture: ComponentFixture<PlantsCrudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlantsCrudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantsCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
