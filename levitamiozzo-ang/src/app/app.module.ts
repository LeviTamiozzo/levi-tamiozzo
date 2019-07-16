import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms'; 
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IntroComponent } from './components/intro/intro.component';
import { LearningComponent } from './components/learning/learning.component';
import { ResponsiveComponent } from './components/responsive/responsive.component';
import { DataComponent } from './components/data/data.component';
import { HeaderComponent } from './components/header/header.component';
import { SkillsComponent } from './components/skills/skills.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { ApiService } from './services/api.service';
import { TodoComponent } from './components/todo/todo.component';
import { TodoPipe } from './pipes/todo.pipe';
import { UtilitiesService } from './services/utilities.service';
import { ToastrModule } from 'ngx-toastr';
import { ContactComponent } from './components/contact/contact.component';
import { LoaderComponent } from './components/loader/loader.component';

@NgModule({
  declarations: [
    AppComponent,
    IntroComponent,
    LearningComponent,  
    ResponsiveComponent,
    DataComponent,    
    HeaderComponent,
    SkillsComponent,
    LoginComponent,
    TodoComponent,
    TodoPipe,    
    ContactComponent,
    LoaderComponent,    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToastrModule
  ],
  providers: [ApiService, UtilitiesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
