import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Subscription } from 'rxjs';

declare var ga: any;

@Component({
  selector: 'bz-bguard-layout',
  templateUrl: './bguard-layout.component.html',
  styleUrls: ['./bguard-layout.component.scss']
})
export class BguardLayoutComponent implements OnInit, OnDestroy {

  private routerSubscription: Subscription;
  public isShowTestBar: boolean;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    this.isShowTestBar = environment.isShowTestBar;
    this.routerSubscription = this.router.events.pipe(
      filter((event: any) => event instanceof NavigationEnd)
    ).subscribe((route: NavigationEnd) => {
      // this.sendWebTrendsLoadPage();
      // if (!environment.isLocal) {
      //   this.checkHTTPS();
      // }
      ga('send', 'pageview', route.url);
    });
  }

  // checkHTTPS() {
  //   const locationProtocol = location.protocol.split(':')[0];
  //   if (locationProtocol.toLowerCase() !== 'https') {
  //       location.protocol = 'https:';
  //       return;
  //   }
  // }

  ngOnDestroy() {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }
}
