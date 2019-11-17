import { Component, OnInit } from '@angular/core';

import { filter } from 'rxjs/operators';

import { environment } from '../environments/environment';
import { Router, ActivatedRoute, NavigationEnd, Event as RouterEvent  } from '@angular/router';

@Component({
  selector: 'bz-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Bguard';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
        if (!environment.isLocal) {
          this.checkHTTPS();
        }
    });
  }

  checkHTTPS() {
    const locationProtocol = location.protocol.split(':')[0];
    if (locationProtocol.toLowerCase() !== 'https') {
        location.protocol = 'https:';
        return;
    }
  }
}
