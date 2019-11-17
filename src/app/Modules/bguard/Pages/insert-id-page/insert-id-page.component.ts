import { Component, OnInit, HostBinding } from '@angular/core';
import { scaleInOutAnimation } from '../../animations/route.animation';
import { GetUserInfoRequest } from '../../Models/Identification/GetUserInfoRequest.model';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IdentificationService } from '../../services/identification/identification.service';
import { environment } from 'src/environments/environment';
import { LoaderService } from 'src/app/Modules/shared/Services/loader/loader.service';
import { Router } from '@angular/router';
import { InputValidator } from 'src/app/Modules/shared/Directives/input-validator/input-validator.directive';
import { WebtrendsService } from 'src/app/Modules/shared/Services/Webtrends/webtrends.service';
import { WebTrendsObject } from 'src/app/Modules/shared/Models/WebTrendsObject';
import { GetUserInfoResponse } from '../../Models/Identification/GetUserInfoResponse.model';

@Component({
  selector: 'bz-insert-id-page',
  templateUrl: './insert-id-page.component.html',
  styleUrls: ['./insert-id-page.component.scss'],
  animations: [
    scaleInOutAnimation
  ]
})
export class InsertIdPageComponent implements OnInit {
  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('class.page-element') pageElement = true;

  public getUserInfoRequest: GetUserInfoRequest = {
    IdentityNumber: ''
  };
  public errorData = {
    isError: false,
    errorMessage: ''
  };
  public identificationForm: FormGroup;
  constructor(
    private identificationService: IdentificationService,
    private fb: FormBuilder,
    private loaderService: LoaderService,
    private webtrendsService: WebtrendsService,
    private router: Router
  ) { }

  ngOnInit() {
    this.reportWT(true);
    this.buildForm();
  }

  buildForm() {
    this.identificationForm = this.fb.group({
      IdentityNumber: ['', [Validators.required, InputValidator('idnumber')]],
      // PhoneNumber: [''],
      // CustomerId: [''],
      // CreditCard4DigitsOrBankAcount: [''],
    });
  }

  async onSubmit() {
    let apiRes: GetUserInfoResponse = {};
    if (this.identificationForm.valid) {
      try {
        this.loaderService.changeState(true);
        apiRes = await this.identificationService.GetUserInfo(this.identificationForm.value);
        if (!apiRes.IsSuccessful) {
          this.setError(apiRes.ClientErrorMessage || environment.errorMessages.defaultErrorMessage);
          this.loaderService.changeState(false);
          return;
        }
        if (apiRes.IsMultipleSubscribe) {
          this.router.navigate(['/insertPhone']);
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
        this.reportWT(false, this.identificationForm.controls.IdentityNumber.value, apiRes.IsSuccessful,
          apiRes.ErrorMessage || apiRes.ClientErrorMessage || environment.errorMessages.defaultErrorMessage);
      }
    }
  }


  onNotBezeqSubscribe() {
    this.webtrendsService.reportWT(new WebTrendsObject({
      action: 'Bguard_identification_id',
      stage_status: 1,
      errorMsg: 0
    }));
  }

  reportWT(isOnLoad: boolean, phoneNumber?: string, IsSuccessful?: boolean, errorMessage?: string) {
    if (isOnLoad) {
      this.webtrendsService.reportWT(new WebTrendsObject({
        action: 'Bguard_identification_id_load',
        stage_status: 1,
        errorMsg: 0
      }));
    } else {
      if (IsSuccessful) {
        this.webtrendsService.reportWT(new WebTrendsObject({
          action: 'Bguard_identification_id_continue',
          stage_status: 1,
          errorMsg: 0,
          phone_number: phoneNumber
        }));
      } else {
        this.webtrendsService.reportWT(new WebTrendsObject({
          action: 'Bguard_identification_id_continue',
          stage_status: 0,
          errorMsg: 1,
          errormsg_desc: errorMessage,
          phone_number: phoneNumber
        }));
      }
    }
  }

  setError(errorMessage: string) {
    this.errorData = {
      isError: true,
      errorMessage
    };
  }
}
