import { BaseRequest } from '../Base/BaseRequest.model';

export interface SendOTPRequest extends BaseRequest {
  Token: string;
}
