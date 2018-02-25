import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MaterialModule} from './material/material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import { LineChartComponent } from './line-chart/line-chart.component';
import {ApiService} from "./api.service";
import { TemperatureChartsComponent } from './temperature-charts/temperature-charts.component';


@NgModule({
  declarations: [
    AppComponent,
    LineChartComponent,
    TemperatureChartsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule
  ],
  providers: [
    ApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
