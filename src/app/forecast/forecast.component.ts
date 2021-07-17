import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ForecastService } from './forecast.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css'],
})
export class ForecastComponent implements OnInit {
  @Input() zipcode = '';
  forecast: any;
  forecastDate = new Date();
  forecastImage = '';
  forecastSunrise = new Date(); 
  forecastSunset = new Date();
  errorFound = false;
  



  constructor(
    private forecastService: ForecastService,
    private route: ActivatedRoute,
    public domSanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.zipcode = String(this.route.snapshot.paramMap.get('zipcode'));

    this.forecast = this.forecastService.getForecast(this.zipcode).subscribe({
        next: forecast => {
        this.forecast = forecast;
        this.forecastImage = ' http://openweathermap.org/img/wn/' + forecast.weather[0].icon + '@2x.png';
        this.forecastSunrise = new Date(forecast.sys.sunrise * 1000 - forecast.timezone);
        this.forecastSunset = new Date(forecast.sys.sunset * 1000 - forecast.timezone); 
        this.errorFound = false; 
      },
        error: err => {
          this.errorFound = true;
        }
    });

    
  }
}
