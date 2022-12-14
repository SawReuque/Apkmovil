import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { User } from '../../shared/user.interface';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FirestorageService } from '../../services/firestorage.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Subscription } from 'rxjs/internal/Subscription';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent implements OnInit {

  user: User={
    uid:'',
    email:'',
    displayName:'',
    emailVerified:null,
  };

  uid = '';
  subscriberUserInfo: Subscription;
  ingresarEnable = false;


  constructor(public menucontroler: MenuController,
              public firebaseauthService: AuthService,
              public firestoreService : AuthService,
              private router:Router,
              public auth: AngularFireAuth){

                this.firebaseauthService.stateAuth().subscribe(res => {
                  console.log(res);
                  if (res !== null){
                    this.uid =res.uid
                    this.getUserInfo(this.uid);
                  } else{
                    this.initCliente();
                  }
                });


}
              


  async ngOnInit() {
    const uid= await this.firebaseauthService.getUid();
    console.log(uid);
  }

initCliente() {
  this.uid = '';
                    this.user ={
                      uid:'',
                      email:'',
                      displayName:'',
                      emailVerified:null,
                    };
                      console.log(this.user);
                    

}

  openMenu(){
    console.log('open menu');
    this.menucontroler.toggle('principal')
  }

  async salir(){
    this.firebaseauthService.logout();
    this.subscriberUserInfo.unsubscribe();
    this.router.navigate(['/login']);
  }

  getUserInfo(uid: string){
    console.log('getUserInfo');
    const path = 'users';
    this.subscriberUserInfo = this.firestoreService.getDoc<User>(path, uid).subscribe(res => {
      this.user = res;
    });
  }

  ingresar(){
    const credenciales = {
    email: this.user.email,
    password: this.user.displayName
    };
    this.firebaseauthService.login(credenciales.email, credenciales.password).then(res =>{
      console.log('ingreso con exito');
    });
  }

  async registrarse(){
    const credenciales = {
      email:this.user.email,
      password: this.user.displayName
      
    };
    const  res = await this.firebaseauthService.register(credenciales.email, credenciales.password). catch( error =>
      console.log('error ->', res));
  }
  //const uid = await this.firebaseauthService.getUid();
  //console.log(uid)

}
