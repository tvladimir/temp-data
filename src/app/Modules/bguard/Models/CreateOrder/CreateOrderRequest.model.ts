import { BaseResponse } from '../Base/BaseResponse.model';

export interface CreateOrderRequest extends BaseResponse {
  Token?: string;
  Email?: string;
  Cellular?: string;
  isSpamAccept?: boolean;
}
