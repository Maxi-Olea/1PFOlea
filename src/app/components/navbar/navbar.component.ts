import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/Interfaces/user.interface';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Input() user!:User;
  @Output() viewOption = new EventEmitter<string>();

  
  
  constructor() { }

  ngOnInit(): void {
  }

  onClickHome() { //Emite un evento al app component para que se renderice el listado de estudiantes
    this.viewOption.emit('home');
  }

  onClickUser(){ //Emite un evento al app component para quese renderice el form de usuarios
    this.viewOption.emit('users');
  }

  onClickAdd() { //Emite un evento al app component para agregar a un estudiante nuevo
    this.viewOption.emit('add-student')
  }

  onClickCourse() { //Emite un evento al app component para listar los cursos
    this.viewOption.emit('courses');
  }

 
}
