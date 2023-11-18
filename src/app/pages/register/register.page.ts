import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { LocationService } from 'src/app/services/location.service';
import { Region } from 'src/app/models/region';
import { Router } from '@angular/router';

// Importa IonicStorageService
import { IonicStorageService } from 'src/app/services/ionic-storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  regiones: Region[] = [];
  comunas: any[] = [];
  regionSel: number = 0;
  comunaSel: number = 0;
  formularioRegistro: FormGroup;

  constructor(
    private router: Router,
    public fb: FormBuilder,
    public alertController: AlertController,
    private locationService: LocationService,
    // Inyecta IonicStorageService
    private storage: IonicStorageService
  ) {
    this.formularioRegistro = this.fb.group({
      'user': new FormControl("", Validators.required),
      'password': new FormControl("", Validators.required),
      'confirmPassword': new FormControl("", Validators.required)
    });
  }

  ngOnInit() {
    this.cargarRegion();
  }

  async cargarComuna() {
    try {
      const req = await this.locationService.getComuna(this.regionSel);
      this.comunas = req.data;
    } catch (error: any) {
      console.log("ERROR", error);
    }
  }

  async cargarRegion() {
    try {
      const req = await this.locationService.getRegion();
      this.regiones = req.data;
      console.log("REGIONES", this.regiones);
    } catch (error) {

    }
  }

  async guardar() {
    var f = this.formularioRegistro.value;

    if (this.formularioRegistro.invalid) {
      const alert = await this.alertController.create({
        header: 'Datos incompletos',
        message: 'Hay datos sin llenar',
        buttons: ['Aceptar'],
      });
      await alert.present();
      return;
    } else {
      var usuario = {
        nombre: f.user,
        password: f.password,
        rut: f.rut
      };

      // Usa Ionic Storage para guardar datos
      this.storage.set('usuario', usuario);

      this.formularioRegistro.reset();
      this.router.navigate(['/login']);
    }
  }
}
