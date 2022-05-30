import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/Interfaces/user.interface';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  @Input() user:User = {id: 0, username:'', rol:''}; //Datos del user logueado recibidos desde el app component (padre)
  @Output() logOut: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  logout() {
    this.logOut.emit(false);
  }

}
