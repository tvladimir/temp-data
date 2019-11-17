import { Component, OnInit, HostBinding, OnDestroy } from '@angular/core';
import { scaleInOutAnimation } from '../../animations/route.animation';
import { SelectPhoneNumberRequest } from '../../Models/SelectPhoneNumber/SelectPhoneNumberRequest.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IdentificationService } from '../../services/identification/identification.service';
import { LoaderService } from 'src/app/Modules/shared/Services/loader/loader.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { BguardStateService, IBguardState } from '../../services/bguard-state/bguard-state.service';
import { Subscription } from 'rxjs';
import { InputValidator } from 'src/app/Modules/shared/Directives/input-validator/input-validator.directive';
import { WebtrendsService } from 'src/app/Modules/shared/Services/Webtrends/webtrends.service';
import { WebTrendsObject } from 'src/app/Modules/shared/Models/WebTrendsObject';
import { GetUserInfoResponse } from '../../Models/Identification/GetUserInfoResponse.model';

@Component({
  selector: 'bz-insert-phone-number-page',
  templateUrl: './insert-phone-number-page.component.html',
  styleUrls: ['./insert-phone-number-page.component.scss'],
  animations: [
    scaleInOutAnimation
  ]
})
export class InsertPhoneNumberPageComponent implements OnInit, OnDestroy {
  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('class.page-element') pageElement = true;

  public currentBguardState: IBguardState;
  private bguardStateSubscription: Subscription;
  public errorData = {
    isError: false,
    errorMessage: ''
  };
  public selectPhoneNumberForm: FormGroup;

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
    this.buildForm();
    // tslint:disable-next-line:max-line-length
    this.reportWT(true);
    this.bguardStateSubscription = this.bguardStateService.storeState.subscribe(state => {
      this.currentBguardState = state;
      this.selectPhoneNumberForm.get('Token').setValue(state.Token);
    });
  }

  buildForm() {
    this.selectPhoneNumberForm = this.fb.group({
      Token: [''],
      PhoneNumber: ['', [Validators.required, InputValidator('fullphone')]],
      // PhoneNumber: [''],
      // CustomerId: [''],
      // CreditCard4DigitsOrBankAcount: [''],
    });
  }

  async onSubmit() {
    let apiRes: GetUserInfoResponse = {};
    if (this.selectPhoneNumberForm.valid) {
      try {
        this.loaderService.changeState(true);
        apiRes = await this.identificationService.SelectPhoneNumber(this.selectPhoneNumberForm.value);
        if (!apiRes.IsSuccessful) {
          this.setError(apiRes.ClientErrorMessage || environment.errorMessages.defaultErrorMessage);
          this.loaderService.changeState(false);
          return;
        }
        // tslint:disable-next-line:max-line-length
        if (!apiRes.ValidateByBankAllowed && !apiRes.ValidateByCreditAllowed && !apiRes.ValidateBySMSAllowed && apiRes.ValidateByCustomerIdAllowed) {
          this.router.navigate(['/insertCustomerNumber']);
        } else {
          this.router.navigate(['/identity']);
        }
        this.loaderService.changeState(false);
      } catch (ex) {
        console.error(ex);
        this.loaderService.changeState(false);
      } finally {
        this.reportWT(false, this.selectPhoneNumberForm.controls.PhoneNumber.value, apiRes.IsSuccessful,
          apiRes.ErrorMessage || apiRes.ClientErrorMessage || environment.errorMessages.defaultErrorMessage);
      }
    }
  }


  setError(errorMessage: string) {
    this.errorData = {
      isError: true,
      errorMessage
    };
  }

  reportWT(isOnLoad: boolean, phoneNumber?: string, IsSuccessful?: boolean, errorMessage?: string) {
    if (isOnLoad) {
      this.webtrendsService.reportWT(new WebTrendsObject({
        action: 'Bguard_identification2_load',
        stage_status: 1,
        errorMsg: 0
      }));
    } else {
      if (IsSuccessful) {
        this.webtrendsService.reportWT(new WebTrendsObject({
          action: 'Bguard_identification2_continue',
          stage_status: 1,
          errorMsg: 0,
          phone_number: phoneNumber
        }));
      } else {
        this.webtrendsService.reportWT(new WebTrendsObject({
          action: 'Bguard_identification2_continue',
          stage_status: 0,
          errorMsg: 1,
          errormsg_desc: errorMessage,
          phone_number: phoneNumber
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
