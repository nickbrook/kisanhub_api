import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';
import * as _ from 'lodash';

export interface TimestampValue {
    date: Date;
    value: number;
}

@Injectable()
export class ApiService {

  private baseUrl = "http://localhost:8000/weather/";

  constructor(private http: HttpClient) { }

  getTimeSeries(location: string, metric: string): Observable<TimestampValue[]> {
    return this.http
      .get<TimestampValue[]>(`${this.baseUrl}/timeseries/${location}/${metric}/`)
            .pipe(
                map(result => {
                  return _.map(result, (tsitem: any) => {
                      return {
                        date: new Date(tsitem.year, tsitem.month),
                        value: tsitem.value
                      }
                  });
                })
            );
  }
}
