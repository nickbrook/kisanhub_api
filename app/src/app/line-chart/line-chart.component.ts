import { Component, OnInit, OnChanges, Input, ElementRef, ViewChild } from '@angular/core';
import {ApiService, TimestampValue} from "../api.service";
import {Config, Data, Layout, ScatterData} from 'plotly.js';
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
  results: TimestampValue[];

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
        const lineChartData = <ScatterData> {
            type: 'scatter',
            mode: 'lines',
            name: 'Signal',
            x: _.map(data, 'date'),
            y: _.map(data, 'value'),
            line: { color: '#17BECF'}
        };
        const layout = <Layout> {
            title: 'Signal vs Target',
            xaxis: {
                autorange: true,
                rangeselector: {buttons: [
                        {
                            count: 1,
                            label: '1m',
                            step: 'month',
                            stepmode: 'backward'
                        },
                        {
                            count: 6,
                            label: '6m',
                            step: 'month',
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
