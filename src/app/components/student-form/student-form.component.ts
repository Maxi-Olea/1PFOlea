import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Student } from 'src/app/Interfaces/student.interface';


@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss']
})
export class StudentFormComponent implements OnInit {

  studentForm: FormGroup;

  @Input() studentToEdit!:Student|null; //Este es el estudiante que recibimos desde app component para editar su información
  @Output() studentAdded = new EventEmitter<Student>() //Estudiante agregado en el form y que enviamos al app component (de hijo a padre)
  @Output() studentEdited = new EventEmitter<Student>() //Estudiante editado en el form y que enviamos al app component (de hijo a padre)

  constructor(
    private fb: FormBuilder
  ) { 
    this.studentForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(15)]],
      email: ['', [Validators.required, Validators.email]],
      birthday: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
    if(this.studentToEdit) {
      this.studentForm.get('name')?.patchValue(this.studentToEdit.name)
      this.studentForm.get('lastname')?.patchValue(this.studentToEdit.lastname)
      this.studentForm.get('email')?.patchValue(this.studentToEdit.email)
      this.studentForm.get('birthday')?.patchValue(this.studentToEdit.birthday)
    }
  }

  onSubmit() {
    /*Evalua si el elemento es nuevo o a editar, si es nuevo => emite studentAdded.
    Si es a editar emite el studentEdited*/
    if(!this.studentToEdit){
      this.studentAdded.emit(this.studentForm.value);
    }else{
      this.studentForm.value['id']=this.studentToEdit.id
      let student=this.studentForm.value;
      this.studentEdited.emit(student);
    }
  }

}
