import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeciesCrudComponent } from './species-crud.component';

describe('SpeciesCrudComponent', () => {
  let component: SpeciesCrudComponent;
  let fixture: ComponentFixture<SpeciesCrudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpeciesCrudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeciesCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
