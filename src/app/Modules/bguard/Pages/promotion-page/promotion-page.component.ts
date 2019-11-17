import { Component, OnInit, HostBinding } from '@angular/core';
import { scaleInOutAnimation } from '../../animations/route.animation';
import { WebtrendsService } from 'src/app/Modules/shared/Services/Webtrends/webtrends.service';
import { WebTrendsObject } from 'src/app/Modules/shared/Models/WebTrendsObject';

@Component({
  selector: 'bz-promotion-page',
  templateUrl: './promotion-page.component.html',
  styleUrls: ['./promotion-page.component.scss'],
  animations: [
    scaleInOutAnimation
  ]
})
export class PromotionPageComponent implements OnInit {
  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('class.page-element') pageElement = true;
  constructor(
    private webtrendsService: WebtrendsService
  ) { }

  ngOnInit() {

  }

  wtOnLoad() {
    // const wtObj = new WebTrendsObject('Bguard_login_load', 1, 0, )
    // this.sendWebTrends(wtObj);
  }
  sendWebTrends(wtObj: WebTrendsObject) {
    this.webtrendsService.reportWT(wtObj);
  }

}
