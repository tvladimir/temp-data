import { BaseResponse } from '../Base/BaseResponse.model';

export interface SendOTPResponse extends BaseResponse {
  Token: string;
}
