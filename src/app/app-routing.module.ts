import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:"", loadComponent:()=>import('./home/home.component').then((m)=>m.HomeComponent)},
  {path:"home", loadComponent:()=>import('./home/home.component').then((m)=>m.HomeComponent)},
  {path:"contact", loadComponent:()=>import('./contact/contact.component').then((m)=>m.ContactComponent)},
  {path:"**", loadComponent:()=>import('./notfound/notfound.component').then((m)=>m.NotfoundComponent)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
