import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition, query } from '@angular/animations';
import { UtilitiesService } from 'src/app/services/utilities.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {

  button = ['Continue', 'Continuar'];
  labels = {
    additionals: ["Additionals", "Adicionales"],
    soft: ["Soft", "Blandas"]
  }

  additionals = {
    english: ["english", "inglés"]
  }

  soft = {
    motivated: ["motivated", "motivado"],
    predisposed: ["predisposed", "predispuesto"],
    humor: ["good humor", "buen humor"]
  }
  constructor(public utilitiesService: UtilitiesService) { }

  ngOnInit() {
    this.utilitiesService.introPage = false;
    if (this.utilitiesService.fisrtLog.skills) {
      setTimeout(() => {
        this.showButton();        
      }, 1000);      
      this.utilitiesService.changeFirstLog("skills");
    } else {
      this.showButton();
    }    
  }

  showButton() {
    document.getElementById('continueButton').style.visibility = 'visible';
    document.getElementById('continueButton').style.opacity = '1';    
  }

}
