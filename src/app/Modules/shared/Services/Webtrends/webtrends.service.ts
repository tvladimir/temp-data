import { Injectable } from '@angular/core';
import { WindowService } from '../window/window.service';
import { WebTrendsObject } from '../../Models/WebTrendsObject';
import { LoggerApiService } from '../loggerApi/logger-api.service';

declare var WebTrends: any;

@Injectable({
  providedIn: 'root'
})
export class WebtrendsService {

  private _tag: any;

  constructor(private windowService: WindowService, private loggerApiService: LoggerApiService) {
    // var _tag = this._tag;
    const _webTrendsLoaded = (typeof WebTrends !== 'undefined');
    if (_webTrendsLoaded) {
      if (!this._tag) {
        this._tag = new WebTrends();
        this._tag.dcsGetId();
        this._tag.dcsCollect();
        window['_tag'] = this._tag;
        // _tag = this._tag;
      }
    }
  }


  reportWT(data: WebTrendsObject) {
    this._tag.dcsVar();
    const _webTrendsLoaded = (typeof WebTrends !== 'undefined');

    if (_webTrendsLoaded) {

      data.channel = this.windowService.isMobile() ? 'Mobile' : 'Web';
      data.setDateTime();

      const reportList = [];

      for (const key in data) {
        if (data.hasOwnProperty(key) && data[key] != null) {
          reportList.push('"WT.' + key + '"', '"' + stripHtml(data[key]) + '"');
        }
      }

      const reportString = reportList.join(',');

      const script = 'dcsMultiTrack(' + reportString + ')';

      eval(script);

      this.loggerApiService.sendEventLog(data);

    }
    function stripHtml(html) {
      const tmp = document.createElement('DIV');
      tmp.innerHTML = html;
      return tmp.textContent || tmp.innerText || '';
    }
  }
}
