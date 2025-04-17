import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'memoteca';

  constructor(private router: Router) {
  this.router.events.subscribe(event => {
    console.log('Evento de rota:', event);
  });
}

}
