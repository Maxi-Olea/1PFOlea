import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/Interfaces/user.interface'

interface Rol {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  @Input() userToEdit!:User|null;
  @Input() users!:User[];
  @Output() newUser = new EventEmitter<User>(); //Usuario agregado que se envia al app component (del hijo al padre)
  @Output() userEdited = new EventEmitter<User>();

  userForm: FormGroup;
  roles:Rol[] = [{value:'admin', viewValue:'Administrador'}, {value:'user', viewValue:'Usuario'}];

  constructor(
    private fb: FormBuilder
  ) {
    this.userForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(10)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(15)]],
      checkpass: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(15)]],
      rol: ['', [Validators.required]]
    }, { validator: this.checkPassword })
   }

  ngOnInit(): void {
    if(this.userToEdit) {
      this.userForm.get('username')?.patchValue(this.userToEdit.username)
      this.userForm.get('rol')?.patchValue(this.userToEdit.rol)
    }
  }

  onSubmit() {
    /*Evalua si el elemento es nuevo o a editar, si es nuevo => emite courseAdded.
    Si es a editar emite el userEdited*/
    if(!this.userToEdit) {
      let usr:User = {
        id: this.users.length + 1,
        username: this.userForm.get('username')?.value,
        password: this.userForm.get('password')?.value,
        rol: this.userForm.get('rol')?.value
      }
      this.newUser.emit(usr);
    } else {
      this.userForm.value['id'] = this.userToEdit.id;
      let user = this.userForm.value;
      this.userEdited.emit(user);
    }
    
  }

  checkPassword(group: FormGroup): any {
    const pass = group.controls.password?.value
    const checkpass = group.controls.checkpass?.value
    return pass === checkpass ? null : { notSame: true }
  }

}
