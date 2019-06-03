import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WhoursComponent } from './whours.component';

describe('WhoursComponent', () => {
  let component: WhoursComponent;
  let fixture: ComponentFixture<WhoursComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WhoursComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WhoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
