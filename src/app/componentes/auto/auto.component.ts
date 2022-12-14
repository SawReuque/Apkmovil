import { Component, Input, OnInit } from '@angular/core';
import { AutosI } from '../../models/models/models.module';
import { ViajeService } from '../../services/viaje.service';

@Component({
  selector: 'app-auto',
  templateUrl: './auto.component.html',
  styleUrls: ['./auto.component.scss'],
})
export class AutoComponent implements OnInit {

  @Input() auto: AutosI;

  constructor(public viajeService:ViajeService) { }

  ngOnInit() {
    //console.log('el auto es ->', this.auto);

  }
  addViajes(){
    this.viajeService.addAuto(this.auto);

  }

}
