import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertMailAndPhonePageComponent } from './insert-mail-and-phone-page.component';

describe('InsertMailAndPhonePageComponent', () => {
  let component: InsertMailAndPhonePageComponent;
  let fixture: ComponentFixture<InsertMailAndPhonePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsertMailAndPhonePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertMailAndPhonePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
