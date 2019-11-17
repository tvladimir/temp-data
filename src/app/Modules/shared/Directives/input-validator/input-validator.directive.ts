import { Directive, Attribute } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';

export class ValidatorConst {
  private static readonly PHONE_MOBILE_PREFIX = '0(5[0,2,3,4,7,8,9,5]|7[2,3,4,6,7,8]|[2,3,4,8,9])';
  private static readonly PHONE_PREFIX = '0(7[2,3,4,6,7,8]|[2,3,4,8,9])';
  private static readonly VAS_NUMBER_PREFIX = '24';
  private static readonly MOBILE_PREFIX = '0(5[0,2,3,4,7,8,9,5])';
  public static readonly PATTERN = {
    phone_prefix: '^' + ValidatorConst.PHONE_PREFIX + '$',
    phoneMOBILE_PREFIX: '^' + ValidatorConst.PHONE_MOBILE_PREFIX + '$',
    mobile_prefix: '^' + ValidatorConst.MOBILE_PREFIX + '$',
    phone: /^[2-9]\\d{6}$/,
    fullphone: '^' + ValidatorConst.PHONE_PREFIX + '[2-9]\\d{6}$',
    fullphoneOrVasNumber: '^' + '((' + ValidatorConst.VAS_NUMBER_PREFIX + ')|(' + ValidatorConst.PHONE_PREFIX + '))[0-9]\\d{6}$',
    mobilephone: '^' + ValidatorConst.MOBILE_PREFIX + '[2-9]\\d{6}$',
    // tslint:disable-next-line:max-line-length
    email: 	/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9_\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/,
    fname: /^[a-zA-Z\u0590-\u05fe]+[a-zA-Z\u0590-\u05fe]+[a-zA-Z\u0590-\u05fe ]{0,58}$/,
    lname: /^[a-zA-Z\u0590-\u05fe]+[a-zA-Z\u0590-\u05fe]+[a-zA-Z\u0590-\u05fe ]{0,58}$/,
    zipcode: /^[\d]{5}(\d{2})?$/,
    number: /^\d+$/,
    creditCard: /^\d{4}$/,
    datetime: /^\\d{4}\-\\d{2}\-\\d{2} \\d{2}:\\d{2}:\\d{2}$/,
    decimal: /^(?=.?\d)\d*(\.\d{0,9})?$/,
    // hebrew:/^[u1488-\u1514]+$/i,
    // hebrew:/[\u0590–\u05FF]/,
    supplierNumber: /^[A-Za-z0-9 _.-/]+$/,
    otpCode: /^\d{6}$/
  };
}


@Directive({
  selector: '[bzInputValidator]'
})
export class InputValidatorDirective {

  constructor( @Attribute('bzInputValidator') public typeInput: string ) { }

  validate(currentControl: AbstractControl): { [key: string]: any } {
    const currentValue = currentControl.value;
    let returnValue: any = false;
    switch (this.typeInput) {

      case 'idnumber':
        returnValue = !IsIDNumberValidator(currentValue) ? { b_error: true } : false;
        break;
      case 'tenNumbersOnly':
        returnValue = !TenNumbersOnlyValidator(currentValue) ? { b_error: true } : false;
        break;

      default:
        const regex = new RegExp(ValidatorConst.PATTERN[this.typeInput]);
        const isValidInput = regex.test(currentValue);

        returnValue = (isValidInput || !currentValue)  ?  false : { b_error: true };
        break;
    }

    return returnValue ? returnValue : null;
  }

}

export function InputValidator(typeInput: string): ValidatorFn {
  return (currentControl: AbstractControl): { [key: string]: boolean } | null => {
    const currentValue = currentControl.value || '';
    let returnValue: any = false;
    switch (typeInput) {

      case 'idnumber':
        returnValue = !IsIDNumberValidator(currentValue) ? { b_error: true } : false;
        break;

      case 'emailormobile':
        // tslint:disable-next-line:variable-name
        const _regex = currentValue.indexOf('@') === -1 ? new RegExp(ValidatorConst.PATTERN.mobilephone) :
                                                          new RegExp(ValidatorConst.PATTERN.email);
        // tslint:disable-next-line:variable-name
        const _isValidInput = _regex.test(currentValue);
        returnValue = (_isValidInput || !currentValue)  ?  false : { b_error: true };
        break;

      default:
        const regex = new RegExp(ValidatorConst.PATTERN[typeInput]);
        const isValidInput = regex.test(currentValue);
        returnValue = (isValidInput || !currentValue)  ?  false : { b_error: true };
        break;

    }
    return returnValue ? returnValue : null;
  };
}

export function IsIDNumberValidator(value: string) {
  let isIDValid = true;
  if ( value ) {
    if ( value.length > 0 ) {
      isIDValid = (value.length === 9);
      if (isIDValid) {
        const tempValue: string =  JSON.parse(JSON.stringify( value ));
        let mone = 0;
        for (let i = 0; i < 9; i++) {
          let incNum = (parseInt(tempValue[i]) || 0 ) * ((i % 2) + 1);
          if (incNum > 9) {
            incNum -= 9;
          }
          mone += incNum;
        }
        isIDValid = (mone % 10 === 0) ? true : false;
      }
    }

  }
  return isIDValid;
}

export function TenNumbersOnlyValidator(value: string) {
  let isPhoneValid = false;
  if ( value ) {
    // console.log(value);
    if ( value.length > 0 ) {
        isPhoneValid = value.length === 10 ;
    }

  }
  return isPhoneValid;
}
