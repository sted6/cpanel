import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAccountEventComponent } from './new-account-event.component';

describe('NewAccountEventComponent', () => {
  let component: NewAccountEventComponent;
  let fixture: ComponentFixture<NewAccountEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewAccountEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewAccountEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
