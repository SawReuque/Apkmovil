import { Injectable } from '@angular/core';
import { AutosI, Reserva, ReservaPedida } from '../models/models/models.module';
import { User } from '../shared/user.interface';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { Subject, Observable,Subscription } from 'rxjs';
//import { Subscription } from 'rxjs/internal/Subscription';

@Injectable({
  providedIn: 'root'
})
export class ViajeService {


  private reserva: Reserva; //este sera el pedido del video
  reserva$ = new Subject<Reserva>();
  path = 'viaje/' //carrito
  //user es Cliente
  // producto es el auto
  uid = '';
  user: User;

  viajeSuscriber: Subscription;
  userSuscriber: Subscription;

  constructor(public firebaseauthService:AuthService,
              public firestoreService : AuthService,
              public router: Router) {

    console.log('ViajesService inicio')
    this.initViaje();
    this.firebaseauthService.stateAuth().subscribe(res => {
      console.log(res);
      if (res !== null){
        this.uid = res.uid;
        this.loadUser();
        
      } 
    });
  }

  loadViajes(){ 
    const path = 'users/' + this.uid + '/' + 'viaje';
    if (this.viajeSuscriber){
      this.viajeSuscriber.unsubscribe();
    }
    this.viajeSuscriber = this.firestoreService.getDoc<Reserva>(path, this.uid).subscribe( res => {
      console.log(res);
      if (res){
          this.reserva = res;
          this.reserva$.next(this.reserva);
      } else {
        this.initViaje();
      }
    });
  }

  getViajes(): Observable<Reserva>{
    setTimeout(()=>{
      this.reserva$.next(this.reserva);
    }, 100);
    return this.reserva$.asObservable();
  }
//  getViajes(): Promise<Reserva>{
//    return new Promise ( resolve => {
//      
//      if(!this.uid.length){
//          resolve(null);
//          return;
//      }
//      if(this.reserva){
//        resolve(this.reserva);
//        return;
//      }else {
//        const path = 'users/' + this.uid + '/' + 'viaje';
//        this.firestoreService.getDoc<Reserva>(path, this.uid).subscribe( res => {
//          console.log(res);
//          if (res){
//            resolve(res)
//            return;
//          } else {
//            resolve(null)
//            return;
//          }
//        });
//      }
//    });
//  }

  initViaje(){
    this.reserva = {
      id: this.uid,
      cliente: this.user,
      autos: [],
      precio: null,
      estado: 'en proceso',
      fecha: new Date(),
      valoracion: null,
    };
    this.reserva$.next(this.reserva)
  }


  loadUser(){
    const path = 'users';
    this.firestoreService.getDoc<User>(path, this.uid).subscribe(res => {
      this.user = res;
      this.loadViajes();
    });
  
  }

  addAuto(auto: AutosI){
    console.log('addAuto->', this.uid)
    if (this.uid.length) {
      const item = this.reserva.autos.find( reservaPedida => {
        return (reservaPedida.auto.id === auto.id)
      });
      if (item !== undefined) {
        item.cantidad ++;
      } else{
        const add: ReservaPedida = {
          cantidad:1,
          auto,
        };
        this.reserva.autos.push(add)
      }
    } else {
      this.router.navigate(['/login'])
      return;
    }
    this.reserva$.next(this.reserva)
    console.log('en add reserva ->', this.reserva);
    const path = 'users/' + this.uid + '/' + this.path;
    this.firestoreService.createDoc(this.reserva, path, this.uid).then(() => {
      console.log('reservado con exito')
    });
  }

  removeViaje(auto: AutosI){
    console.log('removeAuto->', this.uid)
    if (this.uid.length) {
      let position = 0;
      const item = this.reserva.autos.find( (reservaPedida, index) => {
        position = index;
        return (reservaPedida.auto.id === auto.id)
      });     
      if (item !== undefined) {
        item.cantidad --;
          if(item.cantidad === 0) {
        this.reserva.autos.splice(position,1);
      }    console.log('en remove reserva ->', this.reserva);
    const path = 'users/' + this.uid + '/' + this.path;
    this.firestoreService.createDoc(this.reserva, path, this.uid).then(() => {
      console.log('removido con exito')
    });
    }
    }
  }

  realizarViaje(){

  }

  clearViaje(){
    const path = 'users/' + this.uid + '/' + 'viaje';
    this.firestoreService.deleteDoc(path, this.uid).then(()=>{
      this.initViaje();
    });
    
  }
  
}
