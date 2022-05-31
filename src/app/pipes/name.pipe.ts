import { Pipe, PipeTransform } from '@angular/core';
import { Student } from '../Interfaces/student.interface';

@Pipe({
  name: 'name'
})
export class NamePipe implements PipeTransform {

  transform(value: string, args?: string): string {
    if(args) {
      return `${ args.toUpperCase() }, ${ value }`
    }
    return value;
  }

}
