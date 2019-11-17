import { Component, OnInit, HostBinding, OnDestroy } from '@angular/core';
import { scaleInOutAnimation } from '../../animations/route.animation';
import { OrderService } from '../../services/order/order.service';
import { BguardStateService, IBguardState } from '../../services/bguard-state/bguard-state.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoaderService } from 'src/app/Modules/shared/Services/loader/loader.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CheckOrderResultRequest } from '../../Models/CheckOrderResult/CheckOrderResultRequest.model';
import { CheckOrderResultResponse } from '../../Models/CheckOrderResult/CheckOrderResultResponse.model';
import { InputValidator } from 'src/app/Modules/shared/Directives/input-validator/input-validator.directive';
import { WhereToGoAfterVerify } from '../../Models/Verify/VerifyResponse.model';

@Component({
  selector: 'bz-insert-mail-and-phone-page',
  templateUrl: './insert-mail-and-phone-page.component.html',
  styleUrls: ['./insert-mail-and-phone-page.component.scss'],
  animations: [
    scaleInOutAnimation
  ]
})
export class InsertMailAndPhonePageComponent implements OnInit, OnDestroy {
  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('class.page-element') pageElement = true;

  public currentBguardState: IBguardState;
  private bguardStateSubscription: Subscription;
  public isCheckOrderResult = true;
  public orderForm: FormGroup;
  public errorData = {
    isError: false,
    errorMessage: ''
  };

  constructor(
    private bguardStateService: BguardStateService,
    private orderService: OrderService,
    private fb: FormBuilder,
    private loaderService: LoaderService,
    private router: Router
  ) { }

  ngOnInit() {
    this.currentBguardState = this.bguardStateService.currentState;
    this.buildForm();
    this.bguardStateSubscription = this.bguardStateService.storeState.subscribe(state => {
      this.currentBguardState = state;
      this.orderForm.get('Token').setValue(state.Token);
    });
  }

  buildForm() {
    this.orderForm = this.fb.group({
      Token: [this.currentBguardState.userInfo.Token],
      // OtpCode: [''],
      // PhoneNumber: [''],
      Email: ['', [Validators.required, InputValidator('email')]],
      Cellular: ['', [Validators.required, InputValidator('mobilephone')]],
      isSpamAccept: [false]
    });
  }

  async onSubmit() {
    if (this.currentBguardState.verificationUserInfo.whereToGo === WhereToGoAfterVerify.RegistrationPage) {
      this.createOrder();
    } else if (this.currentBguardState.verificationUserInfo.whereToGo === WhereToGoAfterVerify.OpenCmReportPage) {
      this.OpenCmReport();
    }
  }

  async createOrder() {
    try {
      if (this.orderForm.valid) {
        this.loaderService.changeState(true);
        const apiRes = await this.orderService.CreateOrder(this.orderForm.value);
        if (!apiRes.IsSuccessful) {
          this.setError(apiRes.ClientErrorMessage || environment.errorMessages.defaultErrorMessage);
          this.loaderService.changeState(false);
          return;
        }
        this.setTotalTimeCheckOrderResult();
        this.checkOrderResult(apiRes);
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

  async checkOrderResult(checkOrderResultResponse: CheckOrderResultResponse) {
    try {
      const checkOrderResultRequest: CheckOrderResultRequest = {
        CountCheck: checkOrderResultResponse.CountCheck,
        Token: this.currentBguardState.Token
      };
      const checkRes = await this.orderService.CheckOrderResult(checkOrderResultRequest);
      if (checkRes.IsSuccessful) {
        // כאשר מתקבלת מספר תשובה 1 נפתחה הזמנה תקינה 2 זה אומר שהתהליך הסתיים (ההזמנה נפתחה ונסגרה)
        if (checkRes.AnswerNumber > 0) {
          this.loaderService.changeState(false);
          this.router.navigate(['thankYou']);
        } else if (checkRes.isContinueCheck && this.isCheckOrderResult) {
          // המשך לבצע בדיקה
          setTimeout(() => {
            this.checkOrderResult(checkRes);
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

  async OpenCmReport() {
    try {
      if (this.orderForm.valid) {
        this.loaderService.changeState(true);
        const apiRes = await this.orderService.OpenCmReport(this.orderForm.value);
        if (!apiRes.IsSuccessful) {
          this.setError(apiRes.ClientErrorMessage || environment.errorMessages.defaultErrorMessage);
          this.loaderService.changeState(false);
          return;
        }
        this.loaderService.changeState(false);
        this.router.navigate(['/thankYou']);
      }
    } catch (ex) {
      console.error(ex);
      this.setError(environment.errorMessages.defaultErrorMessage);
      this.loaderService.changeState(false);
    }
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
