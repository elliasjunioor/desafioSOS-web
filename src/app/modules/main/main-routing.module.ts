import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {PatrimonioComponent} from './patrimonio/patrimonio.component';
import {MarcaComponent} from './marca/marca.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent
  },
  {
    path: 'patrimonio', component: PatrimonioComponent
  },
  {
    path: 'marca', component: MarcaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
