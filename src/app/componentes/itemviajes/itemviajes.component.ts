import { Component, OnInit, Input } from '@angular/core';
import { ReservaPedida } from '../../models/models/models.module';
import { ViajeService } from '../../services/viaje.service';

@Component({
  selector: 'app-itemviajes',
  templateUrl: './itemviajes.component.html',
  styleUrls: ['./itemviajes.component.scss'],
})
export class ItemviajesComponent implements OnInit {

  @Input() autoPedido: ReservaPedida;
  @Input() botones = true;

  constructor(public viajeService: ViajeService) { }

  ngOnInit() {}

  addViajes(){
    console.log('addViajes');
    this.viajeService.addAuto(this.autoPedido.auto);
  }

  removeViajes(){
    this.viajeService.removeViaje(this.autoPedido.auto);
  }
}
