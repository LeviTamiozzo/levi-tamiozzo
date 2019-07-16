import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Todo } from '../../interfaces/todo';
import { Subscription } from 'rxjs';
import { EventsService } from 'src/app/services/events.service';
import { UtilitiesService } from 'src/app/services/utilities.service';



@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  todos = new Todo();

  subscription: Subscription;

  user = localStorage.getItem("userId");

  newTodo = "";

  labels = {
    todo: ["Todos", "Pendientes"],
    done: ["Done", "Hechos"]
  }  

  isMobile = false;

  constructor(public apiService: ApiService, public eventsService: EventsService, public utilitiesService: UtilitiesService ) { 
    this.subscription = this.eventsService.listenEvent().subscribe(code => {      
      if (code.id != "" && code.id != null) {               
        this.user = code.id;
        this.getTodos();
      } else {                           
        this.todos = new Todo();
        this.user = "";
        setTimeout(() => {
          this.utilitiesService.loadingData = false;
        }, 500);
      }
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  async ngOnInit() {
    await this.getTodos();  
    if (navigator.userAgent.match(/Android/i)
        || navigator.userAgent.match(/webOS/i)
        || navigator.userAgent.match(/iPhone/i)
        || navigator.userAgent.match(/iPad/i)
        || navigator.userAgent.match(/iPod/i)
        || navigator.userAgent.match(/BlackBerry/i)
        || navigator.userAgent.match(/Windows Phone/i)
      ) {
        this.isMobile = true;
      }
  }

  onCheckboxChange() {
    this.apiService.updateTodos(this.todos._id, this.todos);
  }

  async onKeydown(event) {
    if (event.key === "Enter" && this.newTodo != "") {
      await this.todos.todos.push([false, this.newTodo]);
      this.apiService.updateTodos(this.todos._id, this.todos);
      this.newTodo = "";
    }
  }

  async getTodos() {
    await this.apiService.getTodos(this.user).subscribe((res) => {
       if (res) this.todos = res as Todo;
    })    
  }

  async deleteTodo(toDeleteTodo: Array<any>) {
    this.todos.todos = await this.todos.todos.filter(todo => todo != toDeleteTodo);   
    this.apiService.updateTodos(this.todos._id, this.todos)
  }
}
