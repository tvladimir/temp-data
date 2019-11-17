import { BaseRequest } from '../Base/BaseRequest.model';

export interface VerifyRequest extends BaseRequest {
  Token?: string;
  OtpCode?: string;
  PhoneNumber?: string;
  CustomerId?: string;
  CreditCard4Digits?: string;
  BankAcount?: string;
  IsSpamNeeded?: boolean;
}
