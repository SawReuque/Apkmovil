import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AutosI } from '../../models/models/models.module';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  private path = 'Autos/';

  autos: AutosI[] = [];

  constructor(public menucontroler: MenuController,
              public authService: AuthService){

              this.loadAutos();
              }

  ngOnInit() {}

  openMenu(){
    console.log('open menu');
    this.menucontroler.toggle('principal')
  }

  loadAutos(){
    this.authService.getCollection<AutosI>(this.path).subscribe ( res=>{
      //console.log(res);
      this.autos = res;
    });
  }
}
