import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertIdPageComponent } from './insert-id-page.component';

describe('InsertIdPageComponent', () => {
  let component: InsertIdPageComponent;
  let fixture: ComponentFixture<InsertIdPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsertIdPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertIdPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
