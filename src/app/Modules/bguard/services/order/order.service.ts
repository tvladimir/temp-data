import { Injectable } from '@angular/core';
import { BguardStateService } from '../bguard-state/bguard-state.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CreateOrderRequest } from '../../Models/CreateOrder/CreateOrderRequest.model';
import { CreateOrderResponse } from '../../Models/CreateOrder/CreateOrderResponse.model';
import { tap } from 'rxjs/operators';
import { OnCreateOrderSuccess, OnCreateOrderFailed, OnCheckOrderResultSuccess, OnCheckOrderResultFailed, OnOpenCmReportSuccess, OnOpenCmReportFailed } from '../bguard-state/bguard-state.action';
import { CheckOrderResultRequest } from '../../Models/CheckOrderResult/CheckOrderResultRequest.model';
import { CheckOrderResultResponse } from '../../Models/CheckOrderResult/CheckOrderResultResponse.model';
import { OpenCmReportResponse } from '../../Models/OpenCmReport/OpenCmReportResponse.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private baseApiUrlIdentificationControler: string;
  constructor(
    private bguardStateService: BguardStateService,
    private httpClient: HttpClient,
    ) {
    this.baseApiUrlIdentificationControler = `${environment.baseApiUrl}/Order`;
  }

  CreateOrder(req: CreateOrderRequest): Promise<CreateOrderResponse> {
    return this.httpClient.post(`${this.baseApiUrlIdentificationControler}/CreateOrder`, req).pipe(
      tap((res: CreateOrderResponse) => {
        if (res.IsSuccessful) {
          const bguardStateAction = new OnCreateOrderSuccess(res);
          this.bguardStateService.updateState(bguardStateAction);
        } else {
          const bguardStateAction = new OnCreateOrderFailed(res);
          this.bguardStateService.updateState(bguardStateAction);
        }
      })
    ).toPromise();
  }

  CheckOrderResult(req: CheckOrderResultRequest): Promise<CheckOrderResultResponse> {
    return this.httpClient.post(`${this.baseApiUrlIdentificationControler}/CheckOrderResult`, req).pipe(
      tap((res: CheckOrderResultResponse) => {
        if (res.IsSuccessful) {
          const bguardStateAction = new OnCheckOrderResultSuccess(res);
          this.bguardStateService.updateState(bguardStateAction);
        } else {
          const bguardStateAction = new OnCheckOrderResultFailed(res);
          this.bguardStateService.updateState(bguardStateAction);
        }
      })
    ).toPromise();
  }

  OpenCmReport(req: CreateOrderRequest): Promise<OpenCmReportResponse> {
    return this.httpClient.post(`${this.baseApiUrlIdentificationControler}/OpenCmReport`, req).pipe(
      tap((res: OpenCmReportResponse) => {
        if (res.IsSuccessful) {
          const bguardStateAction = new OnOpenCmReportSuccess(res);
          this.bguardStateService.updateState(bguardStateAction);
        } else {
          const bguardStateAction = new OnOpenCmReportFailed(res);
          this.bguardStateService.updateState(bguardStateAction);
        }
      })
    ).toPromise();
  }
}
