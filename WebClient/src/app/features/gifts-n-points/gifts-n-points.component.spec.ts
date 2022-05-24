import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GiftsNPointsComponent } from './gifts-n-points.component';

describe('GiftsNPointsComponent', () => {
  let component: GiftsNPointsComponent;
  let fixture: ComponentFixture<GiftsNPointsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GiftsNPointsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GiftsNPointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
