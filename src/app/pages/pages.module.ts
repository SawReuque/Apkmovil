import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { PerfilComponent } from './perfil/perfil.component';
import { ComponentesModule } from '../componentes/componentes.module';
import { ViajesComponent } from './viajes/viajes.component';
import { FormsModule } from '@angular/forms';
import { MisViajesComponent } from './mis-viajes/mis-viajes.component';



@NgModule({
  declarations: [
    HomeComponent,
    PerfilComponent,
    ViajesComponent,
    MisViajesComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    ComponentesModule,
    FormsModule,
    
  ]
})
export class PagesModule { }
