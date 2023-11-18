import { Injectable } from '@angular/core';
import { AlertController, LoadingController, ModalController, ToastController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor(
              private alertService:AlertController,
              private loadingController:LoadingController,
              private toastController:ToastController,
              private modalController:ModalController
              ) { }

  sumar(n1:number, n2:number){
    var result = n1 + n2;
    return result;
  }

  async showAlert(msg:string, title:string){
    var alert = await this.alertService.create({cssClass:"alertClass",message:msg,header:title,buttons:['Aceptar']});
    await alert.present();
    return alert;
  }

  async showConfirm(message:string,btn_confirmar:string,btn_cancelar:string){
    let promise = new Promise<boolean>(async (resolve)=>{
      var alert = await this.alertService.create({cssClass:"",message:message,buttons:[
        {
          text:btn_confirmar,
          handler: () =>{
            resolve(true);
          }
        },
        {
          text:btn_cancelar,
          role: 'cancel',
          handler: () =>{
            resolve(false);
          }
        }
      ]})
      await alert.present();

    })
    return promise;
  }


  async showLoader(msg:string){
    var loader = await this.loadingController.create({cssClass:"loaderClass",message:msg,translucent:true})
    await loader.present();
    return loader;
  }


  async showToast(msg:string,duracion:number = 3000){
    var toast = await this.toastController.create(
      {
        cssClass:"cssToast",
        message:msg,
        translucent:true,
        position:"bottom",
        duration:duracion,
        color:"warning"
      }
      );
      await toast.present();
      return toast;
  }


  async showModal(component:any,props:any = {},hideable = false){
    var modal = await this.modalController.create
    (
      {
        component:component,
        cssClass:"cssModal",
        componentProps:props,
        backdropDismiss:hideable
      }
    )
    await modal.present();
  }

}
