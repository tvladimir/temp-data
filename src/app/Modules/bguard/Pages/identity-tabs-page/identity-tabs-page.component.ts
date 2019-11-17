import { Component, OnInit, HostBinding, OnDestroy } from '@angular/core';
import { scaleInOutAnimation } from '../../animations/route.animation';
import { IdentificationService } from '../../services/identification/identification.service';
import { LoaderService } from 'src/app/Modules/shared/Services/loader/loader.service';
import { Router } from '@angular/router';
import { BguardStateService, IBguardState } from '../../services/bguard-state/bguard-state.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { Subscription } from 'rxjs';
import { VerifyResponse, WhereToGoAfterVerify } from '../../Models/Verify/VerifyResponse.model';
import { InputValidator } from 'src/app/Modules/shared/Directives/input-validator/input-validator.directive';
import { WebtrendsService } from 'src/app/Modules/shared/Services/Webtrends/webtrends.service';
import { WebTrendsObject } from 'src/app/Modules/shared/Models/WebTrendsObject';
import { VerifyRequest } from '../../Models/Verify/VerifyRequest.model';

@Component({
  selector: 'bz-identity-tabs-page',
  templateUrl: './identity-tabs-page.component.html',
  styleUrls: ['./identity-tabs-page.component.scss'],
  animations: [
    scaleInOutAnimation
  ]
})
export class IdentityTabsPageComponent implements OnInit, OnDestroy {
  public CUSTOMER_NUMBER_TAB_HEADER_LABEL = 'מספר לקוח';
  public SMS_TAB_HEADER_LABEL = 'SMS';
  public PAYMNET_HEADER_LABEL = 'אמצעי תשלום';
  private selectedVerificationWay = '';
  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('class.page-element') pageElement = true;
  public currentBguardState: IBguardState;
  private bguardStateSubscription: Subscription;
  public errorData = {
    isError: false,
    errorMessage: ''
  };

  public verificationForm: FormGroup;

  constructor(
    private bguardStateService: BguardStateService,
    private identificationService: IdentificationService,
    private fb: FormBuilder,
    private loaderService: LoaderService,
    private webtrendsService: WebtrendsService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.currentBguardState = this.bguardStateService.currentState;
    this.reportWT(true, '');
    this.buildForm();
    this.decisionDefaultOption();
    this.bguardStateSubscription = this.bguardStateService.storeState.subscribe(state => {
      this.currentBguardState = state;
      this.verificationForm.get('Token').setValue(state.Token);
    });
  }

  decisionDefaultOption() {
    if (this.currentBguardState.userInfo.ValidateByCreditAllowed || this.currentBguardState.userInfo.ValidateByBankAllowed) {
      this.selectedTabChange(this.PAYMNET_HEADER_LABEL);
    } else {
      this.selectedTabChange(this.CUSTOMER_NUMBER_TAB_HEADER_LABEL);
    }
  }
  buildForm() {
    this.verificationForm = this.fb.group({
      Token: [this.currentBguardState.userInfo.Token],
      // OtpCode: [''],
      // PhoneNumber: [''],
      CustomerId: [''],
      CreditCard4DigitsOrBankAcount: [''],
    });
  }

  selectedTabChange(tabHeaderLabel: string) {
    this.resetError();
    this.clearValidators();
    switch (tabHeaderLabel) {
      case this.CUSTOMER_NUMBER_TAB_HEADER_LABEL: {
        this.verificationForm.get('CustomerId').setValidators([Validators.required, InputValidator('number')]);
        break;
      }
      case this.PAYMNET_HEADER_LABEL: {
        this.verificationForm.get('CreditCard4DigitsOrBankAcount').setValidators(
          [Validators.required, Validators.minLength(4), Validators.maxLength(4), InputValidator('number')]);
        break;
      }
    }
    this.selectedVerificationWay = tabHeaderLabel;
    this.updateValidators();
    this.reportWT(true, '');
  }

  clearValidators() {
    this.verificationForm.get('CustomerId').clearValidators();
    this.verificationForm.get('CreditCard4DigitsOrBankAcount').clearValidators();
  }

  updateValidators() {
    this.verificationForm.get('CustomerId').updateValueAndValidity({emitEvent: false});
    this.verificationForm.get('CreditCard4DigitsOrBankAcount').updateValueAndValidity({emitEvent: false});
  }

  resetError() {
    this.errorData = {
      isError: false,
      errorMessage: ''
    };
  }

  async onSubmit() {
    this.resetError();
    if (this.selectedVerificationWay === this.SMS_TAB_HEADER_LABEL) {
      this.sendOTP();
      return;
    }
    this.VerifyUserInfo();
  }

