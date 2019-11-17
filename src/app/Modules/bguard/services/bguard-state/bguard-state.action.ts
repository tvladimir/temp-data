import { GetUserInfoResponse } from '../../Models/Identification/GetUserInfoResponse.model';
import { VerifyResponse } from '../../Models/Verify/VerifyResponse.model';
import { CheckOrderResultResponse } from '../../Models/CheckOrderResult/CheckOrderResultResponse.model';
import { OpenCmReportResponse } from '../../Models/OpenCmReport/OpenCmReportResponse.model';

export const ON_IDENTIFICATION_SUCCESS = '[BGUARD_STATE] [IDENTIFICATION] ON_IDENTIFICATION_SUCCESS';
export const ON_IDENTIFICATION_FAILED = '[BGUARD_STATE] [IDENTIFICATION] ON_IDENTIFICATION_FAILED';
export const ON_SELECT_PHONE_NUMBER_SUCCESS = '[BGUARD_STATE] [IDENTIFICATION] ON_SELECT_PHONE_NUMBER_SUCCESS';
export const ON_SELECT_PHONE_NUMBER_FAILED = '[BGUARD_STATE] [IDENTIFICATION] ON_SELECT_PHONE_NUMBER_FAILED';
export const ON_VERIFICATION_SUCCESS = '[BGUARD_STATE] [VERIFICATION] ON_VERIFICATION_SUCCESS';
export const ON_VERIFICATION_FAILED = '[BGUARD_STATE] [VERIFICATION] ON_VERIFICATION_FAILED';
export const ON_SEND_OTP_SUCCESS = '[BGUARD_STATE] [SEND_OTP] ON_SEND_OTP_SUCCESS';
export const ON_SEND_OTP_FAILED = '[BGUARD_STATE] [SEND_OTP] ON_SEND_OTP_FAILED';
export const ON_CREATE_ORDER_SUCCESS = '[BGUARD_STATE] [CREATE_ORDER] ON_CREATE_ORDER_SUCCESS';
export const ON_CREATE_ORDER_FAILED = '[BGUARD_STATE] [CREATE_ORDER] ON_CREATE_ORDER_FAILED';
export const ON_CHECK_ORDER_RESULT_SUCCESS = '[BGUARD_STATE] [CREATE_ORDER] ON_CHECK_ORDER_RESULT_SUCCESS';
export const ON_CHECK_ORDER_RESULT_FAILED = '[BGUARD_STATE] [CREATE_ORDER] ON_CHECK_ORDER_RESULT_FAILED';
export const ON_OPEN_CM_REPORT_SUCCESS = '[BGUARD_STATE] [CM_REPORT] ON_OPEN_CM_REPORT_SUCCESS';
export const ON_OPEN_CM_REPORT_FAILED = '[BGUARD_STATE] [CM_REPORT] ON_OPEN_CM_REPORT_FAILED';

export class OnIdentificationSuccess {
  readonly type = ON_IDENTIFICATION_SUCCESS;
  constructor(public payload: GetUserInfoResponse) {}
}
export class OnIdentificationFailed {
  readonly type = ON_IDENTIFICATION_FAILED;
  constructor(public payload: GetUserInfoResponse) {}
}

export class OnSelectPhoneNumberSuccess {
  readonly type = ON_SELECT_PHONE_NUMBER_SUCCESS;
  constructor(public payload: GetUserInfoResponse) {}
}
export class OnSelectPhoneNumberFailed {
  readonly type = ON_SELECT_PHONE_NUMBER_FAILED;
  constructor(public payload: GetUserInfoResponse) {}
}

export class OnVerificationSuccess {
  readonly type = ON_VERIFICATION_SUCCESS;
  constructor(public payload: VerifyResponse) {}
}
export class OnVerificationFailed {
  readonly type = ON_VERIFICATION_FAILED;
  constructor(public payload: VerifyResponse) {}
}

export class OnSendOtpSuccess {
  readonly type = ON_SEND_OTP_SUCCESS;
  constructor(public payload: VerifyResponse) {}
}
export class OnSendOtpFailed {
  readonly type = ON_SEND_OTP_FAILED;
  constructor(public payload: VerifyResponse) {}
}

export class OnCreateOrderSuccess {
  readonly type = ON_CREATE_ORDER_SUCCESS;
  constructor(public payload: VerifyResponse) {}
}
export class OnCreateOrderFailed {
  readonly type = ON_CREATE_ORDER_FAILED;
  constructor(public payload: VerifyResponse) {}
}

export class OnCheckOrderResultSuccess {
  readonly type = ON_CHECK_ORDER_RESULT_SUCCESS;
  constructor(public payload: CheckOrderResultResponse) {}
}
export class OnCheckOrderResultFailed {
  readonly type = ON_CHECK_ORDER_RESULT_FAILED;
  constructor(public payload: CheckOrderResultResponse) {}
}

export class OnOpenCmReportSuccess {
  readonly type = ON_OPEN_CM_REPORT_SUCCESS;
  constructor(public payload: OpenCmReportResponse) {}
}
export class OnOpenCmReportFailed {
  readonly type = ON_OPEN_CM_REPORT_FAILED;
  constructor(public payload: OpenCmReportResponse) {}
}


export type Action = OnIdentificationSuccess | OnIdentificationFailed |
  OnVerificationSuccess | OnVerificationFailed |
  OnSendOtpSuccess | OnSendOtpFailed |
  OnCreateOrderSuccess | OnCreateOrderFailed |
  OnCheckOrderResultSuccess | OnCheckOrderResultFailed |
  OnSelectPhoneNumberSuccess | OnSelectPhoneNumberFailed |
  OnOpenCmReportSuccess | OnOpenCmReportFailed;
