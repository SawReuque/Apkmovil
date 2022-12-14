import { SetAutosComponent } from './backend/set-autos/set-autos.component';
import { HomeComponent } from './pages/home/home.component';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { ViajesComponent } from './pages/viajes/viajes.component';
import { MisViajesComponent } from './pages/mis-viajes/mis-viajes.component';


const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'set-autos', component: SetAutosComponent},
  {path: 'viajes', component: ViajesComponent},
  {path: 'perfil', component: PerfilComponent},
  {path: 'mis-viajes', component: MisViajesComponent},
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then((m) => m.RegisterPageModule),
  },
  {
  path: 'login',
  loadChildren: () => import('./pages/login/login.module').then((m) => m.LoginPageModule),
  },

  {
    path: 'verify-email',
    loadChildren: () => import('./pages/verify-email/verify-email.module').then( m => m.VerifyEmailPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./pages/forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },  {
    path: 'admin',
    loadChildren: () => import('./pages/admin/admin.module').then( m => m.AdminPageModule)
  },

  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
