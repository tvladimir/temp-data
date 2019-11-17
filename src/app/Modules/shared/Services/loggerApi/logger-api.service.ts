import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoggerApiService {

  constructor(
    private httpClient: HttpClient) { }

  sendHttpLog(logData: any) {
    logData = {
      ...logData,
      ...environment.loggerApiData.general,
    };
    this.httpClient.post(environment.loggerApiUrl, logData).subscribe((res) => {
      // console.log(res);
    }, (err) => {
      console.error(err);
    });
  }

  sendEventLog(logData: any) {
    logData = {
      ...logData,
      ...environment.loggerApiData.general,
      ...environment.loggerApiData.events
    }
    this.httpClient.post(environment.loggerApiUrl, logData).subscribe((res) => {
      // console.log(res);
    }, (err) => {
      console.error(err);
    });
  }
}
