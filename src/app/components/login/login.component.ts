import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/Interfaces/user.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @Input() users: User[] = [];
  @Output() isLoggedIn: EventEmitter<User> = new EventEmitter();

  
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _snackBar: MatSnackBar
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(10)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]]
    })
   }

  ngOnInit(): void {
  }

  login() {
    const userData = this.users.find(user => user.username === this.loginForm.get('username')?.value)
    if(userData?.password === this.loginForm.get('password')?.value) {
      const userLogged:User = {username:userData!.username, rol:userData!.rol}
      this.isLoggedIn.emit(userLogged)
    }else {
      this.openToast()
      this.loginForm.reset()
    }
  }

  openToast() {
    this._snackBar.open('El usuario y/o la contraseña ingresadas son incorrectas', 'Cerrar')
  }

}
