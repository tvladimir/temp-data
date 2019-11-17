import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdentityTabsPageComponent } from './identity-tabs-page.component';

describe('IdentityTabsPageComponent', () => {
  let component: IdentityTabsPageComponent;
  let fixture: ComponentFixture<IdentityTabsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IdentityTabsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdentityTabsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
