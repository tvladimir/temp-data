import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendSmsIdentityCodeComponent } from './send-sms-identity-code.component';

describe('SendSmsIdentityCodeComponent', () => {
  let component: SendSmsIdentityCodeComponent;
  let fixture: ComponentFixture<SendSmsIdentityCodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendSmsIdentityCodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendSmsIdentityCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
