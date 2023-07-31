import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { HomeComponent } from './home/home.component';
import { PatrimonioComponent } from './patrimonio/patrimonio.component';
import { MarcaComponent } from './marca/marca.component';
import {RouterLink} from '@angular/router';
import {MainRoutingModule} from './main-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import {ReactiveFormsModule} from '@angular/forms';



@NgModule({
  declarations: [
    HomeComponent,
    PatrimonioComponent,
    MarcaComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    RouterLink,
    NgOptimizedImage,
    ReactiveFormsModule
  ]
})
export class MainModule {
constructor() {
}}
