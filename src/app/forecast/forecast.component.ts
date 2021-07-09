import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ForecastService } from './forecast.service';

@Component({
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css'],
})
export class ForecastComponent implements OnInit {
  @Input() zipcode = '';
  forecast: any;
  errorMessage: string = '';

  constructor(
    private forecastService: ForecastService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.zipcode = String(this.route.snapshot.paramMap.get('zipcode'));

    this.forecast = this.forecastService.getForecast(this.zipcode).subscribe({
        next: forecast => {this.forecast = forecast
        console.log(this.forecast)},
        error: err => this.errorMessage = err
    });
  }
}
