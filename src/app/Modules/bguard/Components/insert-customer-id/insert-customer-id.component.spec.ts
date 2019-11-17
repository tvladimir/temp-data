import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertCustomerIdComponent } from './insert-customer-id.component';

describe('InsertCustomerIdComponent', () => {
  let component: InsertCustomerIdComponent;
  let fixture: ComponentFixture<InsertCustomerIdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsertCustomerIdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertCustomerIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
