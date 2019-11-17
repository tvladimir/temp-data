import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertCustomerNumberPageComponent } from './insert-customer-number-page.component';

describe('InsertCustomerNumberPageComponent', () => {
  let component: InsertCustomerNumberPageComponent;
  let fixture: ComponentFixture<InsertCustomerNumberPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsertCustomerNumberPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertCustomerNumberPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
