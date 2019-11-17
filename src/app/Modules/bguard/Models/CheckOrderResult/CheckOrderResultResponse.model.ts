import { BaseResponse } from '../Base/BaseResponse.model';

export interface CheckOrderResultResponse extends BaseResponse {
  Token?: string;
  isContinueCheck?: boolean;
  AnswerNumber?: number;
  CountCheck?: number;
  VendorUrl?: string;
}
