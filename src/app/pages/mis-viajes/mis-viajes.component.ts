import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { FirestorageService } from '../../services/firestorage.service';
import { Subscription } from 'rxjs';
import { Reserva } from '../../models/models/models.module';

@Component({
  selector: 'app-mis-viajes',
  templateUrl: './mis-viajes.component.html',
  styleUrls: ['./mis-viajes.component.scss'],
})
export class MisViajesComponent implements OnInit, OnDestroy {

  nuevoSubscriber: Subscription;
  finalizadoSubscriber: Subscription;
  reservas: Reserva[] = []; 


  constructor(public menucontroler: MenuController,
              public firestorageService: FirestorageService,
              public authService : AuthService) { }

  ngOnInit() {
    this.getReservasNuevos();
  }

    ngOnDestroy(){
    if(this.nuevoSubscriber){
      this.nuevoSubscriber.unsubscribe();
    }
    if (this.finalizadoSubscriber){
    this.finalizadoSubscriber.unsubscribe();
  }
    }

  openMenu(){
    console.log('open menu');
    this.menucontroler.toggle('principal')
    }

    changeSegment(ev:any){
      //console.log('changeSegment()',ev.detail.value);
      const opc = ev.detail.value;
      if (opc === 'finalizados'){
        this.getReservasFinalizados();

      }
      if (opc === 'nuevos'){
        this.getReservasNuevos();

      }
    }
    async getReservasNuevos(){
      console.log('getReservasNuevos()');
      const uid = await this.authService.getUid();
      const path= 'users/' + uid + '/reservas/';
      this.nuevoSubscriber = this.authService.getCollectionQuery<Reserva>(path,'estado','==','en proceso').subscribe ( res =>{
        if (res.length){
          console.log('getReservasNuevos() -> res',res)
          this.reservas = res;
        }
      })

    }
    async getReservasFinalizados(){
      console.log('getReservasFinalizados()');
      const uid = await this.authService.getUid();
      const path= 'users/' + uid + '/reservas/';
      this.finalizadoSubscriber = this.authService.getCollectionQuery<Reserva>(path,'estado','==','entregado').subscribe ( res =>{
        if (res.length){
          console.log('getReservasFinalizados() -> res',res)
          this.reservas = res;
        }
      })

    }
}
