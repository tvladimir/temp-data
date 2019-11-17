import { BaseRequest } from '../Base/BaseRequest.model';

export interface CheckOrderResultRequest extends BaseRequest {
  Token?: string;
  OpenOrderToken?: string;
  CountCheck?: number;
}
