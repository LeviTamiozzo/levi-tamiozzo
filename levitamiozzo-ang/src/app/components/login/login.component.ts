import { ApiService } from './../../services/api.service';
import { Component, OnInit } from '@angular/core';
import { EventsService } from 'src/app/services/events.service';
import { Subscription } from 'rxjs';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
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
export class LoginComponent implements OnInit {

  user: FormGroup;
  userToLogin: FormGroup;

  subscription: Subscription;

  validations = {
    userSubmitted: false,
    userToLoginSubmitted: false,
    userAlreadyExists: false,
    invalidLogin: false
  }

  placeholders = {
    name: ["name", "nombre"],
    surname: ["last name", "apellido"],
    password: ["password", "contraseña"]
  };

  buttons = {
    register: ["Register", "Registrar"],
    login: ["Login", "Entrar"]
  }

  labels = {
    register: ["Register", "Registro"],
    userAlreadyExists: ["That email is already registered", "Ese email ya está registrado"],
    login: ["Login", "Entrar"],
    requiredName: ["I need your name", "Necesito tu nombre"],
    requiredSurname: ["I need your last name", "Necesito tu apellido"],
    requiredEmail: ["I need your email", "Necesito tu email"],
    emailEmail: ["Your email looks weird", "Mm, eso no parece un email"],
    requiredPassword: ["You will need a password", "Vas a necesitar una contraseña"],
    invalidPassword: ["Your password looks poor", "Media floja la contraseña"],
    requiredEmailLogin: ["I need your email", "Necesito tu email"],
    requiredPasswordLogin: ["I need your password", "Necesito tu contraseña"],
    invalidLogin: ["Wrong user or password", "Usuario o contraseña incorrecta"]
  }

  todos = [{
    user: "",
    todos: [
      [true, "Admire Levi's Web Resume"],
      [false, "Contact Levi"],
      [false, "Hire Levi"],
      [false, "Enjoy working with Levi"],
      [false, "Gift Levi some food"],
    ]
  }, {
    user: "",
    todos: [
      [true, "Ver el CV web de Levi"],
      [false, "Llamar a Levi"],
      [false, "Contratar a Levi"],
      [false, "Disfrutar de trabajar con Levi"],
      [false, "Regalar alfajores a Levi"],
    ]
  }];

  userId = localStorage.getItem("userId");

  constructor(public apiService: ApiService, public eventsService: EventsService,
    public utilitiesService: UtilitiesService, private fb: FormBuilder) {
    this.subscription = this.eventsService.listenEvent().subscribe(code => {
      this.userId = code.id;
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    this.user = this.fb.group({
      name: ['', [
        Validators.required
      ]],
      surname: ['', [
        Validators.required
      ]],
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      password: ['', [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9]{6,}$')
      ]]
    });

    this.userToLogin = this.fb.group({
      emailUserToLogin: ['', [
        Validators.required,
        Validators.email
      ]],
      passwordUserToLogin: ['', [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9]{1,}$')
      ]]
    });
  }

  get name() {
    return this.user.get('name');
  }

  get surname() {
    return this.user.get('surname');
  }

  get email() {
    return this.user.get('email');
  }

  get password() {
    return this.user.get('password');
  }

  get emailUserToLogin() {
    return this.userToLogin.get('emailUserToLogin');
  }

  get passwordUserToLogin() {
    return this.userToLogin.get('passwordUserToLogin');
  }

  registerUser() {
    if (this.user.invalid) {
      this.validations.userSubmitted = true;
    } else {
      this.apiService.register(this.user.value)
        .then(() => {
          this.userToLogin.controls['emailUserToLogin'].setValue(this.email.value);
          this.userToLogin.controls['passwordUserToLogin'].setValue(this.password.value);
          this.user.reset();
          this.validations.userSubmitted = false;
          this.validations.userAlreadyExists = false;
          this.loginUser();
        })
        .catch(err => {
          if (err.status == 400) {
            this.validations.userAlreadyExists = true;
            setTimeout(() => {
              this.validations.userAlreadyExists = false;
            }, 2500)
          }
        });
    }
  }

  loginUser() {
    if (this.userToLogin.invalid) {
      this.validations.userToLoginSubmitted = true;
    } else {
      this.apiService.login({
        email: this.emailUserToLogin.value,
        password: this.passwordUserToLogin.value
      })
        .then((data) => {          
          this.utilitiesService.loadingData = true;
          this.todos[this.utilitiesService.selectedLanguage].user = data.user._id;
          localStorage.setItem('userId', data.user._id);
          localStorage.setItem('email', data.user.email);
          localStorage.setItem('name', data.user.name);
          this.apiService.getTodos(data.user._id).subscribe((res) => {
            if (!res) {              
              this.apiService.postTodos(this.todos[this.utilitiesService.selectedLanguage]);
              this.eventsService.sendEvent(data.user._id, data.user.name);
            }
          })
          this.eventsService.sendEvent(data.user._id, data.user.name);
          this.userToLogin.reset();
          this.validations.userToLoginSubmitted = false;
          this.validations.invalidLogin = false;  
          setTimeout(() => {
            this.utilitiesService.loadingData = false;      
          }, 1000);        
        })
        .catch(err => {
          if (err.status == 400) {
            this.validations.invalidLogin = true;
            setTimeout(() => {
              this.validations.invalidLogin = false;
            }, 2500)
          }
        });
    }
  }
}
