import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators,FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  formularioLogin: FormGroup;

  constructor(public fb: FormBuilder, public alertController: AlertController, private router: Router) {
    this.formularioLogin = this.fb.group({
      'user': new FormControl("",Validators.required),
      'password': new FormControl("",Validators.required)
    })
   }

  ngOnInit() {

  }

async entrar(){

    var f = this.formularioLogin.value;
    var usuarioStr = localStorage.getItem('usuario');
    console.log(usuarioStr);

    if (usuarioStr !== null) {
      var usuario = JSON.parse(usuarioStr);
    }

    if(usuario.nombre == f.user && usuario.password == f.password){
      this.router.navigate(['/qr-reader']);
    }else{
      const alert = await this.alertController.create({
        header: 'Datos incorrectos',
        message: 'El usuario o contraseña son incorrectos',
        buttons: ['Aceptar'],
      });
      await alert.present();
      return;
    }

  }
}
