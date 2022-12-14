import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { InteracionService } from 'src/app/services/interacion.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private authSvc:AuthService, private router:Router,private interaction:InteracionService) { }

  ngOnInit() {
  }

  async onLogin(email ,password){
    try{
      const user=await this.authSvc.login(email.value,password.value)
      ;
      if(user){
        //Todo:CheckEmail
        const isVarified = this.authSvc.isEmailVerified(user);
        this.redirectUser(isVarified);;
      }
    }
    catch(error){
      console.log('error->',error)
    }
  }
  async onLoginGoogle(){
    try{
      const user = await this.authSvc.loginGoogle();
      if(user){
        const isVarified = this.authSvc.isEmailVerified(user);
        this.redirectUser(isVarified);
      }
    }
    catch(error){
      console.log('error->',error)
    }
  }
  private redirectUser(isVerified:boolean):void{
    if(isVerified){
      this.router.navigate(['home']);
    }
    else{
      this.router.navigate(['verify-email'])
    }
    ///redirect -> admin
    // else VerificationPage
  }
}
