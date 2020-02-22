import { Pipe, PipeTransform, asNativeElements } from '@angular/core';

@Pipe({
  name: 'socialSecurity'
})
export class SocialSecurityPipe implements PipeTransform {

  transform(value: number, ...args: any[]): any {
    let arr = value.toString().split('');
    let ans = [];
    ans.push(arr[0], arr[1], arr[2], '-', arr[3], arr[4], '-', arr[5], arr[6], arr[7], arr[8]);
    return ans.join('');
  }

}
