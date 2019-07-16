import { Component } from '@angular/core';
import { trigger, state, style, animate, transition, query } from '@angular/animations';
import { RouterOutlet } from '@angular/router';
import { slideInAnimation } from './animations/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  animations: [
    slideInAnimation
  ],
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'levi-tamiozzo';

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
