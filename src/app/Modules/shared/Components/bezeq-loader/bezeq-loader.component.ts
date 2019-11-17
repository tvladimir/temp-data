import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../../Services/loader/loader.service';

@Component({
  selector: 'bz-bezeq-loader',
  templateUrl: './bezeq-loader.component.html',
  styleUrls: ['./bezeq-loader.component.scss']
})
export class BezeqLoaderComponent implements OnInit {

  constructor(
    public loaderService: LoaderService
  ) { }

  ngOnInit() {
  }

}
