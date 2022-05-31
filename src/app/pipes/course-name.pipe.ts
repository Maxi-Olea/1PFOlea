import { Pipe, PipeTransform } from '@angular/core';
import { Courses } from '../Interfaces/courses.interface';

@Pipe({
  name: 'courseName'
})
export class CourseNamePipe implements PipeTransform {

  transform(value: string, args?: string): string {
    return `${value.toLowerCase()}`;
  }

}
