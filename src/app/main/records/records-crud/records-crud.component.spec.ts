import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordsCrudComponent } from './records-crud.component';

describe('RecordsCrudComponent', () => {
  let component: RecordsCrudComponent;
  let fixture: ComponentFixture<RecordsCrudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecordsCrudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordsCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
