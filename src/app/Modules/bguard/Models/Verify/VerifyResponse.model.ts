import { BaseResponse } from '../Base/BaseResponse.model';

export enum WhereToGoAfterVerify {
    RegistrationPage = 1,
    RegistredPage = 2,
    OpenCmReportPage = 3,
    ErrorPage = 100
}

export interface VerifyResponse extends BaseResponse {
  Token?: string;
  FirstName?: string;
  Price?: string;
  whereToGo?: WhereToGoAfterVerify;
  isBillingRegistered?: boolean;
  isVendorRegistered?: boolean;
  vendorRegisteredEmail?: string;
  haveOpenOrders?: boolean;
  errorToErrorPage?: string;
}
