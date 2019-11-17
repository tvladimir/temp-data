import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertSmsCodePageComponent } from './insert-sms-code-page.component';

describe('InsertSmsCodePageComponent', () => {
  let component: InsertSmsCodePageComponent;
  let fixture: ComponentFixture<InsertSmsCodePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsertSmsCodePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertSmsCodePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
