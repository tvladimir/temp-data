import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'bz-insert-payment-numbers',
  templateUrl: './insert-payment-numbers.component.html',
  styleUrls: ['./insert-payment-numbers.component.scss']
})
export class InsertPaymentNumbersComponent implements OnInit {
  @Input() verificationForm: FormGroup;
  @Input() errorData: {isError: boolean, errorMessage: string};
  @Output() bzOnSubmit = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
  }

  onSubmit() {
    this.bzOnSubmit.emit();
  }

}
