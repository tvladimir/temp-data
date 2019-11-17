import { Injectable } from '@angular/core';
import { GetUserInfoResponse } from '../../Models/Identification/GetUserInfoResponse.model';
import { BehaviorSubject } from 'rxjs';

import * as BguardStateAction from './bguard-state.action';
import { VerifyResponse } from '../../Models/Verify/VerifyResponse.model';

export interface IBguardState {
  Token: string;
  userInfo: GetUserInfoResponse;
  verificationUserInfo: VerifyResponse;
  createOrderAnswerNumber: number;
  VendorUrl: string;
  errorMessage: string;
}


@Injectable({
  providedIn: 'root'
})
export class BguardStateService {

  private historyBguardState = new Array<[string, IBguardState]>();
  private _bguardState: BehaviorSubject<IBguardState>;

  get storeState() {
    return this._bguardState.asObservable();
  }

  get currentState() {
    return this._bguardState.getValue();
  }

  constructor() {
    this._bguardState = new BehaviorSubject<IBguardState>({
      Token: '',
      userInfo: {},
      verificationUserInfo: {},
      createOrderAnswerNumber: 0,
      VendorUrl: '',
      errorMessage: ''
    });

  }

  updateState(action: BguardStateAction.Action) {
    switch (action.type) {
      case BguardStateAction.ON_IDENTIFICATION_SUCCESS: {
        const newState = {
          ...this.currentState,
          Token: action.payload.Token,
          userInfo: {
            ...action.payload
          }
        };
        this._bguardState.next(newState);
        this.historyBguardState.push([action.type, this._bguardState.getValue()]);
        break;
      }
      case BguardStateAction.ON_IDENTIFICATION_FAILED: {
        const newState = {
          ...this.currentState,
          Token: action.payload.Token,
          userInfo: {
            ...action.payload
          }
        };
        this._bguardState.next(newState);
        this.historyBguardState.push([action.type, this._bguardState.getValue()]);
        break;
      }
      case BguardStateAction.ON_SELECT_PHONE_NUMBER_SUCCESS: {
        const newState = {
          ...this.currentState,
          Token: action.payload.Token,
          userInfo: {
            ...action.payload
          }
        };
        this._bguardState.next(newState);
        this.historyBguardState.push([action.type, this._bguardState.getValue()]);
        break;
      }
      case BguardStateAction.ON_SELECT_PHONE_NUMBER_FAILED: {
        const newState = {
          ...this.currentState,
          Token: action.payload.Token,
          userInfo: {
            ...action.payload
          }
        };
        this._bguardState.next(newState);
        this.historyBguardState.push([action.type, this._bguardState.getValue()]);
        break;
      }
      case BguardStateAction.ON_VERIFICATION_SUCCESS: {
        const newState = {
          ...this.currentState,
          Token: action.payload.Token,
          verificationUserInfo: {
            ...action.payload
          },
          errorMessage: action.payload.errorToErrorPage
        };
        this._bguardState.next(newState);
        this.historyBguardState.push([action.type, this._bguardState.getValue()]);
        break;
      }
      case BguardStateAction.ON_VERIFICATION_FAILED: {
        const newState = {
          ...this.currentState,
          Token: action.payload.Token,
          verificationUserInfo: {
            ...action.payload
          },
          errorMessage: action.payload.errorToErrorPage
        };
        this._bguardState.next(newState);
        this.historyBguardState.push([action.type, this._bguardState.getValue()]);
        break;
      }
      case BguardStateAction.ON_SEND_OTP_SUCCESS: {
        const newState = {
          ...this.currentState,
          Token: action.payload.Token,
        };
        this._bguardState.next(newState);
        this.historyBguardState.push([action.type, this._bguardState.getValue()]);
        break;
      }
      case BguardStateAction.ON_SEND_OTP_FAILED: {
        const newState = {
          ...this.currentState,
          Token: action.payload.Token,
        };
        this._bguardState.next(newState);
        this.historyBguardState.push([action.type, this._bguardState.getValue()]);
        break;
      }
      case BguardStateAction.ON_CREATE_ORDER_SUCCESS: {
        const newState = {
          ...this.currentState,
          Token: action.payload.Token,
        };
        this._bguardState.next(newState);
        this.historyBguardState.push([action.type, this._bguardState.getValue()]);
        break;
      }
      case BguardStateAction.ON_CREATE_ORDER_FAILED: {
        const newState = {
          ...this.currentState,
          Token: action.payload.Token,
        };
        this._bguardState.next(newState);
        this.historyBguardState.push([action.type, this._bguardState.getValue()]);
        break;
      }
      case BguardStateAction.ON_CHECK_ORDER_RESULT_SUCCESS: {
        const newState = {
          ...this.currentState,
          Token: action.payload.Token,
          createOrderAnswerNumber: action.payload.AnswerNumber,
          VendorUrl: action.payload.VendorUrl
        };
        this._bguardState.next(newState);
        this.historyBguardState.push([action.type, this._bguardState.getValue()]);
        break;
      }
      case BguardStateAction.ON_CHECK_ORDER_RESULT_FAILED: {
        const newState = {
          ...this.currentState,
          createOrderAnswerNumber: action.payload.AnswerNumber,
          Token: action.payload.Token,
        };
        this._bguardState.next(newState);
        this.historyBguardState.push([action.type, this._bguardState.getValue()]);
        break;
      }
      case BguardStateAction.ON_OPEN_CM_REPORT_SUCCESS: {
        const newState = {
          ...this.currentState,
          Token: action.payload.Token
        };
        this._bguardState.next(newState);
        this.historyBguardState.push([action.type, this._bguardState.getValue()]);
        break;
      }
      case BguardStateAction.ON_OPEN_CM_REPORT_FAILED: {
        const newState = {
          ...this.currentState,
          Token: action.payload.Token
        };
        this._bguardState.next(newState);
        this.historyBguardState.push([action.type, this._bguardState.getValue()]);
        break;
      }
    }
    console.log('newStateAction: ', action.type);
    // console.log('newStatePayload: ', action.payload);
    console.log('newState: ', this.currentState);
  }
}
