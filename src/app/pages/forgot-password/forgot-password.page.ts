import { Component,  } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { InteracionService } from '../../services/interacion.service';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage  {

  constructor(private authSvc:AuthService, private router:Router, private interaction :InteracionService) { }


 async onResetPassword(email){
    try{
      await this.authSvc.resetPassword(email.value);
      this.interaction.presentToast('Correo enviado')
      this.router.navigate(['/login'])
    }
      catch(error){
        console.log('error->',error)
        this.interaction.presentToast('Porfavor Ingresar Correo Valido')
      }
    ;
  }
}
