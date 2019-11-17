import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { IBguardState } from '../../services/bguard-state/bguard-state.service';

@Component({
  selector: 'bz-send-sms-identity-code',
  templateUrl: './send-sms-identity-code.component.html',
  styleUrls: ['./send-sms-identity-code.component.scss']
})
export class SendSmsIdentityCodeComponent implements OnInit {

  @Output() bzOnSubmit = new EventEmitter<any>();
  @Input() errorData: {isError: boolean, errorMessage: string};
  @Input() currentBguardState: IBguardState;
  constructor() { }

  ngOnInit() {
  }

  onSubmit() {
    this.bzOnSubmit.emit();
  }

}
