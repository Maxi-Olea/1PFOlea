import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Courses } from 'src/app/Interfaces/courses.interface';
import { User } from 'src/app/Interfaces/user.interface';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent implements OnInit {

  @Input() courses!:Courses[];
  @Input() user!:User;
  @Output() viewOption = new EventEmitter<string>();
  @Output() editCourse = new EventEmitter<Courses>();
  @ViewChild('table') table!: MatTable<any>;
  @Output() coursesUpdated = new EventEmitter<Courses[] | null>(); //Array de cursos que se envia al app component (de hijo al padre)

  displayedColumns = ['id', 'name', 'actions'];
  dataSource = new MatTableDataSource(this.courses);

  constructor() { }

  ngOnInit(): void {
  }

  onClickAdd() { //Emite el evento para renderizar el form para agregar un curso nuevo
    this.viewOption.emit('add-course');
  }

  onClickEdit(course: Courses) {
    this.editCourse.emit(course)
  }

  onClickDelete(course: Courses) {
    /* Se busca el elemento por el id en el array de cursos,
    Se elimina por el index, y luego usando el ViewChild, se renderiza de nuevo la tabla.
    Por ultimo, emitimos el valor de coursesUpdated al padre */
    let index=this.courses.findIndex(x=> x.id===course.id);
    this.courses.splice(index,1);
    this.table.renderRows();
    this.coursesUpdated.emit(this.courses);
  }

}
