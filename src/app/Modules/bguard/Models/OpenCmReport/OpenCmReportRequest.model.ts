import { BaseRequest } from '../Base/BaseRequest.model';

export interface OpenCmReportRequest extends BaseRequest {
  Token?: string;
  Email?: string;
  Cellular?: string;
  isSpamAccept?: boolean;
}
