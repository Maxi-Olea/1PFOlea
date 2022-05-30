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

  displayedColumns = ['username', 'rol', 'actions'];
  dataSource = new MatTableDataSource(this.users);


  constructor() { }

  ngOnInit(): void {
  }

  onClickAdd() { //Emite el evento para renderizar el form para agregar un curso nuevo
    this.viewOption.emit('add-user');
  }

  onClickEdit(user: User) {
    console.log('elemtno recibido: ', user)
    this.editUser.emit(user)
  }

  onClickDelete(user: User) {
    /* Se busca el elemento por el id en el array de cursos,
    Se elimina por el index, y luego usando el ViewChild, se renderiza de nuevo la tabla.
    Por ultimo, emitimos el valor de usersUpdated al padre */
    console.log('elemento: ', user)
    
  }

  applyFilter(event: Event) {
    console.log((event.target as HTMLInputElement).value)
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
