import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nl2pbr'
})
export class Nl2pbrPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    // return value.replace(/\n/g, '<br />');
    // value = value.replace(/(?:\r\n|\r|\n)/g, '</p><p>');
    const  newValue = value.replace(/\\r\\n|\\r|\\n/g, '<br/>');
    return newValue;
  }

}
