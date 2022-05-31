import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/material.module';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { StudentsListComponent } from './components/students-list/students-list.component';
import { StudentFormComponent } from './components/student-form/student-form.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { CoursesListComponent } from './components/courses-list/courses-list.component';
import { CourseFormComponent } from './components/course-form/course-form.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { NamePipe } from './pipes/name.pipe';
import { FontSizeDirective } from './directives/font-size.directive';
import { InscriptionsFormComponent } from './components/inscriptions-form/inscriptions-form.component';
import { CourseNamePipe } from './pipes/course-name.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    ToolbarComponent,
    StudentsListComponent,
    StudentFormComponent,
    UserFormComponent,
    CoursesListComponent,
    CourseFormComponent,
    UsersListComponent,
    NamePipe,
    FontSizeDirective,
    InscriptionsFormComponent,
    CourseNamePipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
