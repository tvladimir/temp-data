import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BguardLayoutComponent } from './bguard-layout.component';

describe('BguardLayoutComponent', () => {
  let component: BguardLayoutComponent;
  let fixture: ComponentFixture<BguardLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BguardLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BguardLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
