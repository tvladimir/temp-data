import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WindowService {


  constructor() { }

  isMobile() {
    return window.innerWidth < 768 ;
  }
}
