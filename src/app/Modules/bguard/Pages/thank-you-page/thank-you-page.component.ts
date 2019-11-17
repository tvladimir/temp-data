import { Component, OnInit, HostBinding, OnDestroy, Inject } from '@angular/core';
import { scaleInOutAnimation } from '../../animations/route.animation';
import { IdentificationService } from '../../services/identification/identification.service';
import { IBguardState, BguardStateService } from '../../services/bguard-state/bguard-state.service';
import { Subscription } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { environment } from 'src/environments/environment';
import { CheckOrderResultResponse } from '../../Models/CheckOrderResult/CheckOrderResultResponse.model';
import { CheckOrderResultRequest } from '../../Models/CheckOrderResult/CheckOrderResultRequest.model';
import { OrderService } from '../../services/order/order.service';
import { LoaderService } from 'src/app/Modules/shared/Services/loader/loader.service';
import { WhereToGoAfterVerify } from '../../Models/Verify/VerifyResponse.model';

@Component({
  selector: 'bz-thank-you-page',
  templateUrl: './thank-you-page.component.html',
  styleUrls: ['./thank-you-page.component.scss'],
  animations: [
    scaleInOutAnimation
  ]
})
export class ThankYouPageComponent implements OnInit, OnDestroy {
  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('class.page-element') pageElement = true;

  public currentBguardState: IBguardState;
  private bguardStateSubscription: Subscription;

  private isCheckOrderResult = true;

  public errorData = {
    isError: false,
    errorMessage: ''
  };

  constructor(
    private bguardStateService: BguardStateService,
    private orderService: OrderService,
    private loaderService: LoaderService,
    @Inject(DOCUMENT) private document: any
  ) { }

  ngOnInit() {
    this.currentBguardState = this.bguardStateService.currentState;
    this.bguardStateSubscription = this.bguardStateService.storeState.subscribe(state => {
      this.currentBguardState = state;
    });
    if (this.currentBguardState.verificationUserInfo.whereToGo === WhereToGoAfterVerify.RegistrationPage) {
      if (this.currentBguardState.createOrderAnswerNumber < 2) {
        this.loaderService.changeState(true);
        this.setTotalTimeCheckOrderResult();
        this.checkOrderResult();
      }
    }
  }

  onBtnClick() {
    if (this.bguardStateService.currentState && this.bguardStateService.currentState.VendorUrl) {
      window.open(this.bguardStateService.currentState.VendorUrl, '_blank');
      return;
    }
    window.open(environment.wwwBezeqSite, '_blank');
  }

  async checkOrderResult() {
    try {
      const checkOrderResultRequest: CheckOrderResultRequest = {
        Token: this.currentBguardState.Token
      };
      const checkRes = await this.orderService.CheckOrderResult(checkOrderResultRequest);
      if (checkRes.IsSuccessful) {
        // כאשר מתקבלת מספר תשובה 1 נפתחה הזמנה תקינה 2 זה אומר שהתהליך הסתיים (ההזמנה נפתחה ונסגרה)
        if (checkRes.AnswerNumber > 1) {
          this.loaderService.changeState(false);
        } else if (checkRes.isContinueCheck && this.isCheckOrderResult) {
          // המשך לבצע בדיקה
          setTimeout(() => {
            this.checkOrderResult();
          }, environment.times.EachTimeCheckOrderResult);
        } else if (checkRes.isContinueCheck && !this.isCheckOrderResult) {
          // הגיע למצב של Timeout ללא קבלת תשובה מ JBPM
          this.setError(checkRes.ClientErrorMessage || environment.errorMessages.defaultErrorMessage);
          this.loaderService.changeState(false);
        } else {
          this.setError(checkRes.ClientErrorMessage || environment.errorMessages.defaultErrorMessage);
          this.loaderService.changeState(false);
        }
      } else {
        this.loaderService.changeState(false);
        this.setError(checkRes.ClientErrorMessage || environment.errorMessages.defaultErrorMessage);
      }
    } catch (ex) {
      console.error(ex);
      this.setError(environment.errorMessages.defaultErrorMessage);
      this.loaderService.changeState(false);
    }
  }

  setTotalTimeCheckOrderResult() {
    setTimeout(() => {
      this.isCheckOrderResult = false;
    }, environment.times.TotalTimeCheckOrderResult);
  }

  setError(errorMessage: string) {
    this.errorData = {
      isError: true,
      errorMessage
    };
  }

  ngOnDestroy() {
    if (this.bguardStateSubscription) {
      this.bguardStateSubscription.unsubscribe();
    }
  }

}
