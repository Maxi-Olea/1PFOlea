import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Student } from 'src/app/Interfaces/student.interface';
import { User } from 'src/app/Interfaces/user.interface';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Input() user:User = {username:'', rol:''};
  @Output() addStudent = new EventEmitter<boolean>();
  @Output() home = new EventEmitter<boolean>();
  
  
  constructor() { }

  ngOnInit(): void {
  }

  onClickHome() { //Emite un evento al app component para que se renderice el listado de estudiantes
    this.home.emit(true);
  }

  onClickAdd() { //Emite un evento al app component para agregar a un estudiante nuevo
    this.addStudent.emit(true)
  }



}
