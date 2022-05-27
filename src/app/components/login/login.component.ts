import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @Output() isLoggedIn: EventEmitter<boolean> = new EventEmitter();

  users = [
    { username: 'Admin', password: 'admin1234', rol: 'admin' },
    { username: 'User1', password: 'user1234', rol: 'user' }
  ];
  
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(10)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]]
    })
   }

  ngOnInit(): void {
  }

  login() {
    console.log('IsLoggedIn: ', this.isLoggedIn)
    console.log('El formulario es: ', this.loginForm.value)
    const userData = this.users.find(user => user.username === this.loginForm.get('username')?.value)
    console.log('userData: ', userData)
    if(userData?.password === this.loginForm.get('password')?.value) {
      console.log('Las contraseñas coinciden')
      this.isLoggedIn.emit(true)
      console.log('IsLoggedIn: ', this.isLoggedIn)
    }else {
      console.log('Las contraseñas no coinciden')
    }
    // switch(this.loginForm.get('username')?.value) {
    //   case 'Admin':
    //     console.log('El usuario logueado es el Admin')
    //     this.validateUser('Admin')
    //     console.log(this.isLoggedIn)
    //     break;
    //   case 'User1':
    //     console.log('El usuario logueado es User1')
    //     this.validateUser('User1')
    //     console.log(this.isLoggedIn)
    //     break;
    //   default:
    //     console.log('El usuario no es valido')
    //     break;
    // }
  }

  // validateUser(username: string) {
  //   const userData = this.users.find(user => user.username === username)
  //   console.log('userData: ', userData)
  //   if(userData?.password === this.loginForm.get('password')?.value) {
  //     console.log('Las contraseñas coinciden')
  //     this.isLoggedIn = true;
  //   }else {
  //     console.log('Las contraseñas no coinciden')
  //   }
  //}

}
