import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BezeqLoaderComponent } from './bezeq-loader.component';

describe('BezeqLoaderComponent', () => {
  let component: BezeqLoaderComponent;
  let fixture: ComponentFixture<BezeqLoaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BezeqLoaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BezeqLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
