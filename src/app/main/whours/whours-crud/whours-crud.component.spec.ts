import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WhoursCrudComponent } from './whours-crud.component';

describe('WhoursCrudComponent', () => {
  let component: WhoursCrudComponent;
  let fixture: ComponentFixture<WhoursCrudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WhoursCrudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WhoursCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
