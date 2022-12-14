import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../../shared/user.interface';

export interface AutosI  { 
  nombre: string;
  auto: string;
  matricula: string;
  color: string;
  asientos: number;
  precio: number;
  horario: string;
  descripcion: string;
  pasajeros: number;
  foto: string;
  id: string;
  fecha: Date;
}



export interface Reserva  { //Pedido
    cliente: User;
    id: string;
    autos: ReservaPedida[];
    precio: number;
    estado: EstadoPedido;
    fecha: any;
    valoracion: number;
    }


export interface ReservaPedida {
  auto: AutosI;
  cantidad: number;
}


export type EstadoPedido = 'dentro' | 'en proceso' | 'entregado';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})




export class ModelsModule { }
