import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { Reserva } from '../../models/models/models.module';
import { ViajeService } from '../../services/viaje.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-viajes',
  templateUrl: './viajes.component.html',
  styleUrls: ['./viajes.component.scss'],
})
export class ViajesComponent implements OnInit, OnDestroy {

  reserva: Reserva;
  viajeSuscriber: Subscription;
  total: number;
  cantidad: number;

  constructor(public menucontroler: MenuController,
              public authService: AuthService,
              public viajesService: ViajeService){
              
                this.initViaje();
                this.loadReserva();
    }

ngOnInit() {}

ngOnDestroy(){
  console.log('ngOnDestroy() - viaje componente');
  if (this.viajeSuscriber){
    this.viajeSuscriber.unsubscribe();
}

}

openMenu(){
console.log('open menu');
this.menucontroler.toggle('principal')
}

loadReserva(){
  this.viajeSuscriber = this.viajesService.getViajes().subscribe (res => {
    console.log('loadReserva() en viajes', res);
    this.reserva = res;
    this.getTotal();
    this.getCantidad()
  });
}

initViaje(){
  this.reserva = {
    id: '',
    cliente: null,
    autos: [],
    precio: null,
    estado: 'en proceso',
    fecha: new Date(),
    valoracion: null,
  };
}

getTotal(){
  this.total = 0;
  this.reserva.autos.forEach( auto => {
      this.total = (auto.auto.precio) * auto.cantidad + this.total;

  });
}


getCantidad(){
      this.cantidad = 0
      this.reserva.autos.forEach( auto => {
        this.cantidad = auto.cantidad + this.cantidad;
    });
  }

async pedir(){
  if (!this.reserva.autos.length){
    console.log('Añade autos a los viajes');
    return;
  }
  console.log(' reserva () ->', this.reserva)
  this.reserva.fecha = new Date();
  this.reserva.precio = this.total;
  this.reserva.id = this.authService.getId();
  const uid = await this.authService.getUid();
  const path= 'users/' + uid + '/reservas/'
  console.log('reserva() ->',this.reserva, uid, path);
  

  this.authService.createDoc(this.reserva, path, this.reserva.id).then(() => {
    console.log('guardado con exito');
    this.viajesService.clearViaje();
  })
}


}

