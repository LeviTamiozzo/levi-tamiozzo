import { Component, OnInit } from '@angular/core';
import { UtilitiesService } from '../../services/utilities.service';
import { Subscription } from 'rxjs';
import { EventsService } from 'src/app/services/events.service';


@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.css']
})
export class IntroComponent implements OnInit {

  subscription: Subscription;

  textIntro = ['Hi, my name is Levi and I want to show you what can I do...',
    'Hola, mi nombre es Levi y me gustaría mostrarte qué puedo hacer...'];
  i = 0;
  textIntroTyped = "";
  button = ['Continue', 'Continuar'];
  audio = new Audio();

  constructor(public utilitiesService: UtilitiesService, public eventsService: EventsService) {
    this.subscription = this.eventsService.listenEvent2().subscribe(() => {   
      this.textIntroTyped = "";
      this.typingEffect(this.textIntro[this.utilitiesService.selectedLanguage]);
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    this.utilitiesService.introPage = true;
    this.audio.src = "../../../assets/typpingEffect.mp3";
    
    if (this.utilitiesService.fisrtLog.intro) {
      this.typingEffect(this.textIntro[this.utilitiesService.selectedLanguage]);
    } else {
      this.textIntroTyped = this.textIntro[this.utilitiesService.selectedLanguage];    
      this.showButton();
    }
  }

  showButton() {
    document.getElementById('continueButton').style.visibility = 'visible';
    document.getElementById('continueButton').style.opacity = '1';
  }

  typingEffect(text: string) {    
    this.audio.play();    
    for (let i = 0; i < text.length; i++) {
      setTimeout(() => {
        this.utilitiesService.languageDisabled = true;
      }, 50);
      setTimeout(() => {
        this.textIntroTyped += text[i];
      }, 200 + (i * 75));
      setTimeout(() => {
        this.audio.pause();
        this.showButton();
        this.utilitiesService.languageDisabled = false;
        this.utilitiesService.changeFirstLog("intro");
      }, 100 + (text.length * 75))
    }
  }
}
