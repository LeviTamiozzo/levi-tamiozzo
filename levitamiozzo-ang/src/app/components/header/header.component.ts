import { Component, OnInit, OnDestroy } from '@angular/core';
import { UtilitiesService } from '../../services/utilities.service';
import { Subscription } from 'rxjs';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  name = "";
  subscription: Subscription;

  navbar = {
    intro: ["Intro", "Intro"],
    fastLearner: ['Learning', "Aprendizaje"],
    responsive: ["Responsive", "Responsivo"],
    dataCares: ["Data", "Datos"],
    skills: ["Skills", "Conocimientos"],
    login: ["Login", "Iniciar Sesión"],
    logOut: ["Logout", "Cerrar Sesión"],
    hi: ["Hi", "Hola"],
    contact: ["Contact me", "Contacto"]
  }  

  constructor(public utilitiesService: UtilitiesService, public eventsService: EventsService) {
    this.subscription = this.eventsService.listenEvent().subscribe(code => {
      if (code.name) {
        this.name = code.name;
      } else {
        this.name = "";
      }
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    this.name = localStorage.getItem("name");
  }

  logOut() {
    localStorage.removeItem("userId")
    localStorage.removeItem("name");
    localStorage.removeItem("email")
    this.eventsService.sendEvent("", "");
  }

  toggleSidebar() {
    document.getElementById('wrapper').classList.toggle('activeBar');    
  }
}
