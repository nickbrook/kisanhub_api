import { Component, OnInit, OnChanges, Input, ElementRef, ViewChild } from '@angular/core';
import {ApiService, TimestampValue} from "../api.service";
import { Layout, ScatterData} from 'plotly.js';
import * as Plotly from 'plotly.js';
import * as _ from 'lodash';

@Component({
  selector: 'app-temperature-charts',
  templateUrl: './temperature-charts.component.html',
  styleUrls: ['./temperature-charts.component.scss']
})
export class TemperatureChartsComponent implements OnChanges {
  @Input() location: string;
  @ViewChild('chart') chart_el: ElementRef;

  fetching: boolean;

  constructor(private api: ApiService) { }

  ngOnChanges() {
    // update the graph
    this.redrawChart();
  }


  private redrawChart() {
    this.fetching = true;
    // TODO fetch all temp metrics in parallel
    const metric = "Tmean";
    this.api.getTimeSeries(this.location, metric).subscribe(
      data => {
        this.fetching = false;
        const lineChartData = <ScatterData> {
            type: 'scatter',
            mode: 'lines',
            name: metric,
            x: _.map(data, 'date'),
            y: _.map(data, 'value'),
            line: { color: '#17BECF'}
        };
        // TODO refactor this layout into a service?
        const layout = <Layout> {
            title: metric+' '+this.location+" timeseries",
            xaxis: {
                autorange: true,
                rangeselector: {buttons: [
                        {
                            count: 1,
                            label: '1 yr',
                            step: 'year',
                            stepmode: 'backward'
                        },
                        {
                            count: 10,
                            label: '10 yr',
                            step: 'year',
                            stepmode: 'backward'
                        },
                        {step: 'all'}
                    ]},
                rangeslider: { range: ['1990-01-01', '2018-01-01']},
                type: 'date'
            }
        };

        Plotly.newPlot(this.chart_el.nativeElement, [lineChartData], layout);
      }
    );


  }

}
