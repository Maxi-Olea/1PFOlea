import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/Interfaces/user.interface';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  @Input() usr!:User;
  @Input() users!:User[];
  @Output() viewOption = new EventEmitter<string>();
  @Output() editUser = new EventEmitter<User>();
  @ViewChild('table') table!: MatTable<any>;
  @Output() usersUpdated = new EventEmitter<User[] | null>(); //Array de cursos que se envia al app component (de hijo al padre)

  displayedColumns = ['id', 'username', 'rol', 'actions'];
  dataSource = new MatTableDataSource(this.users);


  constructor() { }

  ngOnInit(): void {
  }

  onClickAdd() { //Emite el evento para renderizar el form para agregar un curso nuevo
    this.viewOption.emit('add-user');
  }

  onClickEdit(user: User) {
    this.editUser.emit(user)
  }

  onClickDelete(user: User) {
    /* Se busca el elemento por el id en el array de cursos,
    Se elimina por el index, y luego usando el ViewChild, se renderiza de nuevo la tabla.
    Por ultimo, emitimos el valor de usersUpdated al padre */
    let index=this.users.findIndex(x=> x.id===user.id);
    this.users.splice(index,1);
    this.table.renderRows();
    this.usersUpdated.emit(this.users);
    
  }

}
