import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'PrimerPFOlea';
  isLoggedIn: boolean = false;

  checkLogin(e:boolean) {
    console.log('Evento recibido', e)
    this.isLoggedIn = e;
  }
}
