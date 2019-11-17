import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'bz-main-box-image-header',
  templateUrl: './main-box-image-header.component.html',
  styleUrls: ['./main-box-image-header.component.scss']
})
export class MainBoxImageHeaderComponent implements OnInit {

  @Input() public headerImage = '';
  constructor() { }

  ngOnInit() {
  }

}
