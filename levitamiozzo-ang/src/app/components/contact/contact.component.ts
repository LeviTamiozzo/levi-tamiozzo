import { Component, OnInit } from '@angular/core';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { EventsService } from 'src/app/services/events.service';
import { ApiService } from 'src/app/services/api.service';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
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
export class ContactComponent implements OnInit {

  subscription: Subscription;

  placeholders = {
    name: ["name", "nombre"],
    message: ["message", "mensaje"]
  };

  validations = {
    emptyEmail: ["I need your email", "Necesito tu email"],
    invalidEmail: ["Your email looks weird", "Mm, eso no parece un email"],
    name: ["I need your name", "Necesito tu nombre"],
    message: ["Just tell me, how can I help you?", "Decime, en qué te puedo ayudar?"],
    emailSended: ["The message was sended correctly", "El mensaje se envió correctamente"]
  }

  newMessage = ["We want you in our proyect! It's about...", "Te queremos para nuestro proyecto! Se trata de..."];
  newMessage2 = ["Why didn't you write me back yet Levi? Come on, man, hurry up, we are waiting for you!","Qué onda que no me respondés todavía Levi? Dale viejo, apurate que te estamos esperando!"];

  contactMe: FormGroup;
  submitted = false;
  emailSended = false;
  loading = false;

  constructor(public utilitiesService: UtilitiesService, private fb: FormBuilder,
    public eventsService: EventsService, public apiService: ApiService) {
    this.subscription = this.eventsService.listenEvent().subscribe(code => {
      if (code.id == "") {
        this.contactMe.controls['name'].setValue("");
        this.contactMe.controls['email'].setValue("");
      };
    });
    this.subscription = this.eventsService.listenEvent2().subscribe(() => {
      this.contactMe.controls['message'].setValue(this.newMessage[this.utilitiesService.selectedLanguage]);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    this.utilitiesService.introPage = false;
    this.contactMe = this.fb.group({
      name: [localStorage.getItem('name'), [
        Validators.required
      ]],
      email: [localStorage.getItem('email'), [
        Validators.required,
        Validators.email
      ]],
      message: [this.newMessage[this.utilitiesService.selectedLanguage], [
        Validators.required
      ]]
    });
  }

  get name() {
    return this.contactMe.get('name');
  }

  get email() {
    return this.contactMe.get('email');
  }

  get message() {
    return this.contactMe.get('message');
  }

  async sendMessage() {
    if (this.contactMe.invalid) {
      this.submitted = true;
    } else {
      let mail = {
        email: `Name: ${this.name.value}, email: ${this.email.value}, message: ${this.message.value}`
      }
      this.loading = true;
      await this.apiService.sendEmail(mail).subscribe(() => {        
        this.contactMe.controls['message'].setValue(this.newMessage2[this.utilitiesService.selectedLanguage]);
        this.emailSended = true;
        this.loading = false;
        setTimeout(() => {
          this.emailSended = false;
        }, 3000)
      })
    }
  }
}
