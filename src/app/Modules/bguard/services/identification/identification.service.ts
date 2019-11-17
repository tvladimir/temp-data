import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GetUserInfoRequest } from '../../Models/Identification/GetUserInfoRequest.model';
import { environment } from 'src/environments/environment';
import { GetUserInfoResponse } from '../../Models/Identification/GetUserInfoResponse.model';
import { tap } from 'rxjs/operators';
import { BguardStateService } from '../bguard-state/bguard-state.service';
import { OnIdentificationSuccess, OnIdentificationFailed, OnVerificationSuccess, OnVerificationFailed, OnSendOtpSuccess, OnSendOtpFailed, OnSelectPhoneNumberSuccess, OnSelectPhoneNumberFailed } from '../bguard-state/bguard-state.action';
import { VerifyRequest } from '../../Models/Verify/VerifyRequest.model';
import { VerifyResponse } from '../../Models/Verify/VerifyResponse.model';
import { SendOTPResponse } from '../../Models/SendOTP/SendOTPResponse.model';
import { SendOTPRequest } from '../../Models/SendOTP/SendOTPRequest.model';
import { SelectPhoneNumberRequest } from '../../Models/SelectPhoneNumber/SelectPhoneNumberRequest.model';

@Injectable({
  providedIn: 'root'
})
export class IdentificationService {

  private baseApiUrlIdentificationControler: string;
  constructor(
    private bguardStateService: BguardStateService,
    private httpClient: HttpClient,
    ) {
    this.baseApiUrlIdentificationControler = `${environment.baseApiUrl}/Identification`;
  }

  GetUserInfo(req: GetUserInfoRequest): Promise<GetUserInfoResponse> {
    return this.httpClient.post(`${this.baseApiUrlIdentificationControler}/GetUserInfo`, req).pipe(
      tap((res: GetUserInfoResponse) => {
        if (res.IsSuccessful) {
          const bguardStateAction = new OnIdentificationSuccess(res);
          this.bguardStateService.updateState(bguardStateAction);
        } else {
          const bguardStateAction = new OnIdentificationFailed(res);
          this.bguardStateService.updateState(bguardStateAction);
        }
      })
    ).toPromise();
  }

  SelectPhoneNumber(req: SelectPhoneNumberRequest): Promise<GetUserInfoResponse> {
    return this.httpClient.post(`${this.baseApiUrlIdentificationControler}/SelectPhoneNumber`, req).pipe(
      tap((res: GetUserInfoResponse) => {
        if (res.IsSuccessful) {
          const bguardStateAction = new OnSelectPhoneNumberSuccess(res);
          this.bguardStateService.updateState(bguardStateAction);
        } else {
          const bguardStateAction = new OnSelectPhoneNumberFailed(res);
          this.bguardStateService.updateState(bguardStateAction);
        }
      })
    ).toPromise();
  }

  VerifyUserInfo(req: VerifyRequest): Promise<VerifyResponse> {
    return this.httpClient.post(`${this.baseApiUrlIdentificationControler}/VerifyUserInfo`, req).pipe(
      tap((res: VerifyResponse) => {
        if (res.IsSuccessful) {
          const bguardStateAction = new OnVerificationSuccess(res);
          this.bguardStateService.updateState(bguardStateAction);
        } else {
          const bguardStateAction = new OnVerificationFailed(res);
          this.bguardStateService.updateState(bguardStateAction);
        }
      })
    ).toPromise();
  }

  SendOTP(req: SendOTPRequest): Promise<SendOTPResponse> {
    return this.httpClient.post(`${this.baseApiUrlIdentificationControler}/SendOTP`, req).pipe(
      tap((res: SendOTPResponse) => {
        if (res.IsSuccessful) {
          const bguardStateAction = new OnSendOtpSuccess(res);
          this.bguardStateService.updateState(bguardStateAction);
        } else {
          const bguardStateAction = new OnSendOtpFailed(res);
          this.bguardStateService.updateState(bguardStateAction);
        }
      })
    ).toPromise();
  }


}
