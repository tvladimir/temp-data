import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainBoxLogoComponent } from './main-box-logo.component';

describe('MainBoxLogoComponent', () => {
  let component: MainBoxLogoComponent;
  let fixture: ComponentFixture<MainBoxLogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainBoxLogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainBoxLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
