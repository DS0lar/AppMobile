import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { LocationService } from 'src/app/services/location.service';
import { Region } from 'src/app/models/region';
import { Router } from '@angular/router';
import { IonicStorageService } from 'src/app/services/ionic-storage.service';

@Component({
  selector: 'app-forgotten-pass',
  templateUrl: './forgotten-pass.page.html',
  styleUrls: ['./forgotten-pass.page.scss'],
})
export class ForgottenPassPage implements OnInit {

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
    private storage: IonicStorageService,
  ) {
    this.formularioRegistro = this.fb.group({
      'user': new FormControl({ value: '', disabled: true }, Validators.required),
      'password': new FormControl("", Validators.required),
    });
  }

  ngOnInit() {
    this.cargarRegion();
    this.loadUserData();
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

  async loadUserData() {
    // Load user data from storage
    const userData = await this.storage.get('usuario');

    // If user data is available, set it in the form
    if (userData) {
      this.formularioRegistro.patchValue({
        'user': userData.nombre,
      });
    }
  }

  async cambiar() {
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
      // Obtener el usuario existente desde Ionic Storage
      const usuario = await this.storage.get('usuario');

      // Actualizar solo la contraseña
      usuario.password = f.password;

      // Guardar el usuario actualizado en Ionic Storage
      await this.storage.set('usuario', usuario);

      // Perform actual authentication logic here if needed

      this.formularioRegistro.reset();
      this.router.navigate(['/login']);
    }
  }
}
