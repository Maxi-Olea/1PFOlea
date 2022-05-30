import { Component } from '@angular/core';
import { Student } from './Interfaces/student.interface';
import { User } from './Interfaces/user.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'PrimerPFOlea';
  isLoggedIn: boolean = true;
  users:User[] = [ //Datos de usuarios para login
    { username: 'Admin', password: 'admin1234', rol: 'admin' },
    { username: 'User1', password: 'user1234', rol: 'user' }
  ];
  userData:User = {username:'',rol: 'admin'};
  addStudent:boolean = false;
  studentToEdit!:Student|null; //Propiedad que utilizamos para pasar los datos del estudiante a editar
  studentsData: Student[] = [ //Datos de los estudiantes que se envía al componente StudentsList
    {id: 1, name: 'Juan', lastname: 'Lopez', email: 'jlopez@mail.com', cursos: [1]},
    {id: 2, name: 'Pedro', lastname: 'Perez', email: 'pperez@mail.com', cursos: [1, 3]},    
  ]; 

  checkLogin(e:User) {
    console.log('Evento recibido', e)
    this.isLoggedIn = true;
    this.userData = e
  }

  logout(e:boolean) {
    this.isLoggedIn = e
  }

  showHome(e: boolean) {
    this.addStudent = false;
  }

  onPassAddStudent(e:boolean) { //Pasa al formulario para agregar un estudiante y dejamos en null el studentToEdit
    if(e) {
      this.addStudent = true;
      this.studentToEdit = null;
    }
  }

  onAddStudent(e:Student) { //En este metodo se hace un update de los estudiantes y además que se modifica el id manualmente por el front
    console.log('evento recibido: ', e)
    let index=1;
    if(this.studentsData.length>0){
      index=this.studentsData.length+1;
      e['id']=index;
      this.studentsData.push(e);
    }else{
      e['id']=index;
      this.studentsData.push(e)
    }
    this.addStudent=false;
  }

  onPassEditStudent(e:Student) { //Le asignamos al studentToedit los datos del estudiante a editar y pasa a formulario
    console.log('estudiante recibido que se va a editar: ', e);
    if(e) {
      this.addStudent= true;
      this.studentToEdit = e;
    }
  }

  onStudentEdit(e:Student){
    /*Una vez editado, se busca en la data que se le pasa a la tabla, cual es el elemento editado
    Y le cambia el valor*/
    let index=this.studentsData.findIndex((x:Student)=>x.id===e.id);
    this.studentsData[index]=e;
    this.addStudent=false;
  }

  onUpdateDeleteStudents(el:any) {
    /* Una vez editado por el delete, 
    se modifican los ids (para evitar errores en delete) y ademas hace un update del valor de data */
    el.forEach((el:any,index:number)=>{
      el['id']=index+1
    })
    this.studentsData=el;
  }
}
