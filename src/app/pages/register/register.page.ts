import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { InteracionService } from '../../services/interacion.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(private authSvc:AuthService, private router:Router,private interaction:InteracionService) { }

  ngOnInit() {
  }
  async onRegister(email, password) {
    try {
      const user = await this.authSvc.register(email.value, password.value);
      if (user) {
        console.log('user ->', user);
        const isVerified= this.authSvc.isEmailVerified(user);
        this.redirectUser(isVerified);
    
      }
    }  catch (error) {
      console.log('Error->', error)
      this.interaction.presentToast('Correo o contraseña invalidos')
    }
  }
  private redirectUser(isVerified:boolean):void{
    if(isVerified){
      this.router.navigate(['admin']);
    }
    else{
      this.router.navigate(['verify-email'])
    }
    ///redirect -> admin
    // else VerificationPage
  }

}
