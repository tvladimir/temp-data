import { Component, OnInit, HostBinding, OnDestroy } from '@angular/core';
import { scaleInOutAnimation } from '../../animations/route.animation';
import { BguardStateService, IBguardState } from '../../services/bguard-state/bguard-state.service';
import { IdentificationService } from '../../services/identification/identification.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoaderService } from 'src/app/Modules/shared/Services/loader/loader.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Subscription } from 'rxjs';
import { VerifyResponse, WhereToGoAfterVerify } from '../../Models/Verify/VerifyResponse.model';
import { InputValidator } from 'src/app/Modules/shared/Directives/input-validator/input-validator.directive';
import { WebtrendsService } from 'src/app/Modules/shared/Services/Webtrends/webtrends.service';
import { WebTrendsObject } from 'src/app/Modules/shared/Models/WebTrendsObject';

@Component({
  selector: 'bz-insert-sms-code-page',
  templateUrl: './insert-sms-code-page.component.html',
  styleUrls: ['./insert-sms-code-page.component.scss'],
  animations: [
    scaleInOutAnimation
  ]
})
export class InsertSmsCodePageComponent implements OnInit, OnDestroy {

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
  ) { }

  ngOnInit() {
    this.currentBguardState = this.bguardStateService.currentState;
    this.reportWT(true, '');
    this.buildForm();
    this.bguardStateSubscription = this.bguardStateService.storeState.subscribe(state => {
      this.currentBguardState = state;
      this.verificationForm.get('Token').setValue(state.Token);
    });
  }

  buildForm() {
    this.verificationForm = this.fb.group({
      Token: [this.currentBguardState.userInfo.Token],
      OtpCode: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6), InputValidator('number')]],
      // PhoneNumber: [''],
      // CustomerId: [''],
      // CreditCard4DigitsOrBankAcount: [''],
    });
  }

  async onSubmit() {
    this.VerifyUserInfo();
  }

  async VerifyUserInfo() {
    let apiRes: VerifyResponse = {};
    if (this.verificationForm.valid) {
      try {
        this.loaderService.changeState(true);
        apiRes = await this.identificationService.VerifyUserInfo(this.verificationForm.value);
        if (!apiRes.IsSuccessful) {
          this.setError(apiRes.ClientErrorMessage || environment.errorMessages.defaultErrorMessage);
          this.loaderService.changeState(false);
          return;
        }
        this.whereToGoDecision(apiRes);
        this.loaderService.changeState(false);
      } catch (ex) {
        console.error(ex);
        this.loaderService.changeState(false);
      } finally {
        this.reportWT(false, '', apiRes.IsSuccessful,
          apiRes.ErrorMessage || apiRes.ClientErrorMessage || environment.errorMessages.defaultErrorMessage);
      }
    }
  }

  async sendOTP() {
    try {
        this.loaderService.changeState(true);
        const apiRes = await this.identificationService.SendOTP(this.verificationForm.value);
        if (!apiRes.IsSuccessful) {
          this.setError(apiRes.ClientErrorMessage || environment.errorMessages.defaultErrorMessage);
          this.loaderService.changeState(false);
          return;
        }
        this.router.navigate(['/insertSmsCode']);
        this.loaderService.changeState(false);
    } catch (ex) {
      console.error(ex);
      this.loaderService.changeState(false);
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
      case WhereToGoAfterVerify.ErrorPage: {
        this.router.navigate(['error']);
        break;
      }
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
        action: 'Bguard_otp_sms_stage2_load',
        stage_status: 1,
        errorMsg: 0,
        activity_number: phoneNumber
      }));
    } else {
      if (IsSuccessful) {
        this.webtrendsService.reportWT(new WebTrendsObject({
          action: 'Bguard_otp_sms_stage2_continue',
          stage_status: 1,
          errorMsg: 0,
          activity_number: phoneNumber
        }));
      } else {
        this.webtrendsService.reportWT(new WebTrendsObject({
          action: 'Bguard_otp_sms_stage2_continue',
          stage_status: 0,
          errorMsg: 1,
          errormsg_desc: errorMessage,
          activity_number: phoneNumber
        }));
      }
    }
  }

  ngOnDestroy() {
    if (this.bguardStateSubscription) {
      this.bguardStateSubscription.unsubscribe();
    }
  }
}
