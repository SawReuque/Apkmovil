import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutoComponent } from './auto/auto.component';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { ItemviajesComponent } from './itemviajes/itemviajes.component';



@NgModule({
  declarations: [
    AutoComponent,
    ItemviajesComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule
  ], exports:[AutoComponent,ItemviajesComponent]
  
})
export class ComponentesModule { }
