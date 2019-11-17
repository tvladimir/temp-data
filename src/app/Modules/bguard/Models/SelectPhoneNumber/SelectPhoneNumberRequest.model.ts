import { BaseRequest } from '../Base/BaseRequest.model';

export interface SelectPhoneNumberRequest extends BaseRequest {
  Token?: string;
  PhoneNumber?: string;
}
