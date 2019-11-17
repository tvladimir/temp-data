import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertPaymentNumbersComponent } from './insert-payment-numbers.component';

describe('InsertPaymentNumbersComponent', () => {
  let component: InsertPaymentNumbersComponent;
  let fixture: ComponentFixture<InsertPaymentNumbersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsertPaymentNumbersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertPaymentNumbersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
