import { Component, OnInit } from '@angular/core';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { EventsService } from 'src/app/services/events.service';
import { Subscription } from 'rxjs';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css'],
  animations: [
    trigger(
      'labelAnimation', [
        transition(':enter', [
          style({ opacity: 0 }),
          animate('300ms', style({ opacity: 1 }))
        ]),
        transition(':leave', [
          style({ opacity: 1 }),
          animate('300ms', style({ opacity: 0 }))
        ])
      ]
    ),
    trigger(
      'validationAnimation', [
        transition(':enter', [
          style({ opacity: 0 }),
          animate('300ms', style({ opacity: 1 }))
        ]),
        transition(':leave', [
          style({ opacity: 1 }),
          animate('0ms', style({ opacity: 0 }))
        ])
      ]
    )
  ]
})
export class DataComponent implements OnInit {

  subscription: Subscription;

  userId: string;

  textDataCares1 = ["Besides, I know how to manipulate and save data so anyone can use them after.",
    "Además, puedo manipuar datos y guardarlos para usarlos en cualquier momento."];

  textDataCares2 = ["Play around with tasks below.",
    "Probá la lista de tareas de abajo."];

  textDataCares3 = ["Please sign in and try the todo list I made for your duties.",
    "Si querés podés loguearte y usar la lista de tareas que hice para tus pendientes."];

  button = ['Continue', 'Continuar'];

  constructor(public utilitiesService: UtilitiesService, public eventsService: EventsService) {
    this.subscription = this.eventsService.listenEvent().subscribe(code => {
      this.userId = code.id;
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    this.utilitiesService.introPage = false;
    this.userId = localStorage.getItem('userId');
  }
}
