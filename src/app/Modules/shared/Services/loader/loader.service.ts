import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  public isShow = false;
  public isMessageShow = false;
  public isNoOpacity = false;

  constructor() { }

  changeState(isShow, isMessageShow = false, isNoOpacity = false) {
    this.isShow = isShow;
    this.isMessageShow = isMessageShow;
    this.isNoOpacity = isNoOpacity;
  }
}
