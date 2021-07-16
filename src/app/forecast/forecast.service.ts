import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators"

@Injectable({
    providedIn: 'root'
})
export class ForecastService {
    private openWeatherUrl = 'https://api.openweathermap.org/data/2.5/weather?zip=';
    private openWeatherApiKey = '&appid=08895c9f36a4c1ddfb0e22522727e31a&units=imperial';

    constructor(private http: HttpClient) {}

    getForecast(zipcode: string): Observable<any>{
        return this.http.get<any>(this.openWeatherUrl + zipcode + this.openWeatherApiKey).pipe(
            tap(data => console.log('All: ', JSON.stringify(data))),
            catchError(this.handleError)
        );
    }

    private handleError(err: HttpErrorResponse) {
        let errorMessage = '';
        if (err.error instanceof ErrorEvent) {
            errorMessage = `An error occured: ${err.error.message}`;
        } else {
            errorMessage = `Server returned code: ${err.status}, error message is ${err.message}`;
        }
        return throwError(errorMessage);
    }
}