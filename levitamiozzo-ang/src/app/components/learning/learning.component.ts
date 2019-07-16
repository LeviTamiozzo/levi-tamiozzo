import { Component, OnInit } from '@angular/core';
import { UtilitiesService } from '../../services/utilities.service';

@Component({
  selector: 'app-learning',
  templateUrl: './learning.component.html',
  styleUrls: ['./learning.component.css']
})
export class LearningComponent implements OnInit {

  textLearning1 = ["First of all, my best virtue is that I can learn really fast."
    , "Antes que nada, mi mayor virtud es que aprendo muy rápido."];

  textLearning2 = ["Let me show you... just teach me something, anything useful that I should know.",
    "Mirá, te muestro... enseñame algo, lo que sea, algo útil que deba saber."];

  textValidation = ["I need something to learn", "Necesito algo para aprender"];

  validation = false;

  buttonText = ["Teach", "Enseñar"];

  learnedIntro = ["Thanks! Now I know that ", "Gracias! Ahora sé que "]

  learnedEnd = [" (even before you have the time to hit the button, did you see?).", " (y ni siquiera tuviste tiempo de apretar el botón, viste?)."]
  learnedEndMobile = [" (holy s... that was fast!).", " (a la m... que fue rápido!)."];
  button = ['Continue', 'Continuar'];

  lesson = "";

  constructor(public utilitiesService: UtilitiesService) { }

  ngOnInit() {
    this.utilitiesService.introPage = false;
    if (this.utilitiesService.lesson != "") {
      document.getElementById("learned").style.visibility = "visible";
    }
    if (!this.utilitiesService.fisrtLog.learning) {
      this.showButton()
    }
  }

  learn() {
    if (this.lesson.length > 0) {
      this.utilitiesService.lesson = this.lesson;
      document.getElementById("learned").style.visibility = "visible";      
      this.utilitiesService.placeholderLearning = ["Ok, enough this way, call me and I can show you more"
        , "Bueeeno, demasiado por acá, llamame y te muestro más"];
      this.lesson = "";
      setTimeout(() => {
        this.showButton();
      }, 800);
      this.utilitiesService.changeFirstLog("learning");
      this.validation = false;
      if (navigator.userAgent.match(/Android/i)
        || navigator.userAgent.match(/webOS/i)
        || navigator.userAgent.match(/iPhone/i)
        || navigator.userAgent.match(/iPad/i)
        || navigator.userAgent.match(/iPod/i)
        || navigator.userAgent.match(/BlackBerry/i)
        || navigator.userAgent.match(/Windows Phone/i)
      ) {
        this.utilitiesService.placeholderLearning = ["Call me for more"
        , "Llamame y te muestro más"];
        document.getElementById("onlyWeb").style.display = "none"; 
        document.getElementById("onlyMobile").style.display = "block";
      }
    }
  }

  nothingToLearn() {
    if (this.lesson == "") {
      this.validation = true;
    }
  }

  showButton() {
    document.getElementById('continueButton').style.visibility = 'visible';
    document.getElementById('continueButton').style.opacity = '1';
  }

}
