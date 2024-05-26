import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AboutComponent } from './components/about/about.component';
import { HomeComponent } from './components/home/home.component';
import { RegistroComponent } from './components/registro/registro.component'; 
import { DefectosComponent } from './components/defectos/defectos.component';

const routes: Routes = [
  {path:"",component:HomeComponent },
  {path:"registro",component:RegistroComponent},
  {path:"about",component:AboutComponent},
  {path:"defectos",component:DefectosComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
