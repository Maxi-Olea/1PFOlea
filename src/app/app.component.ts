import { Component } from '@angular/core';
import { Courses } from './Interfaces/courses.interface';
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
  viewOption: string = 'users'; //Propiedad que define el componente a renderizar

  userData:User = {username:'lala', rol:'admin'}
  //addStudent:boolean = false;
  addUser:boolean = false;
  studentToEdit!:Student|null; //Propiedad que utilizamos para pasar los datos del estudiante a editar
  courseToEdit!: Courses|null; //Propiedad que utilizamos para pasar el curso a editar

  users:User[] = [ //Datos de usuarios para login
    { username: 'Admin', password: 'admin1234', rol: 'admin' },
    { username: 'User1', password: 'user1234', rol: 'user' }
  ];
  courses: Courses[] = [ //Datos de los cursos a listar que se envian al componente coursesList
    {id:1, course: 'Angular'},
    {id:2, course: 'React'},
    {id:3, course: 'Vue'},
    {id:4, course: 'Nodejs'},
    {id:5, course: 'Python'},
    {id:6, course: 'Java'},
  ];    
  studentsData: Student[] = [ //Datos de los estudiantes que se envía al componente StudentsList
    {id: 1, name: 'Juan', lastname: 'Lopez', email: 'jlopez@mail.com', cursos: [1]},
    {id: 2, name: 'Pedro', lastname: 'Perez', email: 'pperez@mail.com', cursos: [1, 3]},    
  ]; 

  //METODOS

  checkLogin(e:User) {
    console.log('Evento recibido', e)
    this.isLoggedIn = true;
    this.userData = e
  }

  logout(e:boolean) {
    this.isLoggedIn = e
  }

  onViewOption(option: string) { //Recibe el evento y setea el componente a renderizar
    this.viewOption = option
    this.studentToEdit = null
    this.courseToEdit = null
  }



  onAddUser(user:User) { //Este metodo hace el update de los users de la aplicacion
    console.log('usuario recibido: ', user)
    this.users.push(user)
    console.log('los usuaruios registrados son: ', this.users);
    this.addUser = false;
  }

  // onPassAddStudent(e:boolean) { //Pasa al formulario para agregar un estudiante y dejamos en null el studentToEdit
  //   this.viewOption = 'add-student'
  //   if(e) {
  //     this.addStudent = true;
  //     this.addUser = false;
  //     this.studentToEdit = null;
  //   }
  // }

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
    this.viewOption = 'home'
  }

  onPassEditStudent(e:Student) { //Le asignamos al studentToedit los datos del estudiante a editar y pasa a formulario
    console.log('estudiante recibido que se va a editar: ', e);
    if(e) {
      this.viewOption = 'add-student'
      this.studentToEdit = e;
    }
  }

  onStudentEdit(e:Student){
    /*Una vez editado, se busca en la data que se le pasa a la tabla, cual es el elemento editado
    Y le cambia el valor*/
    let index=this.studentsData.findIndex((x:Student)=>x.id===e.id);
    this.studentsData[index]=e;
    this.viewOption = 'home'
  }

  onUpdateDeleteStudents(el:any) {
    /* Una vez editado por el delete, 
    se modifican los ids (para evitar errores en delete) y ademas hace un update del valor de data */
    el.forEach((el:any,index:number)=>{
      el['id']=index+1
    })
    this.studentsData=el;
  }

  onAddCourse(e:Courses) { //En este metodo se hace un update de los cursos y además que se modifica el id manualmente por el front
    console.log('evento recibido: ', e)
    let index=1;
    if(this.courses.length>0){
      index=this.courses.length+1;
      e['id']=index;
      this.courses.push(e);
    }else{
      e['id']=index;
      this.courses.push(e)
    }
    this.viewOption = 'courses'
  }

  onPassEditCourse(e:Courses) { //Le asignamos al courseToedit los datos del curso a editar y pasa a formulario
    console.log('estudiante curso que se va a editar: ', e);
    if(e) {
      this.viewOption = 'add-course'
      this.courseToEdit = e;
    }
  }

  onCourseEdit(e:Courses){
    /*Una vez editado, se busca en la data que se le pasa a la tabla, cual es el elemento editado
    Y le cambia el valor*/
    let index=this.courses.findIndex((x:Courses)=>x.id===e.id);
    this.courses[index]=e;
    this.viewOption = 'courses'
  }

  onUpdateDeleteCourses(courses:any) {
    /* Una vez editado por el delete, 
    se modifican los ids (para evitar errores en delete) y ademas hace un update del valor de data */
    courses.forEach((el:any,index:number)=>{
      el['id']=index+1
    })
    this.courses=courses;
  }

}
