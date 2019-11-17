import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'bz-insert-customer-id',
  templateUrl: './insert-customer-id.component.html',
  styleUrls: ['./insert-customer-id.component.scss']
})
export class InsertCustomerIdComponent implements OnInit {
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
