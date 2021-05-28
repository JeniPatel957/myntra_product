import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'unique'
})
export class UniqueFilterPipe implements PipeTransform {

  transform(arr: any, field?: any): any {
    arr = arr || [];
    var o = [], i, l = arr.length, r = [];
    for (i = 0; i < l; i += 1) {
      o[arr[i][field]] = arr[i];
    }
    for (i in o) {
      r.push(o[i]);
    }
    return r;
  }

}
