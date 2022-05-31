import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Courses } from 'src/app/Interfaces/courses.interface';
import { Student } from 'src/app/Interfaces/student.interface';

@Component({
  selector: 'app-inscriptions-form',
  templateUrl: './inscriptions-form.component.html',
  styleUrls: ['./inscriptions-form.component.scss']
})
export class InscriptionsFormComponent implements OnInit {

  @Input() student!:Student;
  @Input() courses!:Courses[];
  @Output() studentToUpdate = new EventEmitter<Student>();

  inscriptionForm: FormGroup;

  constructor(
    private fb: FormBuilder
  ) {
    this.inscriptionForm = this.fb.group({
      course: ['', [Validators.required]]
    })
   }

  ngOnInit(): void {
  }

  onSubmit() {
      this.student.cursos?.push(this.inscriptionForm.get('course')?.value)
      this.studentToUpdate.emit(this.student)
  }

}
