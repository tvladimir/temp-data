import { BaseResponse } from '../Base/BaseResponse.model';

export interface CreateOrderResponse  extends BaseResponse {
  Token?: string;
}
