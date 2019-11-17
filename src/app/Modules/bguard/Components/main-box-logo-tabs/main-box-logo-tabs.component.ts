import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';

@Component({
  selector: 'bz-main-box-logo-tabs',
  templateUrl: './main-box-logo-tabs.component.html',
  styleUrls: ['./main-box-logo-tabs.component.scss']
})
export class MainBoxLogoTabsComponent implements OnInit {

  @Input() rightTabLabel = '';
  @Input() leftTabLabel = '';
  @Output() mhSelectedTabChange = new EventEmitter<string>();
  constructor() { }

  ngOnInit() {
  }

  selectedTabChange(event: MatTabChangeEvent) {
    this.mhSelectedTabChange.emit(event.tab.textLabel);
  }
}
