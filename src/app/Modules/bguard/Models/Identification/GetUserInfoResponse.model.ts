import { BaseResponse } from '../Base/BaseResponse.model';

export interface GetUserInfoResponse extends BaseResponse {
    IdentityNumber?: string;
    IsMultipleSubscribe?: boolean;
    NumberOfRecords?: string;
    Token?: string;
    ValidateByCustomerIdAllowed?: boolean;
    ValidateByBankAllowed?: boolean;
    ValidateByCreditAllowed?: boolean;
    ValidateBySMSAllowed?: boolean;
    SMSVerifiedNumber?: string;
}