  async VerifyUserInfo() {
    let apiRes: VerifyResponse = {};
    if (this.verificationForm.valid) {
      const req: VerifyRequest = {
        ...this.verificationForm.value,
        // tslint:disable-next-line:max-line-length
        CreditCard4Digits: this.currentBguardState.userInfo.ValidateByCreditAllowed ? this.verificationForm.value.CreditCard4DigitsOrBankAcount : '',
        // tslint:disable-next-line:max-line-length
        BankAcount: this.currentBguardState.userInfo.ValidateByBankAllowed ? this.verificationForm.value.CreditCard4DigitsOrBankAcount : '',
      }
      try {
        this.loaderService.changeState(true);
        apiRes = await this.identificationService.VerifyUserInfo(req);
        if (!apiRes.IsSuccessful) {
          this.setError(apiRes.ClientErrorMessage || environment.errorMessages.defaultErrorMessage);
          this.loaderService.changeState(false);
          return;
        }
        this.loaderService.changeState(false);
        this.whereToGoDecision(apiRes);
      } catch (ex) {
        console.error(ex);
        this.loaderService.changeState(false);
      } finally {
        this.reportWT(false, '', apiRes.IsSuccessful,
          apiRes.ErrorMessage || apiRes.ClientErrorMessage || environment.errorMessages.defaultErrorMessage);
      }
    }
  }

  whereToGoDecision(apiRes: VerifyResponse) {
    switch (apiRes.whereToGo) {
      case WhereToGoAfterVerify.RegistredPage: {
        this.router.navigate(['Registered']);
        break;
      }
      case WhereToGoAfterVerify.RegistrationPage: {
        this.router.navigate(['insertMailAndPhone']);
        break;
      }
      case WhereToGoAfterVerify.OpenCmReportPage: {
        this.router.navigate(['insertMailAndPhone']);
        break;
      }
      case WhereToGoAfterVerify.ErrorPage: {
        this.router.navigate(['error']);
        break;
      }
    }
  }

  async sendOTP() {
    try {
      if (this.verificationForm.valid) {
        this.loaderService.changeState(true);
        const apiRes = await this.identificationService.SendOTP(this.verificationForm.value);
        if (!apiRes.IsSuccessful) {
          this.setError(apiRes.ClientErrorMessage || environment.errorMessages.defaultErrorMessage);
          this.loaderService.changeState(false);
          return;
        }
        this.router.navigate(['/insertSmsCode']);
        this.loaderService.changeState(false);
      }
    } catch (ex) {
      console.error(ex);
      this.loaderService.changeState(false);
    }
  }

  setError(errorMessage: string) {
    this.errorData = {
      isError: true,
      errorMessage
    };
  }

  reportWT(isOnLoad: boolean, phoneNumber: string, IsSuccessful?: boolean, errorMessage?: string) {
    if (isOnLoad) {
      this.webtrendsService.reportWT(new WebTrendsObject({
        action: this.getWTAction(isOnLoad),
        stage_status: 1,
        errorMsg: 0,
        activity_number: phoneNumber
      }));
    } else {
      if (IsSuccessful) {
        this.webtrendsService.reportWT(new WebTrendsObject({
          action: this.getWTAction(isOnLoad),
          stage_status: 1,
          errorMsg: 0,
          activity_number: phoneNumber
        }));
      } else {
        this.webtrendsService.reportWT(new WebTrendsObject({
          action: this.getWTAction(isOnLoad),
          stage_status: 0,
          errorMsg: 1,
          errormsg_desc: errorMessage,
          activity_number: phoneNumber
        }));
      }
    }
  }

  getWTAction(isOnLoad: boolean) {
    switch (this.selectedVerificationWay) {
      case this.SMS_TAB_HEADER_LABEL: {
        if (isOnLoad) {
          return 'Bguard__identification_sms_load';
        } else {
          return 'Bguard_identification_sms_continue';
        }
      }
      case this.PAYMNET_HEADER_LABEL: {
        if (isOnLoad) {
          return 'Bguard_identification_hok_payment_load';
        } else {
          return 'Bguard_identification_hok_payment_continue';
        }
      }
      case this.CUSTOMER_NUMBER_TAB_HEADER_LABEL: {
        if (isOnLoad) {
          return 'Bguard_identification_lak_load';
        } else {
          return 'Bguard_identification_lak_continue';
        }
      }
    }
  }
  ngOnDestroy() {
    if (this.bguardStateSubscription) {
      this.bguardStateSubscription.unsubscribe();
    }
  }
}
