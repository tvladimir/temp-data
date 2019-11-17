import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertPhoneNumberPageComponent } from './insert-phone-number-page.component';

describe('InsertPhoneNumberPageComponent', () => {
  let component: InsertPhoneNumberPageComponent;
  let fixture: ComponentFixture<InsertPhoneNumberPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsertPhoneNumberPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertPhoneNumberPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
