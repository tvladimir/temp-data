import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResendSmsRegisteredPageComponent } from './resend-sms-registered-page.component';

describe('ResendSmsRegisteredPageComponent', () => {
  let component: ResendSmsRegisteredPageComponent;
  let fixture: ComponentFixture<ResendSmsRegisteredPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResendSmsRegisteredPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResendSmsRegisteredPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
