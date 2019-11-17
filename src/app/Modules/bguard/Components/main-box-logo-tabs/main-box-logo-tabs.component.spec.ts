import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainBoxLogoTabsComponent } from './main-box-logo-tabs.component';

describe('MainBoxLogoTabsComponent', () => {
  let component: MainBoxLogoTabsComponent;
  let fixture: ComponentFixture<MainBoxLogoTabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainBoxLogoTabsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainBoxLogoTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
