import { Component, OnInit } from '@angular/core';
import { MenuController, ToastController, LoadingController, AlertController } from '@ionic/angular';
import { ReadStream } from 'fs';
import { AutosI } from 'src/app/models/models/models.module';
import { AuthService } from '../../services/auth.service';
import { FirestorageService } from '../../services/firestorage.service';

@Component({
  selector: 'app-set-autos',
  templateUrl: './set-autos.component.html',
  styleUrls: ['./set-autos.component.scss'],
})
export class SetAutosComponent implements OnInit {

  newImage = '';

  loading: any;

  autos: AutosI[] = [];
  
  newFile='';

  newAuto: AutosI;

  enableNewAuto = false;

  private path = 'Autos/';

  constructor(public menucontroler: MenuController,
              public authService: AuthService,
              public toastController: ToastController,
              public loadingController: LoadingController,
              public firestorageService : FirestorageService,
              public alertController: AlertController) { }
              

  ngOnInit() {
    this.getAutos()
  }

  openMenu(){
    console.log('open menu');
    this.menucontroler.toggle('principal')
  }

  async guardarAuto(){
    this.presentLoading();
    const path = 'Autos';
    const name = this.newAuto.nombre;
    const res = await this.firestorageService.uploadImage(this.newFile, path, name);
    console.log('recibi res  de la promesa',res);
    this.newAuto.foto = res;

    this.authService.createDoc(this.newAuto, this.path, this.newAuto.id).then(res => {
      this.loading.dismiss();
      this.presentToast('¡Guardado con exito!')
    }).catch( error => {
      this.presentToast('Hubo un error no se pudo guardar.')

    });
  }

  getAutos(){
    this.authService.getCollection<AutosI>(this.path).subscribe( res=> {
      this.autos = res;
    } );
  }

  async deleteAuto(auto: AutosI){

      const alert = await this.alertController.create({
        cssClass: 'normal',
        header: 'Adventencia',
        message:'Seguro desea <strong>eliminar</strong> este producto',
        buttons:[
          {
            text: 'Cancelar',
            role: 'cancel',
            cssClass: 'normal',
            handler: (blah) => {
              console.log('Confirm cancel: blah');
            }
          }, {text: 'Ok',
          handler: ()=>{
            console.log('confirm Okay');
            this.authService.deleteDoc(this.path, auto.id).then(res => {
              this.presentToast('¡Eliminado con exito!')
              this.alertController.dismiss();
            }).catch( error => {
              this.presentToast('Hubo un error no se pudo eliminar.')
            });
          }
          }
        ]
      });
      await alert.present();
    
  }

  nuevo(){
    this.enableNewAuto=true;
    this.newAuto = {
      nombre: '',
      auto: '',
      matricula: '',
      color: '',
      asientos: null,
      precio: null,
      horario: '',
      descripcion: '',
      pasajeros: null,
      foto: '',
      id: this.authService.getId(),
      fecha: new Date()
    };
    
  }

  async presentLoading(){
    this.loading = await this.loadingController.create({
      cssClass: 'normal',
      message: 'Guardando...',
//      cssClass: 'my-custom-class',
//      message: 'mensaje',
    });
    await this.loading.present();
    
  }

  async presentToast(mensaje: string){
    const toast = await this.toastController.create({
      cssClass: 'normal',
      message: mensaje,
      duration: 2000,
      color: 'light'
    });
    toast.present();
  }

  async newImageUpload(event: any){
        if (event.target.files && event.target.files[0]) {
          this.newFile = event.target.files[0];
          const reader = new FileReader();
          reader.onload = ((image) => {
            this.newAuto.foto = image.target.result as string;
          });
          reader.readAsDataURL(event.target.files[0]);
        }


    console.log('fin de la funcion -> newImageUpload');
  }


}
