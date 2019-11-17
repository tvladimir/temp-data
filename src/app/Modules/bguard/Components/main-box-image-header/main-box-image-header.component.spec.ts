import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainBoxImageHeaderComponent } from './main-box-image-header.component';

describe('MainBoxImageHeaderComponent', () => {
  let component: MainBoxImageHeaderComponent;
  let fixture: ComponentFixture<MainBoxImageHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainBoxImageHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainBoxImageHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
