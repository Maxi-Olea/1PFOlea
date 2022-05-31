import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Student } from 'src/app/Interfaces/student.interface';
import { User } from 'src/app/Interfaces/user.interface';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.scss']
})
export class StudentsListComponent implements OnInit {

  @Input() students: Student[] = []; //Datos de los estudiantes que recibimos desde el app component (Padre)
  @Input() user!: User; //Datos del usuario logueado recibidos del app component (padre)
  @ViewChild('table') table!: MatTable<any>;
  @Output() studentsUpdated = new EventEmitter<Student[] | null>(); //Array de estudiantes que se envia al app component (de hijo al padre)
  @Output() editStudent = new EventEmitter<Student>();
  @Output() addInscription = new EventEmitter<Student>();
  
  displayedColumns = ['id', 'name', 'courses', 'actions'];
  dataSource = new MatTableDataSource(this.students);

  constructor() { }

  ngOnInit(): void {
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onDeleteStudent(el:any) {
    /* Se busca el elemento por el id en el array de productos,
    Se elimina por el index, y luego usando el ViewChild, se renderiza de nuevo la tabla.
    Por ultimo, emitimos el valor de productosUpdated al padre */
    let index=this.students.findIndex(x=> x.id===el.id);
    this.students.splice(index,1);
    this.table.renderRows();
    this.studentsUpdated.emit(this.students);
  }

  onClickEdit(student:Student) { //Emite un evento al app component con los datos del estudiante a editar
    this.editStudent.emit(student)
  }

  onClickInscription(student:Student) {
    this.addInscription.emit(student)
  }

}
