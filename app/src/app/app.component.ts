import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  location: string;
  metric: string;

  ngOnInit(): void {
    this.location = 'UK';
    this.metric = 'Tmean';
  }
}
