import { Component, OnInit, HostBinding } from '@angular/core';
import { scaleInOutAnimation } from '../../animations/route.animation';
import { BguardStateService, IBguardState } from '../../services/bguard-state/bguard-state.service';

@Component({
  selector: 'bz-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.scss'],
  animations: [
    scaleInOutAnimation
  ]
})
export class ErrorPageComponent implements OnInit {
  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('class.page-element') pageElement = true;

  public currentBguardState: IBguardState;

  constructor(
    private bguardStateService: BguardStateService,
  ) { }

  ngOnInit() {
    this.currentBguardState = this.bguardStateService.currentState;
  }

}
