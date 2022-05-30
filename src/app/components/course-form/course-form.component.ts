import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Courses } from 'src/app/Interfaces/courses.interface';


@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent implements OnInit {

  @Input() courseToEdit!:Courses|null;
  @Output() courseAdded = new EventEmitter<Courses>();
  @Output() courseEdited = new EventEmitter<Courses>(); 

  courseForm: FormGroup;

  constructor(
    private fb: FormBuilder
  ) {
    this.courseForm = this.fb.group({
      course: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]]
    })
   }

  ngOnInit(): void {
    if(this.courseToEdit) {
      this.courseForm.get('course')?.patchValue(this.courseToEdit.course)
    }
  }

  onSubmit() {
    console.log(this.courseForm.value)
    /*Evalua si el elemento es nuevo o a editar, si es nuevo => emite courseAdded.
    Si es a editar emite el courseEdited*/
    if(!this.courseToEdit){
      console.log('entre a agregar un curso')
      this.courseAdded.emit(this.courseForm.value);
    }else{
      console.log('entre a editar')
      this.courseForm.value['id']=this.courseToEdit.id
      let course=this.courseForm.value;
      this.courseEdited.emit(course);
    }
  }

}
