import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition, query } from '@angular/animations';
import { EventsService } from 'src/app/services/events.service';
import { UtilitiesService } from 'src/app/services/utilities.service';

@Component({
  selector: 'app-responsive',
  templateUrl: './responsive.component.html',
  styleUrls: ['./responsive.component.css']
})
export class ResponsiveComponent implements OnInit {

  responsiveWebText = ["I can do responsive sites as well, just check it from your smartphone.",
    "También puedo hacerlo responsivo, fijate desde el celu."];

  responsiveMobileText = ["I can do responsive sites as well, just check it from your computer.",
    "También puedo hacerlo responsivo, fijate desde la compu."]

  button = ['Continue', 'Continuar'];

  constructor(public utilitiesService: UtilitiesService) { }

  ngOnInit() {
    this.utilitiesService.introPage = false;
    if (navigator.userAgent.match(/Android/i)
      || navigator.userAgent.match(/webOS/i)
      || navigator.userAgent.match(/iPhone/i)
      || navigator.userAgent.match(/iPad/i)
      || navigator.userAgent.match(/iPod/i)
      || navigator.userAgent.match(/BlackBerry/i)
      || navigator.userAgent.match(/Windows Phone/i)
    ) {
      document.getElementById("onlyMobile").style.display = "block";
      document.getElementById("onlyWeb").style.display = "none";
    }
    if (this.utilitiesService.fisrtLog.responsive) {
      setTimeout(() => {
        this.showButton();
      }, 1000);
      this.utilitiesService.changeFirstLog("responsive");
    } else {
      this.showButton();
    }
  }

  showButton() {
    document.getElementById('continueButton').style.visibility = 'visible';
    document.getElementById('continueButton').style.opacity = '1';
  }

}
