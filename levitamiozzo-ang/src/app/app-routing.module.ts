import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IntroComponent } from './components/intro/intro.component';
import { LearningComponent } from './components/learning/learning.component';
import { ResponsiveComponent } from './components/responsive/responsive.component';
import { SkillsComponent } from './components/skills/skills.component';
import { DataComponent } from './components/data/data.component';
import { ContactComponent } from './components/contact/contact.component';

const routes: Routes = [
  { path: 'intro', component: IntroComponent, data: { animation: "1" } },
  { path: 'learning', component: LearningComponent, data: { animation: "2" } },
  { path: 'responsive', component: ResponsiveComponent, data: {animation: "3" } },
  { path: 'data', component: DataComponent, data: {animation: "4" } },  
  { path: 'skills', component: SkillsComponent, data: {animation: "5" } },
  { path: 'contact', component: ContactComponent, data: {animation: "6" } },
  {
    path: '',
    redirectTo: '/intro',
    pathMatch: 'full'
  },
  {
    path: '**', redirectTo: '/intro'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
