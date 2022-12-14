import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/shared/user.interface';
import { InteracionService } from '../../services/interacion.service';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  user$:Observable<User>=this.authSvc.afAuth.user;
  constructor(private authSvc:AuthService , private authservice:AuthService,private router:Router,private interaction:InteracionService){}


  ngOnInit() {
  }

  salir(){
    this.authservice.logout();
    this.interaction.presentToast('Sesion Finalizada');
    this.router.navigate(['/login']);
  }
}
