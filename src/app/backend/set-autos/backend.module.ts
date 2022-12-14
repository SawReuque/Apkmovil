import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SetAutosComponent } from './set-autos.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    SetAutosComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ]
})
export class BackendModule { }
