import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

// Importa IonicStorageService
import { IonicStorageService } from 'src/app/services/ionic-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  formularioLogin: FormGroup;

  constructor(
    public fb: FormBuilder,
    public alertController: AlertController,
    private router: Router,
    // Inyecta IonicStorageService
    private storage: IonicStorageService
  ) {
    this.formularioLogin = this.fb.group({
      'user': new FormControl("", Validators.required),
      'password': new FormControl("", Validators.required)
    });
  }

  ngOnInit() {
  }

  async entrar() {
    try {
      var f = this.formularioLogin.value;

      // Usa Ionic Storage para obtener datos
      const usuario = await this.storage.get('usuario');

      if (usuario && usuario.nombre === f.user && usuario.password === f.password) {
        this.router.navigate(['/qr-reader']);
      } else {
        const alert = await this.alertController.create({
          header: 'Datos incorrectos',
          message: 'El usuario o contraseña son incorrectos',
          buttons: ['Aceptar'],
        });
        await alert.present();
        return;
      }
    } catch (error) {
      console.error('Error en la función entrar:', error);
    }
  }

}
