import { BackendModule } from './backend/set-autos/backend.module';
import { PagesModule } from './pages/pages.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../environments/environment';

//npm install @ionic/storage-angular;
import { IonicStorageModule } from '@ionic/storage-angular';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';





@NgModule({
  declarations: [
    AppComponent,
    
    
  ],
  imports: [BrowserModule,
    FormsModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    PagesModule,
    BackendModule,
    AngularFireStorageModule,
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
