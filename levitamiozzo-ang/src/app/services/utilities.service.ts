import { Injectable } from '@angular/core';
import { EventsService } from './events.service';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

  selectedLanguage = 0;
  fisrtLog = { intro: true, learning: true, responsive: true, data: true, skills: true, contactMe: true };
  languageDisabled = true;
  introPage = false;  
  lesson = "";
  placeholderLearning = ["e.g. Bolivia has two capitals", "ej: Bolivia tiene 2 capitales"];
  loadingData = false;

  constructor(public eventsService: EventsService) {
  }

  changeLanguage() {
    if (this.selectedLanguage == 0) {
      this.selectedLanguage = 1;
    } else {
      this.selectedLanguage = 0;
    }
    this.eventsService.sendEvent2(this.selectedLanguage);
  }

  changeFirstLog(prop) {
    this.fisrtLog[prop] = false;
  }

}
