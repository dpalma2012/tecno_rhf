import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BdaysCrudComponent } from './bdays-crud.component';

describe('BdaysCrudComponent', () => {
  let component: BdaysCrudComponent;
  let fixture: ComponentFixture<BdaysCrudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BdaysCrudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BdaysCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
