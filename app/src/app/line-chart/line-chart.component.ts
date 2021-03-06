import { Component, OnInit, OnChanges, Input, ElementRef, ViewChild } from '@angular/core';
import {ApiService, TimestampValue} from "../api.service";
import { Layout, ScatterData} from 'plotly.js';
import * as Plotly from 'plotly.js';
import * as _ from 'lodash';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnChanges {

  @Input() metric: string;
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
    this.api.getTimeSeries(this.location, this.metric).subscribe(
      data => {
        this.fetching = false;
        let lineChartData = <ScatterData> {
            type: 'scatter',
            mode: 'lines',
            name: this.metric,
            x: _.map(data, 'date'),
            y: _.map(data, 'value'),
            line: { color: '#17BECF'}
        };
        let layout = <Layout> {
            title: this.metric+' '+this.location+" timeseries",
            xaxis: {
                // autorange: true,
                range: ['1990-01-01', '2018-01-01'],
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
                type: 'date'
            }
        };

        Plotly.newPlot(this.chart_el.nativeElement, [lineChartData], layout);
      }
    );


  }

}
