import { Component, OnInit, HostBinding, OnDestroy } from '@angular/core';
import { scaleInOutAnimation } from '../../animations/route.animation';
import { BguardStateService, IBguardState } from '../../services/bguard-state/bguard-state.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'bz-resend-sms-registered-page',
  templateUrl: './resend-sms-registered-page.component.html',
  styleUrls: ['./resend-sms-registered-page.component.scss'],
  animations: [
    scaleInOutAnimation
  ]
})
export class ResendSmsRegisteredPageComponent implements OnInit, OnDestroy {
  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('class.page-element') pageElement = true;
  public currentBguardState: IBguardState;
  private bguardStateSubscription: Subscription;

  constructor(
    private bguardStateService: BguardStateService
  ) { }

  ngOnInit() {
    this.currentBguardState = this.bguardStateService.currentState;
    this.bguardStateSubscription = this.bguardStateService.storeState.subscribe(state => {
      this.currentBguardState = state;
    });
  }

  ngOnDestroy() {
    if (this.bguardStateSubscription) {
      this.bguardStateSubscription.unsubscribe();
    }
  }

}
