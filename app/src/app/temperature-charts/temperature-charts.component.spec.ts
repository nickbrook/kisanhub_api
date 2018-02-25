import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemperatureChartsComponent } from './temperature-charts.component';

describe('TemperatureChartsComponent', () => {
  let component: TemperatureChartsComponent;
  let fixture: ComponentFixture<TemperatureChartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemperatureChartsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemperatureChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
