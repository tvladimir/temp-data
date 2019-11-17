import { BaseRequest } from '../Base/BaseRequest.model';

export interface GetUserInfoRequest extends BaseRequest {
  IdentityNumber: string;
}
